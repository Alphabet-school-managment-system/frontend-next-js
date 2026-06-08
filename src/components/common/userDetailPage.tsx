"use client";

import { Parent, Staff } from "@/types";
import { Button, Descriptions, Modal } from "antd";
import { useMemo, useState } from "react";

export const UserDetailPage = ({
  data,
}: {
  data: Parent | Staff | undefined;
}) => {
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    action: "reset" | "block" | null;
  }>({
    open: false,
    action: null,
  });

  const isParent = data instanceof Object && "role" in data === false;

  const confirmationCopy = useMemo(() => {
    if (confirmState.action === "reset") {
      return {
        title: "Reset password",
        content:
          "This will trigger a password reset for this user account. Continue?",
        okText: "Yes, reset",
      };
    }

    if (confirmState.action === "block") {
      return {
        title: "Block account",
        content: "This will block this user account from signing in. Continue?",
        okText: "Yes, block",
      };
    }

    return {
      title: "",
      content: "",
      okText: "",
    };
  }, [confirmState.action]);

  const openConfirmation = (action: "reset" | "block") => {
    setConfirmState({
      open: true,
      action,
    });
  };

  const handleConfirm = () => {
    if (confirmState.action === "reset") {
      // Wire the reset-password mutation here.
    }

    if (confirmState.action === "block") {
      // Wire the block-account mutation here.
    }

    setConfirmState({
      open: false,
      action: null,
    });
  };

  return (
    <div>
      <Descriptions title="" bordered column={1}>
        <Descriptions.Item label="Full Name">
          {data?.first_name} {data?.middle_name}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">{data?.phone}</Descriptions.Item>
        <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Sex">{data?.sex}</Descriptions.Item>
        {isParent && (
          <Descriptions.Item label="Address">{data?.address}</Descriptions.Item>
        )}
        {isParent && (
          <Descriptions.Item label="Note">
            {data?.note ?? "N/A"}
          </Descriptions.Item>
        )}
        {!isParent && (
          <Descriptions.Item label="Role">{data?.role}</Descriptions.Item>
        )}

        <Descriptions.Item label="Actions">
          <div className="flex gap-4 w-full  items-center">
            <Button type="link" onClick={() => openConfirmation("reset")}>
              Reset Password
            </Button>
            <Button
              danger
              type="link"
              onClick={() => openConfirmation("block")}
            >
              Block Account
            </Button>
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Modal
        open={confirmState.open}
        title={confirmationCopy.title}
        okText={confirmationCopy.okText}
        cancelText="Cancel"
        okButtonProps={{ danger: confirmState.action === "block" }}
        onOk={handleConfirm}
        onCancel={() =>
          setConfirmState({
            open: false,
            action: null,
          })
        }
        centered
      >
        <p className="text-sm text-gray-600">{confirmationCopy.content}</p>
      </Modal>
    </div>
  );
};
