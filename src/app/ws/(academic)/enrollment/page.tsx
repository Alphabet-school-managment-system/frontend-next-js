"use client";

import { useEnrollment } from "./hook/useEnrollment";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { IdsContext } from "@/store/idsContext";
import { useContext } from "react";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { Ids } = useContext(IdsContext);
  const { getTableColumns } = useEnrollment({ Ids });

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["first_name", "last_name", "class_name"]}
        searchInputPlaceholderText={
          "Search by enrollment information (first name, last name & class_name)"
        }
        route={"enrollment"}
        addButtonTitle={"Add new enrollment"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: false,
        }}
        queryBy={[
          {
            type: "ACADEMIC_YEAR",
            value: undefined,
          },
        ]}
        name="Enrollment"
      />
    </>
  );
}
