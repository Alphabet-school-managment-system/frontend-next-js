"use client";

import { ArraySearch } from "@/lib/array-search";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
} from "@/store/confirmationModalContext";
import { useContext, useEffect, useState } from "react";
import { useStudent } from "./hook/useStudent";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useRouter } from "next/navigation";

export default function Home() {
  const { getTableColumns } = useStudent();
  const router = useRouter();

  const [student, setStudent] = useState<any[]>([]);
  const [studentCopy, setStudentCopy] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // fetch the data
  }, []);

  useEffect(() => {
    if (studentCopy.length > 0) {
      if (searchValue) {
        const result = ArraySearch({ searchValue }, student, [
          "first_name",
          "last_name",
          "email",
          "phone",
        ]);
        setStudent(result);
      } else {
        setStudent(studentCopy);
      }
    }
  }, [searchValue, studentCopy]);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  useEffect(() => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      onCancel: () => {},
    }));
  }, []);

  const Table = dynamic(() => import("@/components/common/Table"), {
    ssr: false,
    loading: () => <TableSkeleton />,
  });

  return (
    <>
      <Table
        data={student}
        columns={getTableColumns()}
        rowKey="_id"
        loading={false}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={
          "Search by student information (first name, last name, email & phone number)"
        }
        onAddButtonClicked={() => {
          router.push("/ws/student/new");
        }}
        addButtonTitle={"Add new student"}
        showAddButton={true}
        pagination={{
          onChange: (_: any, pageSize: any) => {
            console.log(pageSize);
          },
        }}
      />
    </>
  );
}
