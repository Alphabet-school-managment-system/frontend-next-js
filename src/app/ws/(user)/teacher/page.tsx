"use client";

import { useTeacher } from "./hook/useTeacher";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useContext, useEffect, useState } from "react";
import { Teacher } from "@/types";
import { UserDetailPage } from "@/components/common/userDetailPage";
import { UtilContext } from "@/store/utilContext";

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

  const { setDrawerProps } = useContext(UtilContext);

  useEffect(() => {
    if (openDrawer.detail) {
      setDrawerProps((prev) => ({
        ...prev,
        open: true,
        title: "Teacher Information",
        width: 550,
        footer: null,
        children: (
          <UserDetailPage
            data={selectedTeacher}
            userType="teacher"
            onClose={(refetch: boolean) => {
              setOpenDrawer((pre) => ({ ...pre, detail: false }));
              setSelectedTeacher(undefined);
              if (refetch) {
                setReloadKey((prev) => prev + 1);
              }
              setDrawerProps((prev) => ({ ...prev, open: false }));
            }}
            onClick={() => {
              setSelectedTeacher(selectedTeacher);
              setOpenDrawer((pre) => ({ detail: true, children: true }));
            }}
          />
        ),
        onClose: () => {
          setOpenDrawer((pre) => ({ ...pre, detail: false }));
          setDrawerProps((prev) => ({ ...prev, open: false }));
        },
      }));
    }
  }, [openDrawer]);

  return (
    <>
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
        name="Teacher"
      />
    </>
  );
}
