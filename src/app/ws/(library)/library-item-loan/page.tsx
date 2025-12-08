"use client";

import { useBookTransaction } from "./hook/useBookTransaction";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useBookTransaction();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["first_name", "last_name", "book_title"]}
        searchInputPlaceholderText={
          "Search by book and borrower information (first name, last name & title)"
        }
        route={"library-item-loan"}
        addButtonTitle={"Add new transaction"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: true,
        }}
        queryBy={QueryBy.BRANCH}
      />
    </>
  );
}
