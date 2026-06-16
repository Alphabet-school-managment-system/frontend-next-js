"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Drawer } from "@/components/common/Drawer";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";
import { Parent } from "@/types";
import { useParent } from "./hook/useParent";
import { ParentChildrenDrawer } from "./ParentChildrenDrawer";
import { UserDetailPage } from "../../../../components/common/userDetailPage";

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

  return (
    <>
      {openDrawer.children && (
        <Drawer
          title="Children Information"
          open
          onClose={() => {
            setOpenDrawer((pre) => ({ ...pre, children: false }));
            setSelectedParent(undefined);
          }}
          width={800}
          footer={null}
        >
          <ParentChildrenDrawer parent={selectedParent} />
        </Drawer>
      )}
      {openDrawer.detail && (
        <Drawer
          title="Parent Information"
          open
          onClose={() => {
            setOpenDrawer((pre) => ({ ...pre, detail: false }));
            setSelectedParent(undefined);
          }}
          width={550}
          footer={null}
        >
          <UserDetailPage
            data={selectedParent}
            userType="parent"
            onClose={(refetch: boolean) => {
              setOpenDrawer((pre) => ({ ...pre, detail: false }));
              setSelectedParent(undefined);
              if (refetch) {
                setReloadKey((prev) => prev + 1);
              }
            }}
          />
        </Drawer>
      )}
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
        queryBy={QueryBy.BRANCH}
        reloadKey={reloadKey}
      />
    </>
  );
}
