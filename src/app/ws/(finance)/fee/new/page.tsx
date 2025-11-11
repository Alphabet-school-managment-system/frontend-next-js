"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useFee } from "../hook/useFee";
import { useState } from "react";
import { getFileUrl, ReceiptPreview } from "../../expense/new/page";

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

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onFileChange: async (fileList) =>
            setPreviewImage((await getFileUrl(fileList)) ?? ""),
        })}
        title="Create new Fee"
        apiRoute="fee"
        leftContent={<ReceiptPreview previewImage={previewImage} />}
      />
    </div>
  );
}
