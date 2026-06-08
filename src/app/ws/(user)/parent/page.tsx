"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Drawer } from "@/components/common/Drawer";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { QueryBy } from "@/components/list/index";
import { Parent } from "@/types";
import { useParent } from "./hook/useParent";
import { ParentChildrenDrawer } from "./ParentChildrenDrawer";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useParent();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | undefined>();

  return (
    <>
      {openDrawer && (
        <Drawer
          title="Children Information"
          open
          onClose={() => {
            setOpenDrawer(false);
            setSelectedParent(undefined);
          }}
          width={800}
          footer={null}
        >
          <ParentChildrenDrawer parent={selectedParent} />
        </Drawer>
      )}
      <List
        columns={getTableColumns({
          onShowChildren: (parent) => {
            setSelectedParent(parent);
            setOpenDrawer(true);
          },
        })}
        searchByCols={["first_name", "last_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by parent information (first name, last name, email & phone number)"
        }
        route={"parent"}
        addButtonTitle={"Add new parent"}
        queryBy={QueryBy.BRANCH}
      />
    </>
  );
}
