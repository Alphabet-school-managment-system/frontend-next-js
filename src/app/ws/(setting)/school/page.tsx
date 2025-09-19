"use client";

import { useSchool } from "./hook/useSchool";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useSchool();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["name", "address", "contact"]}
        searchInputPlaceholderText={
          "Search by school information (name, address & contact)"
        }
        route={"school"}
        showAddButton={false}
        actionPrevilage={{
          edit: true,
        }}
      />
    </>
  );
}
