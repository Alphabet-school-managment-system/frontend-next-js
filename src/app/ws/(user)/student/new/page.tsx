"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useStudent } from "../hook/useStudent";

export default function Home() {
  const { getFormFields } = useStudent();

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
        title="Create new Student"
        apiRoute="student"
      />
    </div>
  );
}
