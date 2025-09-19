"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useStudent } from "../../student/hook/useStudent";
import { useStaff } from "../hook/useStaff";

export default function Home() {
  const { getCommonFormFields } = useStudent();
  const { getFormFields } = useStaff();

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
        title="Create new Staff"
        apiRoute="staff"
        data={{
          branch_id: "lvers",
        }}
      />
    </div>
  );
}
