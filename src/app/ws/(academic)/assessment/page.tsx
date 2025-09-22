"use client";

import { useAssessment } from "./hook/useAssessment";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { Select } from "@/components/common/Select";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useAssessment();

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["teacher_full_name", "class_name", "subject"]}
        searchInputPlaceholderText={
          "Search by assessment information (teacher, class name & subject)"
        }
        route={"assessment"}
        showAddButton={false}
        actionPrevilage={{
          detail: true,
        }}
        FilterOption={
          <Select
            data={[]}
            placeholderText="Apply filter"
            onChange={(value: any) => {}}
            classNames="shadow-none focus:shadow-none outline-none bg-transparent min-w-[150px]"
          />
        }
      />
    </>
  );
}
