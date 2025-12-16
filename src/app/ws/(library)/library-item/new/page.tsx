"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useLibraryItem } from "../hook/useLibraryItem";
import { IdsContext } from "@/store/idsContext";
import { useContext } from "react";

export default function Home() {
  const { getFormFields } = useLibraryItem();
  const { Ids } = useContext(IdsContext);

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
        title="Create new Library Book"
        apiRoute="library-item"
        data={{
          branch_id: Ids?.branchId,
        }}
      />
    </div>
  );
}
