"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useEnrollment } from "../hook/useEnrollment";

export default function Home() {
  const { getFormFields } = useEnrollment();

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
        title="Create new enrollment"
        apiRoute="enrollment"
        data={{
          academic_year_id: "lvers",
        }}
      />
    </div>
  );
}
