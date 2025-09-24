import {
  FieldConfig,
  FieldType,
  SelectMode,
} from "@/components/forms/FormGenerator";
import { Flex, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

export const useClassSection = () => {
  const getTableColumns = (): ColumnsType<any> => {
    return [
      {
        title: "Class name",
        dataIndex: "class_name",
        key: "class_name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Sections",
        dataIndex: "section_name",
        key: "section_name",
        render: (val: string) => {
          if (!val) return "-";
          return (
            <Flex gap="4px 0" wrap>
              {val.split(",").map((item: string) => (
                <Tag bordered={false} key={item}>
                  {item}
                </Tag>
              ))}
            </Flex>
          );
        },
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "class_name",
        label: "Class",
        type: FieldType.Select,
        placeholder: "Select Class",
        options: [],
        rules: [{ required: true, message: "" }],
      },
      {
        name: "section_names",
        label: "Sections",
        type: FieldType.Select,
        placeholder: "Select sections",
        options: [],
        rules: [{ required: true, message: "" }],
        selectMode: SelectMode.multiple,
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
