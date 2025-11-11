"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Expense } from "@/types";
import { useExpense } from "../../hook/useExpense";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getFileUrl, ReceiptPreview } from "../../new/page";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useExpense();
  const [data, setData] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState("");

  const { data: result, isLoading } = useApiQuery<Expense>(
    [],
    `expense/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      payload.date = dayjs(result.date);
      setData(payload);
    }
  }, [result]);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onFileChange: async (fileList) =>
            setPreviewImage((await getFileUrl(fileList)) ?? ""),
        })}
        title="Update Expense Information"
        apiRoute="expense"
        data={data}
        isFetching={isLoading}
        isCreate={false}
        leftContent={<ReceiptPreview previewImage={previewImage} />}
      />
    </div>
  );
}
