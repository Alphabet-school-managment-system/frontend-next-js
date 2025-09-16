"use client";

import { useStudent } from "./hook/useStudent";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

export default function Home() {
  const { getTableColumns } = useStudent();

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
          "Search by student information (first name, last name, email & phone number)"
        }
        route={"student"}
        addButtonTitle={"Add new student"}
      />
    </>
  );
}
