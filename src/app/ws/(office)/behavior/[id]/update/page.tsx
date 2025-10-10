"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Behavior } from "@/types";
import { useBehavior } from "../../hook/useBehavior";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useBehavior();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<Behavior>(
    [],
    `behavior/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      payload.date = dayjs(result.date);
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
        title="Update Student Behavior Information"
        apiRoute="behavior"
        data={data}
        isFetching={isLoading}
        isCreate={false}
      />
    </div>
  );
}
