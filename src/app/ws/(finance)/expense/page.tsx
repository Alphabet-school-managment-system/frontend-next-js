"use client";

import { useExpense } from "./hook/useExpense";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

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
          detail: false,
        }}
        queryBy={[
          {
            type: "ACADEMIC_YEAR",
            value: undefined,
          },
          {
            type: "OTHER",
            value: [
              {
                key: "sort_by",
                value: "updated_at",
              },
              {
                key: "sort_dir",
                value: "desc",
              }
            ],
          },
        ]}
        name="Expense"
      />
    </>
  );
}
