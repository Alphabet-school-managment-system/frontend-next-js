"use client";

import { useStaff } from "./hook/useStaff";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";

export default function Home() {
  const { getTableColumns } = useStaff();

  const List = dynamic(() => import("@/components/list/index"), {
    ssr: false,
    loading: () => <TableSkeleton />,
  });

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["first_name", "middle_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by staff information (first name, middle name, email & phone)"
        }
        route={"staff"}
        addButtonTitle={"Add new staff"}
        queryBy={QueryBy.BRANCH}
      />
    </>
  );
}
