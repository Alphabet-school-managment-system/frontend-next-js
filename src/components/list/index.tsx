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
import { Popover, Table } from "antd";

export type QueryBy = {
  type: "ACADEMIC_YEAR" | "BRANCH" | "OTHER";
  value: undefined | { key: string; value: string | number | boolean }[];
};

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
  queryBy?: QueryBy[];
  showHeaderBar?: boolean;
  showSearchInput?: boolean;
  loading?: boolean;
  queryParams?: { [key: string]: string };
  enable?: boolean;
  reloadKey?: number;
  name?: string;
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
  queryBy = [],
  showHeaderBar,
  showSearchInput,
  loading,
  queryParams,
  enable = true,
  reloadKey = 0,
  name,
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

  const localQueryParams = new URLSearchParams();

  if (queryBy.length > 0) {
    queryBy.forEach((qb: any) => {
      if (!qb || !qb.type) return;

      if (qb.type === "ACADEMIC_YEAR") {
        if (Ids?.academicYearId) {
          localQueryParams.set("academic_year_id", String(Ids.academicYearId));
        }
      } else if (qb.type === "BRANCH") {
        if (Ids?.branchId) {
          localQueryParams.set("branch_id", String(Ids.branchId));
        }
      } else if (qb.type === "OTHER") {
        const val: { key: string; value: string | number | boolean }[] =
          qb.value;
        val?.forEach(
          (item: { key: string; value: string | number | boolean }) => {
            localQueryParams.set(item.key, String(item.value));
          },
        );
      }
    });
  }

  const localQueryParamsString = localQueryParams.toString();

  const queryStringFromProps = queryParams
    ? new URLSearchParams(queryParams as Record<string, string>).toString()
    : "";

  const query = [queryStringFromProps, localQueryParamsString]
    .filter(Boolean)
    .join("&");

  const apiUrl = query ? `${apiRoute}?${query}` : apiRoute;

  const { data, isLoading } = useApiQuery(
    [apiUrl, String(reloadKey)],
    apiUrl,
    enable,
  );

  const { mutate: Delete, isPending: deleting } = useApiMutation(
    [apiUrl, String(reloadKey)],
    `${apiRoute}/${selectedRow?.id}/delete`,
    "DELETE",
  );

  useEffect(() => {
    // Ensure we update the local state even when the API returns `null` or an empty array.
    // Treat `null`/`undefined` as an empty list so the UI refreshes correctly.
    if (data !== undefined) {
      const normalized = (data as any) ?? [];
      setDatas(normalized);
      setDatasCopy(normalized);
    }
  }, [data]);

  useEffect(() => {
    const source = Array.isArray(datasCopy) ? datasCopy : [];
    if (searchValue) {
      const result = ArraySearch({ searchValue }, source, searchByCols);
      setDatas(result);
    } else {
      setDatas(source);
    }
  }, [searchValue, datasCopy]);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext,
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
        },
      );
    } catch (error) {
      console.log("Item deletion error:", error);
    }
  };

  const actionColContent = (value?: actionPrevilageType, record?: any) => {
    return (
      <div className="flex-col justify-between items-center min-w-48 cursor-pointer">
        {value?.edit ? (
          <span
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/ws/${pageRoute}/${record.id}/update`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/ws/${pageRoute}/${record.id}/update`);
              }
            }}
            className="flex items-center gap-3 p-2 text-gray-700 font-semibold hover:cursor-pointer hover:bg-gray-100 rounded-md transition"
            title={`Edit ${name}`}
          >
            <Icon
              icon="tabler:edit-filled"
              width={22}
              height={22}
              className="text-gray-700"
            />

            <span className="text-base font-medium">Edit {name}</span>
          </span>
        ) : (
          <span></span>
        )}
        {value?.delete ? (
          <span
            role="button"
            tabIndex={0}
            onClick={() =>
              setcmProps((prev: ConfirmationModalPropsType) => ({
                ...prev,
                show: true,
                onOk: () => {
                  setSelectedRow(record);
                  handleDelete();
                },
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setcmProps((prev: ConfirmationModalPropsType) => ({
                  ...prev,
                  show: true,
                  onOk: () => {
                    setSelectedRow(record);
                    handleDelete();
                  },
                }));
              }
            }}
            className="flex items-center gap-3 p-2 text-red-600 font-semibold hover:cursor-pointer hover:bg-gray-100 rounded-md transition"
            title={`Delete ${name}`}
          >
            <Icon
              icon="mdi-light:delete"
              width={22}
              height={22}
              className="text-red-600"
            />

            <span className="text-base font-medium">Delete {name}</span>
          </span>
        ) : (
          <span></span>
        )}
        {value?.detail ? (
          <span
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
              }
            }}
            className="flex items-center gap-3 p-2 text-gray-700 font-semibold hover:cursor-pointer hover:bg-gray-100 rounded-md transition"
            title={`Detail ${name}`}
          >
            <Icon
              icon="bx:detail"
              width={22}
              height={22}
              className="text-gray-700"
            />

            <span className="text-base font-medium">Detail {name}</span>
          </span>
        ) : (
          <span></span>
        )}
      </div>
    );
  };

  const actionCol = (value?: actionPrevilageType) => {
    return [
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 150,
        render: (_: string, record: any) => (
          <Popover
            placement="bottom"
            content={actionColContent(value, record)}
            arrow={false}
            trigger="click"
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            className="cursor-pointer!"
          >
            <Icon
              icon="pepicons-pop:dots-y"
              width={25}
              height={25}
              className="text-gray-900"
            />
          </Popover>
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
