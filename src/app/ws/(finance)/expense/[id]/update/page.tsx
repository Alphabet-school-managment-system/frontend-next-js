"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Expense } from "@/types";
import { ExpenseType, useExpense } from "../../hook/useExpense";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getFileUrl, ReceiptPreview } from "../../new/page";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
} from "@/store/confirmationModalContext";
import { UtilContext } from "@/store/utilContext";
import { Form } from "antd";
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
  const { getFormFields } = useExpense();
  const [data, setData] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [expenseTypes, setExpenseTypes] = useState<{
    type?: ExpenseType;
    otherType?: ExpenseType;
  }>({});
  const [form] = Form.useForm();
  const { formData, setFormData } = useContext(UtilContext);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext,
  );

  const { data: result, isLoading } = useApiQuery<Expense>(
    [],
    `expense/${id}`,
    Boolean(id),
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      payload.date = dayjs(result.date);
      payload.amount = +result.amount;
      setExpenseTypes((prev) => ({
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
        columns={2}
        fields={getFormFields({
          onFileChange: async (fileList) =>
            setPreviewImage((await getFileUrl(fileList)) ?? ""),
          onTypeChange: (value: ExpenseType) => {
            if (
              expenseTypes.type === ExpenseType.Other &&
              value !== ExpenseType.Other &&
              expenseTypes.otherType !== undefined
            ) {
              setcmProps((prev: ConfirmationModalPropsType) => ({
                ...prev,
                show: true,
                title: "Confirmation",
                content:
                  "Changing the expense type will clear the 'Specify Type' field. Do you want to proceed?",
                okButtonText: "Yes",
                cancelButtonText: "No",
                onOk: () => {
                  setExpenseTypes((prev) => ({
                    ...prev,
                    type: value,
                    otherType: undefined,
                  }));
                },
                onCancel: () => {
                  setExpenseTypes((prev) => ({
                    ...prev,
                    type: data?.type,
                  }));
                },
              }));
            } else {
              setExpenseTypes((prev) => ({
                ...prev,
                type: value,
              }));
            }
          },
          type: expenseTypes.type,
          other_type: expenseTypes.otherType,
          onOtherTypeChange: (value) => {
            if (value) {
              setExpenseTypes((prev) => ({
                ...prev,
                otherType: value,
              }));
            } else {
              setExpenseTypes((prev) => ({
                ...prev,
                otherType: undefined,
              }));
            }
          },
          includeId: true,
        })}
        title="Update Expense Information"
        apiRoute="expense"
        data={{
          ...data,
          type: expenseTypes.type,
          other_type: expenseTypes.otherType,
        }}
        isFetching={isLoading}
        isCreate={false}
        leftContent={<ReceiptPreview previewImage={previewImage} />}
        formInstance={form}
        onValuesChange={({ allValues }: OnFormValuesChangeProps) => {
          setFormData((prev: any) => ({
            allValues,
          }));
        }}
      />
    </div>
  );
}
