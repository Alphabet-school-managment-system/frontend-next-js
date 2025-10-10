"use client";

import { useFinanceArchive } from "./hook/useFinanceArchive";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { Select } from "@/components/common/Select";
import { useState } from "react";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useFinanceArchive();
  const [type, setType] = useState("fee");

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["ay_name"]}
        searchInputPlaceholderText={
          "Search by Archive information (academic year)"
        }
        route={{
          api: "finance-summarie",
          page: "",
        }}
        showAddButton={false}
        FilterOption={
          <Select
            data={[
              {
                value: "fee",
                text: "Fees",
              },
              {
                value: "expense",
                text: "Expenses",
              },
            ]}
            placeholderText="Apply filter"
            onChange={(value: any) => {
              setType(value);
            }}
            classNames="shadow-none focus:shadow-none outline-none bg-transparent min-w-[150px]"
          />
        }
      />
    </>
  );
}
