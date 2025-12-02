"use client";

import { useLibraryBook } from "./hook/useLibraryBook";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useLibraryBook();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["title", "author", "isbn"]}
        searchInputPlaceholderText={
          "Search by book information (title, author & isbn)"
        }
        route={{
          api: "library-book",
          page: "library-book",
        }}
        addButtonTitle={"Add new book"}
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
