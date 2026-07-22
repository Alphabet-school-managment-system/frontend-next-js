"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { Teacher, Timetable } from "@/types";
import { useContext, useEffect, useState } from "react";
import { IdsContext } from "@/store/idsContext";
import { Form } from "antd";
import { useEnrollment } from "../../../enrollment/hook/useEnrollment";
import { useTimetable } from "../../hook/useTimetable";
import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  },
);

export default function Home() {
  const { id } = useParams();
  const { Ids } = useContext(IdsContext);
  const [form] = Form.useForm();

  const { SchoolSetting, gettingSchoolSetting } = useEnrollment({
    Ids,
  });
  const { getFormFields } = useTimetable({ SchoolSetting });
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<any>(null);

  const { data: result, isLoading } = useApiQuery<Timetable>(
    [],
    `timetable/${id}`,
    Boolean(id),
  );

  useEffect(() => {
    if (gettingSchoolSetting || isLoading) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [gettingSchoolSetting, isLoading]);

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      setData(payload);
    }
  }, [result]);

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
          onGradeSelect: async (value: string) => {
            form.resetFields(["subject", "stream"]);
          },
          includeId: true,
          SearchInputOptions: data?.teacher,
          data,
        })}
        title="Update timetable Information"
        apiRoute="timetable"
        data={data}
        isCreate={false}
        isFetching={loading}
        formInstance={form}
      />
    </div>
  );
}
