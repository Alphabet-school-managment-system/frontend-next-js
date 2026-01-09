"use client";

import { useLeaveRequest } from "./hook/useLeaveRequest";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { Select } from "@/components/common/Select";
import { useState } from "react";
import { QueryBy } from "@/components/list/index";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useLeaveRequest();
  const [userType, setUserType] = useState<"student" | "teacher">("student");

  return (
    <>
      <List
        columns={getTableColumns(userType)}
        searchByCols={["first_name", "last_name"]}
        searchInputPlaceholderText={
          "Search by user information (first name & last name)"
        }
        route={{
          api: "leaverequest",
          page: "leave-request",
        }}
        showAddButton={false}
        actionPrevilage={{
          edit: false,
          delete: false,
          detail: true,
        }}
        FilterOption={
          <Select
            data={[
              {
                value: "student",
                label: "Students",
              },
              {
                value: "teacher",
                label: "Teachers",
              },
            ]}
            placeholderText="Apply filter"
            onChange={(value: any) => {
              setUserType(value);
            }}
            classNames="shadow-none focus:shadow-none outline-none bg-transparent min-w-[150px]"
          />
        }
        queryBy={QueryBy.ACADEMIC_YEAR}
      />
    </>
  );
}
