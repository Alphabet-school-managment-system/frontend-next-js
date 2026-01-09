"use client";

import { useTeacher } from "./hook/useTeacher";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";

export default function Home() {
  const { getTableColumns } = useTeacher();

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
          "Search by teacher information (first name, middle name, email & phone number)"
        }
        route={"teacher"}
        addButtonTitle={"Add new teacher"}
        queryBy={QueryBy.BRANCH}
      />
    </>
  );
}
