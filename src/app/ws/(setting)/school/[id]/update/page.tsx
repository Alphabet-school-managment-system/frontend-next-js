"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useSchool } from "../../hook/useSchool";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { School } from "@/types";
import { useApiQuery } from "@/hooks/useApi";

export default function Home() {
  const { id } = useParams();
  const { getFormFields } = useSchool();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<School>(
    [],
    `school/${id}`,
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
        title="Update School Information"
        apiRoute="school"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
