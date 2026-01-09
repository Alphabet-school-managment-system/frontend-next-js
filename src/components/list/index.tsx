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
import { IdsContext } from "@/store/idsContext";
import { Table } from "antd";

export enum QueryBy {
  ACADEMIC_YEAR = "academic_year_id",
  BRANCH = "branch_id",
}

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
  actionPrevilage?: actionPrevilageType;
  FilterOption?: ReactElement;
  showActionCols?: boolean;
  onRowSelection?: (values: React.Key[]) => void;
  showRowSelection?: boolean;
  subHeader?: ReactElement;
  queryBy?: QueryBy;
  showHeaderBar?: boolean;
  showSearchInput?: boolean;
  loading?: boolean;
  queryParams?: { [key: string]: string };
  enable?: boolean;
};

type actionPrevilageType = {
  edit?: boolean;
  delete?: boolean;
  detail?: boolean;
};

const MainTable = dynamic(() => import("@/components/common/Table"), {
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
  queryBy,
  showHeaderBar,
  showSearchInput,
  loading,
  queryParams,
  enable = true,
}: props) => {
  const router = useRouter();

  const [datas, setDatas] = useState<unknown[] | any>([]);
  const [datasCopy, setDatasCopy] = useState<unknown[] | any>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const { Ids } = useContext(IdsContext);

  const isRouteString = typeof route === "string";
  const apiRoute = isRouteString ? route : route.api;
  const pageRoute = isRouteString ? route : route.page;

  const localQueryParams = new URLSearchParams(
    queryBy === QueryBy.ACADEMIC_YEAR
      ? { academic_year_id: Ids?.academicYearId }
      : ({ branch_id: Ids?.branchId } as any)
  ).toString();

  const queryStringFromProps = queryParams
    ? new URLSearchParams(queryParams as Record<string, string>).toString()
    : "";

  const query = [queryStringFromProps, localQueryParams].filter(Boolean).join("&");

  const apiUrl = query ? `${apiRoute}?${query}` : apiRoute;

  const { data, isLoading } = useApiQuery([apiUrl], apiUrl, enable);

  const { mutate: Delete, isPending: deleting } = useApiMutation(
    [apiUrl],
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
          },
        }
      );
    } catch (error) {
      console.log("Item deletion error:", error);
    }
  };

  const actionCol = (value?: actionPrevilageType) => {
    return [
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 150,
        render: (_: string, record: any) => (
          <div className="flex justify-between items-center">
            {value?.edit ? (
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
            ) : (
              <span></span>
            )}
            {value?.delete ? (
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
            ) : (
              <span></span>
            )}
            {value?.detail ? (
              <span className="flex p-2 hover:cursor-pointer" title="detail">
                <Icon
                  icon="bx:detail"
                  width={22}
                  height={22}
                  className="text-gray-900"
                />
              </span>
            ) : (
              <span></span>
            )}
          </div>
        ),
      },
    ];
  };

  return (
    <div className="p-4">
      <MainTable
        data={datas}
        columns={[
          ...columns,
          ...(showActionCols ? actionCol(actionPrevilage) : []),
        ]}
        rowKey="id"
        loading={loading || isLoading || deleting}
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
        expandable={{
          expandedRowRender: (parent: any) => {
            const col = [
              ...columns,
              actionCol({
                edit: false,
                delete: true,
                detail: false,
              })[0],
            ];
            return (
              <Table
                dataSource={parent.sub}
                columns={col}
                pagination={false}
                rowKey={"id"}
                showHeader={false}
              />
            );
          },
          rowExpandable: (record: any) => record.isParent === true,
        }}
        showHeaderBar={showHeaderBar}
        showSearchInput={showSearchInput}
      />
    </div>
  );
};

export default Index;
