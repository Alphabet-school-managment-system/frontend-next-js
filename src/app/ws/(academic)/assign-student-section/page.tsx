"use client";

import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { Select } from "@/components/common/Select";
import { IdsContext } from "@/store/idsContext";
import { useContext, useEffect, useState } from "react";
import { useEnrollment } from "../enrollment/hook/useEnrollment";
import { Button } from "antd";
import toast from "react-hot-toast";
import { useUtils } from "@/hooks/useUtils";
import { useApiMutation } from "@/hooks/useApi";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function HomePage() {
  const { Ids } = useContext(IdsContext);
  const { getGrades, getSections } = useUtils();
  const [reloadKey, setReloadKey] = useState(0);

  const { getTableColumns, SchoolSetting } = useEnrollment({ Ids });

  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  const [grade, setGrade] = useState<string | number | undefined>(50);
  const [section, setSection] = useState<string | number | undefined>(
    undefined,
  );
  const [sectionsData, setSectionsData] = useState<
    { label: string; value: any }[]
  >([]);

  const { mutate, isPending: isUpdating } = useApiMutation(
    [`enrollment/bulk-update`],
    `enrollment/bulk-update`,
    "PUT",
  );

  useEffect(() => {
    setSectionsData(getSections(Number(SchoolSetting?.sections_per_grade)));
  }, [SchoolSetting]);

  const handleSubmit = async () => {
    if (!section) {
      toast.error("Please select a section");
      return;
    }
    if (!selectedIds || selectedIds.length === 0) {
      toast.error("Please select at least one student");
      return;
    }
    try {
      const payload = {
        ids: JSON.stringify(selectedIds),
        data: { section: section },
      };

      await mutate(
        { body: payload },
        {
          onSuccess: (res) => {
            toast.success(`Selected students assigned in ${section}`);
            setReloadKey((prev) => prev + 1);
          },
        },
      );
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const subHeader = (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="flex-1">
        <Select
          data={getGrades()}
          onChange={(v: any) => setGrade(v)}
          classNames="min-w-[300px] w-full!"
          placeholderText="Select grade to assign"
        />
      </div>
      <div className="flex-1">
        <Select
          data={sectionsData}
          onChange={(v: any) => setSection(v)}
          classNames="min-w-[300px] w-full!"
          placeholderText="Select section to assign"
        />
      </div>
      <div className="shrink">
        <Button type="default" size="large" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <List
        columns={getTableColumns()}
        searchByCols={["first_name", "last_name", "class_name"]}
        searchInputPlaceholderText={
          "Search by enrollment information (first name, last name & class_name)"
        }
        route={"enrollment"}
        actionPrevilage={{
          edit: false,
          delete: false,
          detail: false,
        }}
        queryBy={[
          {
            type: "OTHER",
            value: grade
              ? [
                  {
                    key: "grade",
                    value: grade.toString(),
                  },
                  ...(Ids.academicYearId
                    ? [
                        {
                          key: "academic_year_id",
                          value: Ids.academicYearId.toString(),
                        },
                      ]
                    : []),
                ]
              : undefined,
          },
        ]}
        showAddButton={false}
        showRowSelection={true}
        onRowSelection={(values: React.Key[]) => {
          setSelectedIds(values);
        }}
        subHeader={subHeader}
        showActionCols={false}
        showSearchInput={false}
        reloadKey={reloadKey}
      />
    </>
  );
}
