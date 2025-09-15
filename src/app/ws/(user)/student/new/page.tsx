"use client";

import FormSkeleton from "@/components/forms/FormSkeleton";
import { FieldType } from "@/components/forms/FormGenerator";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

export default function Home() {
  const studentFormFields = [
    {
      name: "first_name",
      label: "First Name",
      type: FieldType.Input,
      placeholder: "Enter first name",
      rules: [{ required: true, message: "" }],
    },
    {
      name: "last_name",
      label: "Last Name",
      type: FieldType.Input,
      placeholder: "Enter last name",
      rules: [{ required: true, message: "" }],
    },
    {
      name: "full_name_local",
      label: "Full Name (Local)",
      type: FieldType.Input,
      placeholder: "Enter full name by local language",
      rules: [{ required: true, message: "" }],
    },
    {
      name: "gender",
      label: "sex",
      type: FieldType.Select,
      placeholder: "Select sex",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
      rules: [{ required: true, message: "" }],
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: FieldType.Date,
      rules: [{ required: true, message: "" }],
    },
    {
      name: "phone",
      label: "Phone Number",
      type: FieldType.Input,
      placeholder: "Enter phone number",
      rules: [{ required: true, message: "" }],
    },
    {
      name: "address",
      label: "Address",
      type: FieldType.Textarea,
      placeholder: "Enter address",
      rules: [{ required: true, message: "" }],
    },
    {
      name: "note",
      label: "Note",
      type: FieldType.Textarea,
      placeholder: "Enter note",
    },
  ];

  const FormGenerator = dynamic(
    () => import("@/components/forms/FormGenerator"),
    {
      ssr: false,
      loading: () => <FormSkeleton />,
    }
  );

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={studentFormFields}
        onSubmit={(values) => console.log("Student form submitted:", values)}
        title="Student Registration Form"
      />
    </div>
  );
}
