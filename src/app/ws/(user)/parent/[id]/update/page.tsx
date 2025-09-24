"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import { useApiQuery } from "@/hooks/useApi";
import { Parent } from "@/types";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useParent } from "../../hook/useParent";
import { useStudent } from "../../../student/hook/useStudent";

export default function Home() {
  const { id } = useParams();
  const { getFormFields } = useParent();
  const { getCommonFormFields } = useStudent();

  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<Parent>(
    [],
    `parent/${id}`,
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
        title="Update Parent Information"
        apiRoute="parent"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
