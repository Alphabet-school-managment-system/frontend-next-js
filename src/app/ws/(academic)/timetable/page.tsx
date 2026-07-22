"use client";

import { useTimetable } from "./hook/useTimetable";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { Select } from "@/components/common/Select";
import { useEnrollment } from "../enrollment/hook/useEnrollment";
import { useContext, useEffect, useState } from "react";
import { IdsContext } from "@/store/idsContext";
import { useUtils } from "@/hooks/useUtils";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export const FilterOption = ({
  onLoading,
  onChange,
}: {
  onLoading: (value: boolean) => void;
  onChange?: (value: any) => void;
}) => {
  const [queryParams, setQueryParams] = useState<{
    grade?: string;
    day?: string;
  }>({});
  const { Ids } = useContext(IdsContext);
  const { SchoolSetting, gettingSchoolSetting } = useEnrollment({
    Ids,
  });

  const { getDaysOfWeek } = useTimetable({ SchoolSetting });
  const { getGrades } = useUtils();

  useEffect(() => {
    if (gettingSchoolSetting) {
      onLoading(true);
    } else {
      setTimeout(() => {
        onLoading(false);
      }, 500);
    }
  }, [gettingSchoolSetting]);

  useEffect(() => {
    onChange && onChange({ ...queryParams });
  }, [queryParams]);

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="">
        <Select
          data={getGrades({})}
          onChange={async (value: any) => {
            setQueryParams((prev) => ({ ...prev, grade: value }));
            onChange && onChange({ ...queryParams, grade: value });
          }}
          classNames="min-w-[450px] h-full!"
          placeholderText="Select grade to filter timetables"
          allowSearch
        />
      </div>
      <div className="">
        <Select
          data={getDaysOfWeek()}
          onChange={(value: any) => {
            setQueryParams((prev) => ({ ...prev, day: value }));
          }}
          classNames="min-w-[450px] h-full!"
          placeholderText="Select day to filter timetables"
          allowClear
          allowSearch
          onClear={() => {
            setQueryParams((prev) => ({ ...prev, day: undefined }));
          }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const { getTableColumns } = useTimetable({});
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState(0);

  const [queryParams, setQueryParams] = useState<
    | {
        grade?: string;
        day?: string;
      }
    | undefined
  >({});

  useEffect(() => {
    if (queryParams?.day !== undefined && queryParams?.grade !== undefined) {
      setReloadKey((prev) => prev + 1);
    } else {
      console.log(
        "%csrc/app/ws/(academic)/timetable/page.tsx:104 queryParams",
        "color: #007acc;",
        queryParams,
      );
      setQueryParams(undefined);
    }
  }, [queryParams]);

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["grade", "section", "type", "other_type"]}
        searchInputPlaceholderText={
          "Search by timetable information (grade, section & type)"
        }
        route={"timetable"}
        addButtonTitle={"Add new timetable"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: false,
        }}
        queryBy={[
          {
            type: "ACADEMIC_YEAR",
            value: undefined,
          },
        ]}
        showSearchInput={false}
        loading={loading}
        FilterOption={
          <FilterOption
            onLoading={(value: boolean) => {
              setLoading(value);
            }}
            onChange={(value) => {
              setQueryParams((prev) => ({ ...prev, ...value }));
            }}
          />
        }
        queryParams={queryParams}
        name="Schedule"
        reloadKey={reloadKey}
        enable={reloadKey > 0 ? true : false}
      />
    </>
  );
}
