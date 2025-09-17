"use client";

import { FieldType } from "@/components/forms/FormGenerator";
import FormSkeleton from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";

export default function Home() {
  const subjectOptions = [
    { label: "Local language", value: "Local_language" },
    { label: "Mathematics", value: "mathematics" },
    { label: "Physics", value: "physics" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Biology", value: "biology" },
    { label: "English", value: "english" },
    { label: "History", value: "history" },
    { label: "Geography", value: "geography" },
    { label: "Computer Science", value: "computer_science" },
    { label: "Economics", value: "economics" },
    { label: "Business Studies", value: "business_studies" },
    { label: "Civics", value: "civics" },
    { label: "Physical Education", value: "physical_education" },
    { label: "Music", value: "music" },
    { label: "Art", value: "art" },
    { label: "Religious Studies", value: "religious_studies" },
    { label: "Environmental Science", value: "environmental_science" },
    { label: "Social Studies", value: "social_studies" },
    { label: "Philosophy", value: "philosophy" },
    { label: "Political Science", value: "political_science" },
    { label: "Special Education", value: "special_education" },
  ];
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
    {
      name: "subject_specialization",
      label: "Subject",
      type: FieldType.Select,
      placeholder: "Select subject specialization",
      options: subjectOptions,
      rules: [{ required: true, message: "" }],
    },
    {
      name: "note",
      label: "Note",
      type: FieldType.Textarea,
      placeholder: "Add extra note here.",
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
        onSubmit={(values) => console.log("Teacher form submitted:", values)}
        title="Teacher Registration Form"
        apiRoute="teacher"
      />
    </div>
  );
}
