"use client";

import { ArraySearch } from "@/lib/array-search";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
} from "@/store/confirmationModalContext";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useRouter } from "next/navigation";

type props = {
  columns: any[];
  searchByCols: string[];
  searchInputPlaceholderText: string;
  route: string;
  addButtonTitle?: string;
  showAddButton?: boolean;
};
const Index = ({
  columns,
  searchByCols,
  searchInputPlaceholderText,
  route,
  addButtonTitle,
  showAddButton = true,
}: props) => {
  const router = useRouter();

  const [datas, setDatas] = useState<any[]>([]);
  const [datasCopy, setDatasCopy] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // fetch the data
  }, []);

  useEffect(() => {
    if (datas.length > 0) {
      if (searchValue) {
        const result = ArraySearch({ searchValue }, datas, searchByCols);
        setDatas(result);
      } else {
        setDatas(datasCopy);
      }
    }
  }, [searchValue, datasCopy]);

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
        data={datas}
        columns={columns}
        rowKey="_id"
        loading={false}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={searchInputPlaceholderText}
        onAddButtonClicked={() => {
          router.push(`/ws/${route}/new`);
        }}
        addButtonTitle={addButtonTitle}
        showAddButton={showAddButton}
        pagination={{
          onChange: (_: any, pageSize: any) => {
            console.log(pageSize);
          },
        }}
      />
    </>
  );
};

export default Index;
