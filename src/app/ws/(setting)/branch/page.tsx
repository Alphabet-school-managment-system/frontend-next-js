"use client";

import { useBranch } from "./hook/useBranch";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useBranch();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["name", "address"]}
        searchInputPlaceholderText={
          "Search by branch information (name & address)"
        }
        route={"branch"}
        addButtonTitle={"Add new branch"}
      />
    </>
  );
}
