import { FieldConfig, FieldType } from "@/components/forms/FormGenerator";
import { isValidISBN } from "@/lib/format-phone-number";
import { Icon } from "@iconify-icon/react";

export const useLibraryBook = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Author",
        dataIndex: "author",
        key: "author",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "ISBN",
        dataIndex: "isbn",
        key: "isbn",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Available Copies",
        dataIndex: "copies_available",
        key: "copies_available",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  const getFormFields = (): FieldConfig[] => {
    return [
      {
        name: "title",
        label: "Title",
        type: FieldType.Input,
        placeholder: "Enter the book title",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "author",
        label: "Author",
        type: FieldType.Input,
        placeholder: "Enter the author, co-author or publisher",
        rules: [{ required: true, message: "" }],
      },
      {
        name: "isbn",
        label: "ISBN (International standard book number)",
        type: FieldType.number,
        placeholder: "########## or #############",
        prefix: (
          <span className="flex items-center justify-center h-full">
            <Icon
              icon="fluent:book-number-16-regular"
              className="text-gray-500"
              width={22}
              height={22}
            />
          </span>
        ),
        rules: [
          {
            validator: (_: any, value: string) => {
              if (!value || isValidISBN(value)) {
                return Promise.resolve();
              }
              return Promise.reject("ISBN must be 10 or 13 characters");
            },
          },
        ],
        max: 13,
      },
      {
        name: "copies_available",
        label: "Available Copies",
        type: FieldType.number,
        placeholder: "Enter the number of available copies",
        rules: [
          { required: true, message: "" },
          { min: 0, message: "Items can't be less than 0" },
        ],
      },
      {
        name: "note",
        label: "Note",
        type: FieldType.Textarea,
        placeholder: "additional information about the book",
        rows: 4,
      },
    ];
  };

  return {
    getTableColumns,
    getFormFields,
  };
};
