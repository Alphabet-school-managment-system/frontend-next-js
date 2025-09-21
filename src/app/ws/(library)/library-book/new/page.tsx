"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useLibraryBook } from "../hook/useLibraryBook";

export default function Home() {
  const { getFormFields } = useLibraryBook();

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
        title="Create new Library Book"
        apiRoute="library-book"
        data={{
          branch_id: "lvers",
        }}
      />
    </div>
  );
}
