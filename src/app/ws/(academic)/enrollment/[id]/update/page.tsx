"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import { Enrollment, Student } from "@/types";
import { useEnrollment } from "../../hook/useEnrollment";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";
import { EnrollmentStudentDetail } from "../../new/page";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export default function Update() {
  const { id } = useParams();
  const { getFormFields } = useEnrollment();
  const [data, setData] = useState<any>(null);
  const [student, setStudent] = useState<Student>();
  const [enrolled_class, setEnrolledClass] = useState<string>("");

  const { data: result, isLoading } = useApiQuery<Enrollment>(
    [],
    `enrollment/${id}`,
    Boolean(id)
  );

  useEffect(() => {
    if (result) {
      const payload: any = { ...result };
      setData(payload);
    }
  }, [result]);

  return (
    <div className="">
      <FormGenerator
        columns={1}
        fields={getFormFields({
          onStudentSelect: async (student) => {
            setStudent(student);
          },
        })}
        title="Update Enrollment Information"
        apiRoute="enrollment"
        data={data}
        isFetching={isLoading}
        isCreate={false}
        leftContent={
          <EnrollmentStudentDetail
            student={student}
            enrolled_class={enrolled_class}
          />
        }
      />
    </div>
  );
}
