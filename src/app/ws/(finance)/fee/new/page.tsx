"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useFee } from "../hook/useFee";
import { useContext, useState } from "react";
import { getFileUrl, ReceiptPreview } from "../../expense/new/page";
import { IdsContext } from "@/store/idsContext";

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
        data={{
          academic_year_id: Ids?.academicYearId,
        }}
        leftContent={<ReceiptPreview previewImage={previewImage} />}
      />
    </div>
  );
}
