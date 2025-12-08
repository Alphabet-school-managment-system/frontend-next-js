"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { LibraryBook } from "@/types";
import { useBookTransaction } from "../../hook/useBookTransaction";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useBookTransaction();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<LibraryBook>(
    [],
    `library-item-loan/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      setData(payload);
    }
  }, [result]);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onBookSelect: async (value) => {},
        })}
        title="Update Book Transaction Information"
        apiRoute="library-item-loan"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
