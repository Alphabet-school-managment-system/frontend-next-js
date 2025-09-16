"use client";

import { useParent } from "./hook/useParent";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

export default function Home() {
  const { getTableColumns } = useParent();

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
          "Search by parent information (first name, last name, email & phone number)"
        }
        route={"parent"}
        addButtonTitle={"Add new parent"}
      />
    </>
  );
}
