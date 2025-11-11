"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useEnrollment } from "../hook/useEnrollment";
import { Student } from "@/types";
import Image from "next/image";
import { staticImages } from "@/lib/static-images";
import { useState } from "react";
import { Icon } from "@iconify-icon/react";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export const EnrollmentStudentDetail = ({
  student,
  enrolled_class,
}: {
  student?: Student;
  enrolled_class: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center rounded-md p-4 bg-gray-50 m-4 h-full">
      {student ? (
        <div
          className={`flex flex-col justify-center items-center transition-opacity duration-300 ${
            !student ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={
              student?.photo_url ?? student?.gender === "Female"
                ? staticImages.noPhotoGirlImg
                : staticImages.noPhotoBoyImg
            }
            alt="Student image"
            width={150}
            height={150}
            className="w-[150px] h-[150px] rounded-full"
            priority
          />

          <h2 className="text-xl font-semibold">
            {`${student?.first_name} ${student?.last_name}`}
          </h2>

          <p className="text-gray-600 text-md mt-2">
            Enrolled Class:{" "}
            <span className="font-medium">{enrolled_class}</span>
          </p>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-center items-center transition-opacity duration-300 ${
            !student ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="flex items-center mb-2">
            <Icon
              icon="carbon:information"
              width={30}
              height={30}
              className="text-gray-600"
            />
          </span>
          <h2 className="text-lg font-medium mb-4 text-gray-600">
            Student detail shown here.
          </h2>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const { getFormFields } = useEnrollment();
  const [student, setStudent] = useState<Student>();
  const [enrolled_class, setEnrolledClass] = useState<string>("");

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          onStudentSelect: async (student) => {
            setStudent(student);
          },
        })}
        title="Create new enrollment"
        apiRoute="enrollment"
        data={{
          academic_year_id: "lvers",
        }}
        leftContent={
          <EnrollmentStudentDetail student={student} enrolled_class={enrolled_class} />
        }
      />
    </div>
  );
}
