"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Enrollment } from "@/types";
import { useEnrollment } from "../../hook/useEnrollment";
import dynamic from "next/dynamic";
import FormSkeleton from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useEnrollment();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<Enrollment>(
    [],
    `enrollment/${id}`,
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
        columns={1}
        fields={getFormFields()}
        title="Update Enrollment Information"
        apiRoute="enrollment"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
