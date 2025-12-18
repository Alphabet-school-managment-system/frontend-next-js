"use client";

import { useFee } from "./hook/useFee";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useFee();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["type", "status", "amount", "due_date", "other_type"]}
        searchInputPlaceholderText={
          "Search by fee information (type, status, amount & due date)"
        }
        route={"fee"}
        addButtonTitle={"Add new fee"}
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
