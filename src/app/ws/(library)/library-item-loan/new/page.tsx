"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useBookItemLoan } from "../hook/useBookItemLoan";
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
  const { getFormFields } = useBookItemLoan();
  const { Ids } = useContext(IdsContext);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onBookSelect: async (value) => {},
        })}
        title="Create new transaction"
        apiRoute="library-item-loan"
        data={{
          branch_id: Ids?.branchId,
        }}
      />
    </div>
  );
}
