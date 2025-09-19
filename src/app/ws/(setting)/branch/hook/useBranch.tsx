import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";

export const useBranch = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "School Name",
        dataIndex: "school_name",
        key: "school_name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Branch Name",
        dataIndex: "branch_name",
        key: "branch_name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
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
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
