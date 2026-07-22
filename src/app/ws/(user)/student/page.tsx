"use client";

import { useStudent } from "./hook/useStudent";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useContext, useEffect, useState } from "react";
import { Student } from "@/types";
import { UserDetailPage } from "@/components/common/userDetailPage";
import { UtilContext } from "@/store/utilContext";

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

  const { setDrawerProps } = useContext(UtilContext);

  useEffect(() => {
    if (openDrawer.detail) {
      setDrawerProps((prev) => ({
        ...prev,
        open: true,
        title: "Student Information",
        width: 550,
        footer: null,
        children: (
          <UserDetailPage
            data={selectedStudent}
            userType="student"
            onClose={(refetch: boolean) => {
              setOpenDrawer((pre) => ({ ...pre, detail: false }));
              setSelectedStudent(undefined);
              if (refetch) {
                setReloadKey((prev) => prev + 1);
              }
              setDrawerProps((prev) => ({ ...prev, open: false }));
            }}
            onClick={() => {
              setSelectedStudent(selectedStudent);
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
        name="Student"
      />
    </>
  );
}
