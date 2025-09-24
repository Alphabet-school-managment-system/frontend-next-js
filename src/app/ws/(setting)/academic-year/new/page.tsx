"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useAcademicYear } from "../hook/useAcademicYear";

export default function Home() {
  const { getFormFields } = useAcademicYear();

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
        title="Create new Academic Year"
        apiRoute="academic-year"
        data={{
          branch_id: "lvers",
        }}
      />
    </div>
  );
}
