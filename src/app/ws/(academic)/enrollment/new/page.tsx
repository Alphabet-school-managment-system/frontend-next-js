"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useEnrollment } from "../hook/useEnrollment";
import { Student } from "@/types";
import Image from "next/image";
import { staticImages } from "@/lib/static-images";
import { useContext, useEffect, useState } from "react";
import { IdsContext } from "@/store/idsContext";
import { Alert, Descriptions, Empty, Form } from "antd";
import { useUtils } from "@/hooks/useUtils";
import { UtilContext } from "@/store/utilContext";
import { OnFormValuesChangeProps } from "@/components/forms/FormGenerator";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  },
);

export const EnrollmentStudentDetail = ({
  student,
  enrolled_grade,
  stream,
}: {
  student?: Student;
  enrolled_grade?: string;
  stream?: string;
}) => {
  const defaultPhoto =
    student?.sex === "Female"
      ? staticImages?.noPhotoGirlImg
      : staticImages?.noPhotoBoyImg;

  const { getGradeLabel, getFormattedIds } = useUtils();

  if (!student || !enrolled_grade) {
    return (
      <div className="flex justify-center items-center p-6">
        <Empty description="Student details will appear here." />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-md p-6 shadow-sm m-4 max-w-md">
      <div className="flex justify-center mb-4">
        <Image
          src={student?.image ?? defaultPhoto}
          alt="Student image"
          width={80}
          height={80}
          className="w-37.5 h-37.5 rounded-full object-cover mb-4"
          priority
        />
      </div>

      <h2 className="text-center text-base font-bold text-gray-900 uppercase underline mb-4">
        {`${student.first_name} ${student.middle_name ?? ""} ${
          student.last_name
        }`}
      </h2>

      <Descriptions column={1} layout="horizontal" size="middle" bordered>
        <Descriptions.Item label="Grade">
          {getGradeLabel(+enrolled_grade)}
        </Descriptions.Item>
        {stream && (
          <Descriptions.Item label="Stream">
            {stream.replace(/_/g, " ")}
          </Descriptions.Item>
        )}

        <Descriptions.Item label="Email">{student.email}</Descriptions.Item>

        <Descriptions.Item label="Phone">{student.phone}</Descriptions.Item>

        <Descriptions.Item label="Sex">{student.sex}</Descriptions.Item>

        <Descriptions.Item label="Address">{student.address}</Descriptions.Item>

        <Descriptions.Item label="Registration No">
          {getFormattedIds(String(student.student_registration_number))}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default function Home() {
  const { Ids } = useContext(IdsContext);
  const [form] = Form.useForm();
  const { formData, setFormData } = useContext(UtilContext);
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

  const [student, setStudent] = useState<Student>();
  const [enrolled_grade, setEnrolledClass] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>();
  const [enrollmentExpiredMessage, setEnrollmentExpiredMessage] = useState<
    string | undefined
  >();
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const { getGradeDetail } = useUtils();

  useEffect(() => {
    if (AcademicYear && ServerDate) {
      const result = isEnrollmentPeriodExpired();

      setEnrollmentExpiredMessage(result?.message);
      setDisableForm(result?.status);
    }
  }, [AcademicYear, ServerDate]);

  useEffect(() => {
    if (gettingAcademicYear || gettingServerDate || gettingSchoolSetting) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [gettingAcademicYear, gettingServerDate, gettingSchoolSetting]);

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
          onIsTransferredValueChange: (value: boolean) => {
            form.resetFields(["transferredFrom"]);
          },
        })}
        title="Create new enrollment"
        apiRoute="enrollment"
        data={{
          academic_year_id: Ids?.academicYearId,
        }}
        leftContent={
          <EnrollmentStudentDetail
            student={student}
            enrolled_grade={enrolled_grade}
            stream={form.getFieldValue("stream")}
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
