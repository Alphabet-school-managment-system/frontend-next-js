"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useBranch } from "../hook/useBranch";

export default function Home() {
  const { getFormFields } = useBranch();

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
        title="Create new Branch"
        apiRoute="branch"
        data={{
          school_id: "lvers",
        }}
      />
    </div>
  );
}
