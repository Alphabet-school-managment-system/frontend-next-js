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

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export const EnrollmentStudentDetail = ({
  student,
  enrolled_grade,
}: {
  student?: Student;
  enrolled_grade?: string;
}) => {
  const { getGradeLabel } = useUtils();
  const defaultPhoto =
    student?.sex === "Female"
      ? staticImages?.noPhotoGirlImg
      : staticImages?.noPhotoBoyImg;

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
          {getGradeLabel(Number(enrolled_grade))}
        </Descriptions.Item>

        <Descriptions.Item label="Email">{student.email}</Descriptions.Item>

        <Descriptions.Item label="Phone">{student.phone}</Descriptions.Item>

        <Descriptions.Item label="Sex">{student.sex}</Descriptions.Item>

        <Descriptions.Item label="Address">{student.address}</Descriptions.Item>

        <Descriptions.Item label="Registration No">
          {`STU-${String(student.student_registration_number).padStart(
            6,
            "0"
          )}`}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default function Home() {
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
