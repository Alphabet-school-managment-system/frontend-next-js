"use client";

import { useExpense } from "./hook/useExpense";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useExpense();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["title", "date", "type", "other_type"]}
        searchInputPlaceholderText={
          "Search by expense information (title, date & type)"
        }
        route={"expense"}
        addButtonTitle={"Add new expense"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: true,
        }}
        queryBy={QueryBy.ACADEMIC_YEAR}
      />
    </>
  );
}
