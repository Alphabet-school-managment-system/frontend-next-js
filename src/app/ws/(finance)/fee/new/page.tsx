"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { FeeType, useFee } from "../hook/useFee";
import { useContext, useState } from "react";
import { getFileUrl, ReceiptPreview } from "../../expense/new/page";
import { IdsContext } from "@/store/idsContext";
import { Form } from "antd";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);
export default function Home() {
  const { getFormFields } = useFee();
  const [previewImage, setPreviewImage] = useState("");
  const { Ids } = useContext(IdsContext);
  const [feeTypes, setFeeTypes] = useState<{
    type?: FeeType;
    otherType?: FeeType;
  }>({});

  const [form] = Form.useForm();

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onFileChange: async (fileList) =>
            setPreviewImage((await getFileUrl(fileList)) ?? ""),
          onTypeChange: (value: FeeType) => {
            setFeeTypes((prev) => ({
              ...prev,
              type: value,
            }));
            if (value !== FeeType.Other) {
              setFeeTypes((prev) => ({
                ...prev,
                otherType: undefined,
              }));
              form.setFieldValue("other_type", undefined);
              form.resetFields(["other_type"]);
            }
          },
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
              form.setFieldValue("other_type", undefined);
            }
          },
          type: feeTypes.type,
          other_type: feeTypes.otherType,
        })}
        title="Create new Fee"
        apiRoute="fee"
        data={{
          academic_year_id: Ids?.academicYearId,
        }}
        leftContent={<ReceiptPreview previewImage={previewImage} />}
      />
    </div>
  );
}
