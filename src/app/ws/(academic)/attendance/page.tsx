"use client";

import { AttendanceStatus, useAttendance } from "./hook/useAttendance";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { Button, DatePicker, Divider } from "antd";
import dayjs from "dayjs";
import { Select } from "@/components/common/Select";
import { useState } from "react";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const { getTableColumns } = useAttendance();

  const [items, setItems] = useState<itemType[]>([]);

  const FilterOption = () => {
    return (
      <span className="flex justify-between items-center">
        <Select
          data={[]}
          placeholderText="By Class"
          onChange={(value: any) => {}}
          classNames="shadow-none focus:shadow-none outline-none bg-transparent min-w-[150px]"
        />
        <DatePicker
          className="ant-picker-flat shadow-none border-none rounded-none outline-none bg-transparent min-w-[175px] cursor-pointer"
          variant="borderless"
          size="large"
          placeholder="By Date (optional)"
          format="YYYY-MM-DD"
          disabledDate={(current) =>
            current > dayjs().endOf("day")
          }
          inputReadOnly
        />
      </span>
    );
  };

  const SubHeader = () => {
    return (
      <>
        {/* <Divider /> */}
        <span className="flex gap-2 items-center bg-gray-50 rounded-md p-4">
          <DatePicker
            className="ant-picker-flat shadow-none border-none rounded-none outline-none bg-transparent min-w-[300px] cursor-pointer"
            variant="filled"
            size="large"
            placeholder="Date when attendance was taken"
            format="YYYY-MM-DD"
            disabledDate={(current) =>
              (current && current < dayjs().startOf("day")) ||
              current > dayjs().endOf("day")
            }
            inputReadOnly
          />
          <Button type="link" size="large" disabled={items.length === 0}>
            Save
          </Button>
        </span>
      </>
    );
  };

  type itemType = {
    id: string;
    status: AttendanceStatus;
  };

  const checkAndUpdateStatus = (
    items: itemType[],
    item: itemType
  ): itemType[] => {
    if (item.status === AttendanceStatus.Present) {
      return items.filter((i) => i.id !== item.id);
    }
    return items.some((i) => i.id === item.id)
      ? items.map((i) => (i.id === item.id ? item : i))
      : [...items, item];
  };

  return (
    <>
      <List
        columns={getTableColumns({
          onStatusChange: ({
            id,
            status,
          }: {
            id: string;
            status: AttendanceStatus;
          }) => {
            setItems((prev) => checkAndUpdateStatus(prev, { id, status }));
          },
        })}
        searchByCols={["first_name", "last_name"]}
        searchInputPlaceholderText={
          "Search for student information after applying filters from the left panel → "
        }
        route={{
          api: "attendance",
          page: "",
        }}
        FilterOption={<FilterOption />}
        showAddButton={false}
        showActionCols={false}
        showRowSelection={true}
        onRowSelection={(values: React.Key[]) => {}}
        subHeader={<SubHeader />}
      />
    </>
  );
}
