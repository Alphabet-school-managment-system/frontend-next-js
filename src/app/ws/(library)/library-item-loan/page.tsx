"use client";

import { useLibraryItemLoan } from "./hook/useLibraryItemLoan";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/forms/TableSkeleton";
import { useConfirmationRequest } from "@/components/common/PasswordConfirmationForm";
import { useApiMutation } from "@/hooks/useApi";
import { useState } from "react";
import { LibraryTransaction } from "@/types";
import toast from "react-hot-toast";
import { Form } from "antd";
import { Select } from "@/components/common/Select";

const List = dynamic(() => import("@/components/list/index"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Home() {
  const apiEndpoint = "library-item-loan";
  const { getTableColumns } = useLibraryItemLoan();
  const onConfirmationRequest = useConfirmationRequest();

  const [selectedRow, setSelectedRow] = useState<LibraryTransaction | null>(
    null,
  );
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [reloadKey, setReloadKey] = useState(0);
  const [form] = Form.useForm();

  const { mutate, isPending: isUpdating } = useApiMutation(
    [`${apiEndpoint}/${selectedRow?.id}/update`],
    `${apiEndpoint}/${selectedRow?.id}/update`,
    "PUT",
  );

  const handleSubmit = async (row: LibraryTransaction) => {
    try {
      const payload = { id: row?.id, status: row?.status };

      await mutate(
        { body: payload },
        {
          onSuccess: (res) => {
            toast.success(
              `Borrowed Item updated as ${row?.status} successfully!`,
            );
            setReloadKey((prev) => prev + 1);
            form.resetFields(["status"]);
          },
        },
      );
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const statusOptions = [
    {
      value: "borrowed",
      label: "Borrowed",
    },
    {
      value: "returned",
      label: "Returned",
    },
    {
      value: "reserved",
      label: "Reserved",
    },
    {
      value: "lost",
      label: "Lost",
    },
  ];

  return (
    <>
      <List
        columns={getTableColumns({
          onLoanChange: async (value: LibraryTransaction) => {
            setSelectedRow(value);
            onConfirmationRequest(
              async () => await handleSubmit(value),
              "setting",
              `Are you sure you want to update the status of this borrowed item as ${value?.status}?`,
              () => {
                setSelectedRow(null);
                setStatus(undefined);
                form.resetFields(["status"]);
              },
            );
          },
          incomingStatus: status,
          form: form,
        })}
        searchByCols={["first_name", "last_name", "book_title"]}
        searchInputPlaceholderText={
          "Search by book and borrower information (first name, last name & title)"
        }
        route={{
          api: status ? "library-item-loan/search" : "library-item-loan",
          page: "library-item-loan",
        }}
        addButtonTitle={"Add new transaction"}
        actionPrevilage={{
          edit: true,
          delete: true,
          detail: true,
        }}
        queryBy={[
          {
            type: "BRANCH" as const,
            value: undefined,
          },
          ...(status
            ? [
                {
                  type: "OTHER" as const,
                  value: [
                    {
                      key: "status",
                      value: status,
                    },
                    {
                      key: "__and",
                      value: ["status", "branch_id"].join(","),
                    },
                  ],
                },
              ]
            : []),
        ]}
        FilterOption={
          <Select
            data={statusOptions}
            placeholderText="Apply filter"
            onChange={(value: any) => {
              setStatus(value);
            }}
            classNames="shadow-none focus:shadow-none outline-none bg-transparent min-w-[150px]"
            variant="borderless"
            allowClear
            value={status}
          />
        }
        name="Item Loan"
        loading={isUpdating}
        reloadKey={reloadKey}
      />
    </>
  );
}
