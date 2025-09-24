"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useBehavior } from "../hook/useBehavior";

export default function Home() {
  const { getFormFields } = useBehavior();

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
        title="Create new Student Behavior"
        apiRoute="behavior"
        data={{
          branch_id: "lvers",
        }}
      />
    </div>
  );
}
