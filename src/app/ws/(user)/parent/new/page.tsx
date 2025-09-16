"use client";

import { FieldType } from "@/components/forms/FormGenerator";
import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";

export default function Home() {
  const FormFields = [
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
      name: "email",
      label: "Email",
      type: FieldType.Input,
      placeholder: "Enter email",
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
      placeholder: "Add extra note here.",
    },
    {
      name: "gender",
      label: "Sex",
      type: FieldType.Select,
      placeholder: "Select Sex",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      rules: [{ required: true, message: "" }],
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
        fields={FormFields}
        onSubmit={(values) => console.log("Parent form submitted:", values)}
        title="Parent Registration Form"
      />
    </div>
  );
}
