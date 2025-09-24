"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { ClassSection } from "@/types";
import { useClassSection } from "../../hook/useClassSection";
import dynamic from "next/dynamic";
import FormSkeleton from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useClassSection();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<ClassSection>(
    [],
    `class-section/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      setData(payload);
    }
  }, [result]);

  const FormGenerator = dynamic(
    () => import("@/components/forms/FormGenerator"),
    {
      ssr: false,
      loading: () => <FormSkeleton />,
    }
  );

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields()}
        title="Update Class section Information"
        apiRoute="class-section"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
