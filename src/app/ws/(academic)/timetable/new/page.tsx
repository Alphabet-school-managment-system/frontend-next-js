"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useTimetable } from "../hook/useTimetable";
import { useEnrollment } from "../../enrollment/hook/useEnrollment";

import { Teacher } from "@/types";
import { useContext, useEffect, useState } from "react";
import { IdsContext } from "@/store/idsContext";
import { Form } from "antd";
import { useUtils } from "@/hooks/useUtils";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export default function Home() {
  const { Ids } = useContext(IdsContext);
  const [form] = Form.useForm();

  const { SchoolSetting, gettingSchoolSetting } = useEnrollment({
    Ids,
  });
  const { getFormFields } = useTimetable({ SchoolSetting });

  const [loading, setLoading] = useState<boolean>();
  const {getGrades} = useUtils()

  useEffect(() => {
    if (gettingSchoolSetting) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [gettingSchoolSetting]);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onTeacherSelect: async (teacher: Teacher) => {
            form.setFieldValue("teacher_id", teacher?.id);
          },
          levels_of_education: SchoolSetting?.levels_of_education ?? [],
          onSearchClear: async () => {
            form.setFieldValue("teacher_id", undefined);
          },
          getGrades: getGrades,
        })}
        title="Create new timetable"
        apiRoute="timetable"
        data={{
          academic_year_id: Ids?.academicYearId,
        }}
        isFetching={loading}
        formInstance={form}
      />
    </div>
  );
}
