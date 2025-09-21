"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Fee } from "@/types";
import { useFee } from "../../hook/useFee";
import dynamic from "next/dynamic";
import FormSkeleton from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useFee();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<Fee>(
    [],
    `fee/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      payload.due_date = dayjs(result.due_date);
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
        title="Update Fee Information"
        apiRoute="fee"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
