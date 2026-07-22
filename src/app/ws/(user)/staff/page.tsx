"use client";

import { useStaff } from "./hook/useStaff";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useContext, useEffect, useState } from "react";
import { Staff } from "@/types";
import { Drawer } from "@/components/common/Drawer";
import { UserDetailPage } from "@/components/common/userDetailPage";
import { UtilContext } from "@/store/utilContext";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useStaff();
  const [openDrawer, setOpenDrawer] = useState<{
    detail: boolean;
  }>({ detail: false });
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>();
  const [reloadKey, setReloadKey] = useState(0);
  const { setDrawerProps } = useContext(UtilContext);

  useEffect(() => {
    if (openDrawer.detail) {
      setDrawerProps((prev) => ({
        ...prev,
        open: true,
        title: "Staff Information",
        width: 550,
        footer: null,
        children: (
          <UserDetailPage
            data={selectedStaff}
            userType="staff"
            onClose={(refetch: boolean) => {
              setOpenDrawer((pre) => ({ ...pre, detail: false }));
              setSelectedStaff(undefined);
              if (refetch) {
                setReloadKey((prev) => prev + 1);
              }
              setDrawerProps((prev) => ({ ...prev, open: false }));
            }}
            onClick={() => {
              setSelectedStaff(selectedStaff);
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
        queryBy={[
          {
            type: "BRANCH",
            value: undefined,
          },
        ]}
        reloadKey={reloadKey}
        name="Staff"
      />
    </>
  );
}
