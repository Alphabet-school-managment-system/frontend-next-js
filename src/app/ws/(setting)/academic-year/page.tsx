"use client";

import { useAcademicYear } from "./hook/useAcademicYear";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useAcademicYear();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["name", "start_date", "end_date"]}
        searchInputPlaceholderText={
          "Search by academic year information (name, start & end date)"
        }
        route={"academic-year"}
        addButtonTitle={"Add new Academic Year"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: false,
        }}
      />
    </>
  );
}
