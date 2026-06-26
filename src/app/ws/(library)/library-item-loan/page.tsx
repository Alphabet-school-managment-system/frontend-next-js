"use client";

import { useBookItemLoan } from "./hook/useBookItemLoan";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useBookItemLoan();

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
        queryBy={[
          {
            type: "BRANCH",
            value: undefined,
          },
        ]}
        name="Library Item Loan"
      />
    </>
  );
}
