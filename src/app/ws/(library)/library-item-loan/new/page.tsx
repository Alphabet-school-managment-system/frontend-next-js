"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useLibraryItemLoan } from "../hook/useLibraryItemLoan";
import { useContext, useState } from "react";
import { IdsContext } from "@/store/idsContext";
import { LibraryItem, StudentWithEnrollment, Teacher, UserType } from "@/types";
import { Form } from "antd";
import toast from "react-hot-toast";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  },
);
export default function Home() {
  const { getFormFields, isStudentWithEnrollment } = useLibraryItemLoan();
  const { Ids } = useContext(IdsContext);
  const [form] = Form.useForm();
  const [userType, setUserType] = useState<UserType>("student");

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({
          onItemSelect: async (value: LibraryItem) => {
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
            if (userType === "student" && isStudentWithEnrollment(value)) {
              form.setFieldValue(
                `${userType}_id`,
                (value as StudentWithEnrollment).enrollment?.[0]?.id,
              );
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
        })}
        title="Create new transaction"
        apiRoute="library-item-loan"
        data={{
          branch_id: Ids?.branchId,
        }}
        formInstance={form}
      />
    </div>
  );
}
