"use client";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { Parent } from "@/types";
import { useParent } from "./hook/useParent";
import { ParentChildrenDrawer } from "./ParentChildrenDrawer";
import { UserDetailPage } from "../../../../components/common/userDetailPage";
import { UtilContext } from "@/store/utilContext";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useParent();
  const [openDrawer, setOpenDrawer] = useState<{
    detail: boolean;
    children: boolean;
  }>({ detail: false, children: false });
  const [selectedParent, setSelectedParent] = useState<Parent | undefined>();
  const [reloadKey, setReloadKey] = useState(0);

  const { setDrawerProps } = useContext(UtilContext);

  useEffect(() => {
    if (openDrawer.children) {
      setDrawerProps((prev) => ({
        ...prev,
        open: true,
        title: "Children Information",
        width: 600,
        footer: null,
        children: <ParentChildrenDrawer parent={selectedParent} />,
        onClose: () => {
          setOpenDrawer((pre) => ({ detail: true, children: false }));
          setDrawerProps((prev) => ({ ...prev, open: false }));
        },
      }));
    } else if (openDrawer.detail) {
      setDrawerProps((prev) => ({
        ...prev,
        open: true,
        title: "Parent Information",
        width: 600,
        footer: null,
        children: (
          <UserDetailPage
            data={selectedParent}
            userType="parent"
            onClose={(refetch: boolean) => {
              setOpenDrawer((pre) => ({ ...pre, detail: false }));
              setSelectedParent(undefined);
              if (refetch) {
                setReloadKey((prev) => prev + 1);
              }
              setDrawerProps((prev) => ({ ...prev, open: false }));
            }}
            onClick={() => {
              setSelectedParent(selectedParent);
              setOpenDrawer((pre) => ({ detail: true, children: true }));
            }}
          />
        ),
        onClose: () => {
          setOpenDrawer((pre) => ({ ...pre, detail: false }));
          setDrawerProps((prev) => ({ ...prev, open: false }));
        },
      }));
    } else {
      setDrawerProps((prev) => ({ ...prev, open: false }));
    }
  }, [openDrawer]);

  return (
    <>
      <List
        columns={getTableColumns({
          onShowChildren: (parent) => {
            setSelectedParent(parent);
            setOpenDrawer((pre) => ({ detail: false, children: true }));
          },
          onClick: (parent) => {
            setSelectedParent(parent);
            setOpenDrawer((pre) => ({ children: false, detail: true }));
          },
        })}
        searchByCols={["first_name", "last_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by parent information (first name, last name, email & phone number)"
        }
        route={"parent"}
        addButtonTitle={"Add new parent"}
        queryBy={[
          {
            type: "BRANCH",
            value: undefined,
          },
        ]}
        reloadKey={reloadKey}
        name={"Parent"}
      />
    </>
  );
}
