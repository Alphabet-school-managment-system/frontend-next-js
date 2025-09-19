"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useBranch } from "../../hook/useBranch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Branch } from "@/types";
import { useApiQuery } from "@/hooks/useApi";

export default function Home() {
  const { id } = useParams();
  const { getFormFields } = useBranch();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<Branch>(
    [],
    `branch/${id}`,
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
        title="Update Branch Information"
        apiRoute="branch"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
