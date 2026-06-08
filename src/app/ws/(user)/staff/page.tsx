"use client";

import { useStaff } from "./hook/useStaff";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";
import { useState } from "react";
import { Staff } from "@/types";
import { Drawer } from "@/components/common/Drawer";
import { UserDetailPage } from "@/components/common/userDetailPage";

export default function Home() {
  const { getTableColumns } = useStaff();
  const [openDrawer, setOpenDrawer] = useState<{
    detail: boolean;
  }>({ detail: false });
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>();

  const List = dynamic(() => import("@/components/list/index"), {
    ssr: false,
    loading: () => <TableSkeleton />,
  });

  return (
    <>
      {openDrawer.detail && (
        <Drawer
          title="Staff Information"
          open
          onClose={() => {
            setOpenDrawer((pre) => ({ ...pre, detail: false }));
            setSelectedStaff(undefined);
          }}
          width={600}
          footer={null}
        >
          <UserDetailPage data={selectedStaff} />
        </Drawer>
      )}
      <List
        columns={getTableColumns({
          onClick: (staff) => {
            setSelectedStaff(staff);
            setOpenDrawer((pre) => ({ detail: true }));
          },
        })}
        searchByCols={["first_name", "middle_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by staff information (first name, middle name, email & phone)"
        }
        route={"staff"}
        addButtonTitle={"Add new staff"}
        queryBy={QueryBy.BRANCH}
      />
    </>
  );
}
