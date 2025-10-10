"use client";

import { ArraySearch } from "@/lib/array-search";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
  defaultConfirmationModalProps,
} from "@/store/confirmationModalContext";
import { ReactElement, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useRouter } from "next/navigation";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { Icon } from "@iconify-icon/react";

type props = {
  columns: any[];
  searchByCols: string[];
  searchInputPlaceholderText: string;
  route:
    | string
    | {
        api: string;
        page: string;
      };
  addButtonTitle?: string;
  showAddButton?: boolean;
  actionPrevilage?: {
    edit?: boolean;
    delete?: boolean;
    detail?: boolean;
  };
  FilterOption?: ReactElement;
  showActionCols?: boolean;
  onRowSelection?: (values: React.Key[]) => void;
  showRowSelection?: boolean;
  subHeader?: ReactElement;
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
  actionPrevilage = {
    edit: true,
    delete: true,
    detail: false,
  },
  FilterOption,
  showActionCols = true,
  onRowSelection,
  showRowSelection = false,
  subHeader,
}: props) => {
  const router = useRouter();

  const [datas, setDatas] = useState<unknown[] | any>([]);
  const [datasCopy, setDatasCopy] = useState<unknown[] | any>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

  const isRouteString = typeof route === "string";
  const apiRoute = isRouteString ? route : route.api;
  const pageRoute = isRouteString ? route : route.page;

  const { data, isLoading } = useApiQuery([apiRoute], `${apiRoute}`);
  const { mutate: Delete, isPending: deleting } = useApiMutation(
    [apiRoute],
    `${apiRoute}/${selectedRow?.id}/delete`,
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
      Delete(
        { body: undefined },
        {
          onSuccess: (res) => {
            setcmProps({ ...defaultConfirmationModalProps });
            router.back();
          },
        }
      );
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
        width: 150,
        render: (_: string, record: any) => (
          <div className="flex justify-between items-center">
            {actionPrevilage?.edit && (
              <span
                className="flex p-2 hover:cursor-pointer"
                title="edit"
                onClick={() => {
                  router.push(`/ws/${pageRoute}/${record.id}/update`);
                }}
              >
                <Icon
                  icon="line-md:edit"
                  width={22}
                  height={22}
                  className="text-gray-900"
                />
              </span>
            )}
            {actionPrevilage?.delete && (
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
            )}
            {actionPrevilage?.detail && (
              <span className="flex p-2 hover:cursor-pointer" title="detail">
                <Icon
                  icon="bx:detail"
                  width={22}
                  height={22}
                  className="text-gray-900"
                />
              </span>
            )}
          </div>
        ),
      },
    ];
  };

  return (
    <div className="p-4">
      <Table
        data={datas}
        columns={[...columns, ...(showActionCols ? actionCol() : [])]}
        rowKey="id"
        loading={isLoading || deleting}
        onSearchInputChange={(value: string) => {
          setSearchValue(value);
        }}
        placeholderText={searchInputPlaceholderText}
        onAddButtonClicked={() => {
          router.push(`/ws/${pageRoute}/new`);
        }}
        addButtonTitle={addButtonTitle}
        showAddButton={showAddButton}
        pagination={{
          onChange: (_: any, pageSize: any) => {
            console.log(pageSize);
          },
        }}
        FilterOption={FilterOption}
        onRowSelection={onRowSelection}
        showRowSelection={showRowSelection}
        subHeader={subHeader}
      />
    </div>
  );
};

export default Index;
