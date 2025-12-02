"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useBookTransaction } from "../hook/useBookTransaction";
import { useContext } from "react";
import { IdsContext } from "@/store/idsContext";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);
export default function Home() {
  const { getFormFields } = useBookTransaction();
  const { Ids } = useContext(IdsContext);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onBookSelect: async (value) => {},
        })}
        title="Create new transaction"
        apiRoute="library-transaction"
        data={{
          branch_id: Ids?.branchId,
        }}
      />
    </div>
  );
}
