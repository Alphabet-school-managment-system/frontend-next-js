"use client";

import { useStudent } from "./hook/useStudent";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useState } from "react";
import { Student } from "@/types";
import { Drawer } from "@/components/common/Drawer";
import { UserDetailPage } from "@/components/common/userDetailPage";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useStudent();
  const [openDrawer, setOpenDrawer] = useState<{
    detail: boolean;
  }>({ detail: false });
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      {openDrawer.detail && (
        <Drawer
          title="Student Information"
          open
          onClose={() => {
            setOpenDrawer((pre) => ({ ...pre, detail: false }));
            setSelectedStudent(undefined);
          }}
          width={550}
          footer={null}
        >
          <UserDetailPage
            data={selectedStudent}
            userType="student"
            onLoading={(value: boolean) => {
              setLoading(value);
            }}
            onClose={(refetch: boolean) => {
              setOpenDrawer((pre) => ({ ...pre, detail: false }));
              setSelectedStudent(undefined);
              if (refetch) {
                setReloadKey((prev) => prev + 1);
              }
            }}
          />
        </Drawer>
      )}
      <List
        columns={getTableColumns({
          onClick: (student) => {
            setSelectedStudent(student);
            setOpenDrawer((pre) => ({ detail: true }));
          },
        })}
        searchByCols={["first_name", "last_name", "email", "phone"]}
        searchInputPlaceholderText={
          "Search by student information (first name, last name, email & phone number)"
        }
        route={"student"}
        addButtonTitle={"Add new student"}
        actionPrevilage={{
          edit: true,
          delete: true,
        }}
        queryBy={[
          {
            type: "BRANCH",
            value: undefined,
          },
        ]}
        loading={loading}
        reloadKey={reloadKey}
      />
    </>
  );
}
