"use client";

import { useClassSection } from "./hook/useClassSection";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useClassSection();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["class_name"]}
        searchInputPlaceholderText={"Search by class name"}
        route={"class-section"}
        addButtonTitle={"Add new Class Sec"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: false,
        }}
      />
    </>
  );
}
