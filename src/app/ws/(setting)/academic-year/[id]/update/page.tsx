"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { AcademicYear } from "@/types";
import { useAcademicYear } from "../../hook/useAcademicYear";
import dynamic from "next/dynamic";
import FormSkeleton from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useAcademicYear();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<AcademicYear>(
    [],
    `academic-year/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      payload.start_date = dayjs(result.start_date);
      payload.end_date = dayjs(result.end_date);
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
        title="Update Academic Information"
        apiRoute="academic-year"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
