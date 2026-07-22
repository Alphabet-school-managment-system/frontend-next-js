"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Enrollment, selectType, Student } from "@/types";
import { useEnrollment } from "../../hook/useEnrollment";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useContext, useEffect, useRef, useState } from "react";
import { EnrollmentStudentDetail } from "../../new/page";
import { Alert, Form } from "antd";
import { IdsContext } from "@/store/idsContext";
import { useUtils } from "@/hooks/useUtils";
import { OnFormValuesChangeProps } from "@/components/forms/FormGenerator";
import { UtilContext } from "@/store/utilContext";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  },
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
  const [enrolled_grade, setEnrolledClass] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>();
  const [enrollmentExpiredMessage, setEnrollmentExpiredMessage] = useState<
    string | undefined
  >();
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { getGradeDetail } = useUtils();
  const { formData, setFormData } = useContext(UtilContext);

  useEffect(() => {
    if (AcademicYear && ServerDate) {
      const result = isEnrollmentPeriodExpired();

      setEnrollmentExpiredMessage(result?.message);
      setDisableForm(result?.status);
    }
  }, [AcademicYear, ServerDate]);

  const { data: result, isLoading } = useApiQuery<Enrollment>(
    [],
    `enrollment/${id}`,
    Boolean(id),
  );

  useEffect(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    if (
      isLoading ||
      gettingAcademicYear ||
      gettingServerDate ||
      gettingSchoolSetting
    ) {
      setLoading(true);
    } else {
      loadingTimeoutRef.current = setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isLoading, gettingAcademicYear, gettingServerDate, gettingSchoolSetting]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      setData(payload);
      setStudent(result?.student);
      setEnrolledClass(result?.grade);
      setFormData((prev: any) => ({
        ...prev,
        allValues: payload,
      }));
    }
  }, [result]);

  useEffect(() => {
    if (formData?.allValues) {
      form.setFieldsValue(formData.allValues);
    }
  }, [formData]);

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          onStudentSelect: async (student: Student) => {
            // setStudent(student);
            form.setFieldValue("student_id", student?.id);
          },
          levels_of_education: SchoolSetting?.levels_of_education ?? [],
          onGradeSelect: async (value: string) => {
            setEnrolledClass(value);
            getGradeDetail({ value })?.hasStream === false
              ? form.resetFields(["stream"])
              : null;
          },
          onClear: async () => {
            setEnrolledClass(undefined);
            setStudent(undefined);
            form.setFieldValue("student_id", undefined);
          },
          isTransferredValue: result?.isTransferred,
          includeId: true,
          SearchInputOptions: [data?.student],
          showStreamField: data?.stream ? true : false,
          onIsTransferredValueChange: (value: boolean) => {
            value
              ? form.setFieldValue("transferredFrom", data?.transferredFrom)
              : form.resetFields(["transferredFrom"]);
          },
        })}
        title="Update Enrollment Information"
        apiRoute="enrollment"
        data={data}
        isCreate={false}
        leftContent={
          <EnrollmentStudentDetail
            student={student}
            enrolled_grade={enrolled_grade}
            stream={result?.stream}
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
        onValuesChange={({ allValues }: OnFormValuesChangeProps) => {
          setFormData((prev: any) => ({
            ...prev,
            allValues,
          }));
        }}
      />
    </div>
  );
}
