import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { Icon } from "@iconify-icon/react";
import dayjs from "dayjs";

export const useAcademicYear = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Name (By local calendar)",
        dataIndex: "name_local",
        key: "name_local",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Start Date",
        dataIndex: "start_date",
        key: "start_date",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
        ),
      },
      {
        title: "End Date",
        dataIndex: "end_date",
        key: "end_date",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
        ),
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "name",
        label: "Name (G.C.)",
        type: FieldType.Input,
        placeholder: "e.g. 2024/25 Academic Year",
        rules: [{ required: true, message: "" }],
        prefix: (
          <Icon
            icon="mdi:school-outline"
            className="text-gray-500"
            width={20}
            height={20}
          />
        ),
      },
      {
        name: "name_local",
        label: "Name (By local calendar)",
        type: FieldType.Input,
        placeholder: "e.g. 2017 ዓ.ም",
        rules: [{ required: true, message: "" }],
        prefix: (
          <Icon
            icon="famicons:language"
            className="text-gray-500"
            width={20}
            height={20}
          />
        ),
      },
      {
        name: "start_date",
        label: "Start Date",
        type: FieldType.Date,
        rules: [{ required: true, message: "" }],
        suffix: (
          <Icon
            icon="mdi:calendar-start"
            className="text-gray-500"
            width={20}
            height={20}
          />
        ),
        placeholder: "Select start date",
        disabledDate: (current) => current && current < dayjs().startOf("year"),
      },
      {
        name: "end_date",
        label: "End Date",
        type: FieldType.Date,
        rules: [{ required: true, message: "" }],
        suffix: (
          <Icon
            icon="mdi:calendar-end"
            className="text-gray-500"
            width={20}
            height={20}
          />
        ),
        placeholder: "Select end date",
        disabledDate: (current) => current && current > dayjs().endOf("year"),
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
