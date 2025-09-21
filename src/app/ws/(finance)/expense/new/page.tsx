"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useExpense } from "../hook/useExpense";

export default function Home() {
  const { getFormFields } = useExpense();

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
        title="Create new Expense"
        apiRoute="expense"
        data={{
          branch_id: "lvers",
          academic_year_id: "kjk",
        }}
      />
    </div>
  );
}
