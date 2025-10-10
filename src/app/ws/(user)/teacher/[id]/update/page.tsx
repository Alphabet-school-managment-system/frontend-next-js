"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useApiQuery } from "@/hooks/useApi";
import { Teacher } from "@/types";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStudent } from "../../../student/hook/useStudent";
import { useTeacher } from "../../hook/useTeacher";

export default function Home() {
  const { id } = useParams();
  const { getCommonFormFields } = useStudent();
  const { getFormFields } = useTeacher();

  const [data, setData] = useState<any>(null);
  const { data: result, isLoading } = useApiQuery<Teacher>(
    [],
    `teacher/${id}`,
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
        fields={[...getCommonFormFields(), ...getFormFields()]}
        title="Update Teacher Information"
        apiRoute="teacher"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
