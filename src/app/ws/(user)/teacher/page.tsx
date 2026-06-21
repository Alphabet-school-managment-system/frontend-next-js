"use client";

import { useTeacher } from "./hook/useTeacher";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useState } from "react";
import { Teacher } from "@/types";
import { UserDetailPage } from "@/components/common/userDetailPage";
import { Drawer } from "@/components/common/Drawer";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});
export default function Home() {
  const { getTableColumns } = useTeacher();
  const [openDrawer, setOpenDrawer] = useState<{
    detail: boolean;
  }>({ detail: false });
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>();
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      {openDrawer.detail && (
        <Drawer
          title="Teacher Information"
          open
          onClose={() => {
            setOpenDrawer((pre) => ({ ...pre, detail: false }));
            setSelectedTeacher(undefined);
          }}
          width={550}
          footer={null}
        >
          <UserDetailPage
            data={selectedTeacher}
            userType="teacher"
            onClose={(refetch: boolean) => {
              setOpenDrawer((pre) => ({ ...pre, detail: false }));
              setSelectedTeacher(undefined);
              if (refetch) {
                setReloadKey((prev) => prev + 1);
              }
            }}
          />
        </Drawer>
      )}
      <List
        columns={getTableColumns({
          onClick: (teacher) => {
            setSelectedTeacher(teacher);
            setOpenDrawer((pre) => ({ ...pre, detail: true }));
          },
        })}
        searchByCols={["first_name", "middle_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by teacher information (first name, middle name, email & phone number)"
        }
        route={"teacher"}
        addButtonTitle={"Add new teacher"}
        queryBy={[
          {
            type: "BRANCH",
            value: undefined,
          },
        ]}
        reloadKey={reloadKey}
      />
    </>
  );
}
