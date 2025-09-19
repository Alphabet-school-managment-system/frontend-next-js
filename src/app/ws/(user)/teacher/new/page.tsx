"use client";

import { FieldType } from "@/components/forms/FormGenerator";
import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useStudent } from "../../student/hook/useStudent";
import { useTeacher } from "../hook/useTeacher";

export default function Home() {
  const { getCommonFormFields } = useStudent();
  const { getFormFields } = useTeacher();

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
        title="Create new Teacher"
        apiRoute="teacher"
        data={{
          branch_id: "lvers",
        }}
      />
    </div>
  );
}
