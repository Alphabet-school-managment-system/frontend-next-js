"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useStudent } from "../../student/hook/useStudent";
import { useParent } from "../hook/useParent";

export default function Home() {
  const { getCommonFormFields } = useStudent();
  const { getFormFields } = useParent();

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
        title="Create new Parent"
        apiRoute="parent"
        data={{
          branch_id: "lvers",
        }}
      />
    </div>
  );
}
