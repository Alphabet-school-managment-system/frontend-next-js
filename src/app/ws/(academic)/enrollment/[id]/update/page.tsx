"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Enrollment, Student } from "@/types";
import { useEnrollment } from "../../hook/useEnrollment";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useContext, useEffect, useState } from "react";
import { EnrollmentStudentDetail } from "../../new/page";
import { Alert, Form } from "antd";
import { IdsContext } from "@/store/idsContext";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export default function Update() {
  const { id } = useParams();
  const { Ids } = useContext(IdsContext);
  const [form] = Form.useForm();

  const {
    getFormFields,
    AcademicYear,
    gettingAcademicYear,
    SchoolSetting,
    gettingSchoolSetting,
    ServerDate,
    gettingServerDate,
    isEnrollmentPeriodExpired,
  } = useEnrollment({ Ids });
  const [data, setData] = useState<any>(null);
  const [student, setStudent] = useState<Student>();
  const [enrolled_grade, setEnrolledClass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [enrollmentExpiredMessage, setEnrollmentExpiredMessage] = useState<
    string | undefined
  >();
  const [disableForm, setDisableForm] = useState<boolean>(false);
  useEffect(() => {
    if (AcademicYear && ServerDate) {
      const result = isEnrollmentPeriodExpired();

      setEnrollmentExpiredMessage(result?.message);
      // setDisableForm(result?.status);
    }
  }, [AcademicYear, ServerDate]);

  const { data: result, isLoading } = useApiQuery<Enrollment>(
    [],
    `enrollment/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (
      isLoading ||
      gettingAcademicYear ||
      gettingServerDate ||
      gettingSchoolSetting
    ) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isLoading, gettingAcademicYear, gettingServerDate, gettingSchoolSetting]);

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      setData(payload);
      setStudent(result?.student);
      setEnrolledClass(result?.grade);
    }
  }, [result]);

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          onStudentSelect: async (student: Student) => {
            setStudent(student);
            form.setFieldValue("student_id", student?.id);
          },
          levels_of_education: SchoolSetting?.levels_of_education ?? [],
          onGradeSelect: async (grade: string) => {
            setEnrolledClass(grade);
          },
          onClear: async () => {
            setEnrolledClass("");
            setStudent(undefined);
            form.setFieldValue("student_id", undefined);
          },
          isTransferredValue: result?.isTransferred,
          includeId: true,
        })}
        title="Update Enrollment Information"
        apiRoute="enrollment"
        data={data}
        isCreate={false}
        leftContent={
          <EnrollmentStudentDetail
            student={student}
            enrolled_grade={enrolled_grade}
          />
        }
        topContent={
          enrollmentExpiredMessage ? (
            <Alert
              message="Enrollment Period Expired"
              description={enrollmentExpiredMessage}
              type="error"
              showIcon
            />
          ) : undefined
        }
        isFetching={loading}
        disableForm={disableForm}
        formInstance={form}
      />
    </div>
  );
}
