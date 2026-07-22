"use client";

import { useApiQuery } from "@/hooks/useApi";
import { useParams } from "next/navigation";
import {
  StudentWithEnrollment,
  Teacher,
  UserType,
} from "@/types";
import { DataType, useLibraryItemLoan } from "../../hook/useLibraryItemLoan";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import { useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  },
);

export default function Update() {
  const { id } = useParams();
  const { getFormFields, isStudentWithEnrollment } = useLibraryItemLoan();
  const [data, setData] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [userType, setUserType] = useState<UserType>("student");

  const { data: result, isLoading } = useApiQuery<DataType>(
    [],
    `library-item-loan/${id}`,
    Boolean(id),
  );

  useEffect(() => {
    if (result) {
      const payload: DataType = { ...result };
      setData(payload);
    }
  }, [result]);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onItemSelect: async (value: DataType) => {
            form.setFieldValue("item_id", value?.id);
          },
          onItemClear: async () => {
            form.setFieldValue("item_id", undefined);
          },
          onUserSelect: async (value: StudentWithEnrollment | Teacher) => {
            if (value && "user" in value && value?.user?.banned) {
              toast.error("This user is banned and cannot borrow items.");
              return;
            }
            if (
              userType === "student" &&
              isStudentWithEnrollment(value) &&
              "enrollment" in value
            ) {
              form.setFieldValue(`${userType}_id`, value.enrollment?.[0]?.id);
              return;
            } else {
              form.setFieldValue(`${userType}_id`, value?.id);
            }
          },
          onUserClear: async () => {
            form.setFieldValue(`${userType}_id`, undefined);
          },
          onTypeSelect: async (value: UserType) => {
            setUserType(value);
          },
          includeId: true,
          SearchInputItemOptions: data
            ? [
                (data as any).libraryitem ??
                  (data as any).library_item ??
                  (data as any).libraryItem ??
                  (data as any).item,
              ].filter(Boolean)
            : [],
          SearchInputUserOptions: [
            data?.student_id
              ? data?.enrollment?.student
              : (data as any)?.teacher,
          ],
        })}
        title="Update Book Transaction Information"
        apiRoute="library-item-loan"
        data={data}
        isFetching={isLoading}
        isCreate={false}
        disableForm={data?.status !== "borrowed" ? true : false}
      />
    </div>
  );
}
