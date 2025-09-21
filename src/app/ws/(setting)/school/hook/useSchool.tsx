import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";

export const useSchool = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "name",
        label: "Name",
        type: FieldType.Input,
        placeholder: "Enter name",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "address",
        label: "Address",
        type: FieldType.Textarea,
        placeholder: "1234, Main St, City, Country",
        rows: 4,
        rules: [{ required: true, message: "" }],
        className: `w-full`,
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "additional information about the school",
        rows: 4,
        className: `w-full`,
      },
      {
        name: "contact",
        label: "Contact",
        type: FieldType.Input,
        placeholder: "+1234567890,example@example.com, www.example.com",
        rules: [{ required: true, message: "" }],
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
