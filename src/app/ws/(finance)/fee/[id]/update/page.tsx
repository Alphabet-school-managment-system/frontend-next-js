"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Fee, Student } from "@/types";
import { FeeType, useFee } from "../../hook/useFee";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getFileUrl, ReceiptPreview } from "../../../expense/new/page";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
} from "@/store/confirmationModalContext";
import { Form } from "antd";
import { UtilContext } from "@/store/utilContext";
import { OnFormValuesChangeProps } from "@/components/forms/FormGenerator";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  },
);

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useFee();
  const [data, setData] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();
  const { formData, setFormData } = useContext(UtilContext);

  const [feeTypes, setFeeTypes] = useState<{
    type?: FeeType;
    otherType?: FeeType;
  }>({});
  const { data: result, isLoading } = useApiQuery<Fee>(
    [],
    `fee/${id}`,
    Boolean(id),
  );

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext,
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      payload.due_date = dayjs(result.due_date);
      payload.amount = +result.amount;
      setFeeTypes((prev) => ({
        ...prev,
        type: result.type,
        otherType: result.other_type,
      }));
      setData(payload);
    }
  }, [result]);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData.allValues);
      setData(formData.allValues);
    }
  }, [formData]);

  return (
    <div className="">
      <FormGenerator
        formInstance={form}
        columns={2}
        fields={getFormFields({
          onFileChange: async (fileList) =>
            setPreviewImage((await getFileUrl(fileList)) ?? ""),
          onTypeChange: (value: FeeType) => {
            if (
              feeTypes.type === FeeType.Other &&
              value !== FeeType.Other &&
              feeTypes.otherType !== undefined
            ) {
              setcmProps((prev: ConfirmationModalPropsType) => ({
                ...prev,
                show: true,
                title: "Confirmation",
                content:
                  "Changing the fee type will clear the 'Specify Type' field. Do you want to proceed?",
                okButtonText: "Yes",
                cancelButtonText: "No",
                onOk: () => {
                  setFeeTypes((prev) => ({
                    ...prev,
                    type: value,
                    otherType: undefined,
                  }));
                },
                onCancel: () => {
                  setFeeTypes((prev) => ({
                    ...prev,
                    type: data?.type,
                  }));
                },
              }));
            } else {
              setFeeTypes((prev) => ({
                ...prev,
                type: value,
              }));
            }
          },
          type: feeTypes.type,
          other_type: feeTypes.otherType,
          onOtherTypeChange: (value) => {
            if (value) {
              setFeeTypes((prev) => ({
                ...prev,
                otherType: value,
              }));
            } else {
              setFeeTypes((prev) => ({
                ...prev,
                otherType: undefined,
              }));
            }
          },
          includeId: true,
          onStudentSelect: async (student: Student) => {
            form.setFieldValue("student_id", student?.id);
          },
          onClear: async () => {
            form.setFieldValue("student_id", undefined);
          },
          SearchInputOptions: [data?.enrollment?.student],
        })}
        title="Update Fee Information"
        apiRoute="fee"
        data={{
          ...data,
          type: feeTypes.type,
          other_type: feeTypes.otherType,
        }}
        isFetching={isLoading}
        isCreate={false}
        leftContent={<ReceiptPreview previewImage={previewImage} />}
        onValuesChange={({ allValues }: OnFormValuesChangeProps) => {
          setFormData((prev: any) => ({
            allValues,
          }));
        }}
      />
    </div>
  );
}
