"use client";

import { useStaff } from "./hook/useStaff";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

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
        searchByCols={["first_name", "last_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by staff information (first name, last name, email & phone number)"
        }
        route={"staff"}
        addButtonTitle={"Add new staff"}
      />
    </>
  );
}
