"use client";

import { useLibraryItem } from "./hook/useLibraryItem";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useLibraryItem();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["title", "author", "isbn"]}
        searchInputPlaceholderText={
          "Search by book information (title, author & isbn)"
        }
        route={{
          api: "library-item",
          page: "library-item",
        }}
        addButtonTitle={"Add new book"}
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
      />
    </>
  );
}
