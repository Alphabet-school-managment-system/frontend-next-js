"use client";

import { ArraySearch } from "@/lib/array-search";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
  defaultConfirmationModalProps,
} from "@/store/confirmationModalContext";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useRouter } from "next/navigation";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { Icon } from "@iconify-icon/react";

type props = {
  columns: any[];
  searchByCols: string[];
  searchInputPlaceholderText: string;
  route: string;
  addButtonTitle?: string;
  showAddButton?: boolean;
};

const Table = dynamic(() => import("@/components/common/Table"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

const Index = ({
  columns,
  searchByCols,
  searchInputPlaceholderText,
  route,
  addButtonTitle,
  showAddButton = true,
}: props) => {
  const router = useRouter();

  const [datas, setDatas] = useState<unknown[] | any>([]);
  const [datasCopy, setDatasCopy] = useState<unknown[] | any>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useApiQuery([route], `${route}`);
  const { mutate: Delete, isPending: deleting } = useApiMutation(
    [route],
    `${route}/${selectedRow?.id}/delete`,
    "DELETE"
  );

  useEffect(() => {
    if (data) {
      setDatas(data);
      setDatasCopy(data);
    }
  }, [data]);

  useEffect(() => {
    if (datasCopy.length > 0) {
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

  const handleDelete = () => {
    try {
      Delete(null, {
        onSuccess: (res) => {
          setcmProps({ ...defaultConfirmationModalProps });
          router.back();
        },
      });
    } catch (error) {
      console.log("Item deletion error:", error);
    }
  };

  const actionCol = () => {
    return [
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_: string, record: any) => (
          <div className="flex justify-between items-center">
            <span
              className="flex p-2 hover:cursor-pointer"
              title="edit"
              onClick={() => {
                router.push(`/ws/${route}/${record.id}/update`);
              }}
            >
              <Icon
                icon="line-md:edit"
                width={22}
                height={22}
                className="text-gray-900"
              />
            </span>
            <span
              className="flex p-2 hover:cursor-pointer"
              title="delete"
              onClick={() => {
                setcmProps((prev: ConfirmationModalPropsType) => ({
                  ...prev,
                  show: true,
                  onOk: () => {
                    setSelectedRow(record);
                    handleDelete();
                  },
                }));
              }}
            >
              <Icon
                icon="mdi:trash-outline"
                width={22}
                height={22}
                className="text-gray-900"
              />
            </span>
            <span className="flex p-2 hover:cursor-pointer" title="detail">
              <Icon
                icon="bx:detail"
                width={22}
                height={22}
                className="text-gray-900"
              />
            </span>
          </div>
        ),
      },
    ];
  };

  return (
    <div className="p-4">
      <Table
        data={datas}
        columns={[...columns, ...actionCol()]}
        rowKey="_id"
        loading={isLoading || deleting}
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
    </div>
  );
};

export default Index;
