"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useBookTransaction } from "../hook/useBookTransaction";

export default function Home() {
  const { getFormFields } = useBookTransaction();

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
        title="Create new transaction"
        apiRoute="library-transaction"
      />
    </div>
  );
}
