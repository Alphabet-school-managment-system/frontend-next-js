"use client";

import { useBehavior } from "./hook/useBehavior";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useBehavior();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["first_name", "last_name", "date"]}
        searchInputPlaceholderText={
          "Search by student information (first name, last name & date)"
        }
        route={"behavior"}
        addButtonTitle={"Add new student behavior"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: true,
        }}
        queryBy={[
          {
            type: "ACADEMIC_YEAR",
            value: undefined,
          },
        ]}
      />
    </>
  );
}
