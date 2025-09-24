"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useClassSection } from "../hook/useClassSection";

export default function Home() {
  const { getFormFields } = useClassSection();

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
        title="Create new class secion association"
        apiRoute="class-section"
        data={{
          branch_id: "lvers",
        }}
      />
    </div>
  );
}
