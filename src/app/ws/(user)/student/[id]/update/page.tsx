"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Student } from "@/types";
import { useStudent } from "../../hook/useStudent";
import dynamic from "next/dynamic";
import FormSkeleton from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useStudent();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<Student>(
    [],
    `student/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      payload.dob = dayjs(result.dob);
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
        onSubmit={(values) => console.log("Student form submitted:", values)}
        title="Update Student Information"
        apiRoute="student"
        data={data}
        isFetching={isLoading}
      />
    </div>
  );
}
