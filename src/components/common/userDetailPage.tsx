"use client";

import { staticImages } from "@/lib/static-images";
import { Parent, Staff, Student, Teacher } from "@/types";
import {
  Avatar,
  Button,
  DatePicker,
  Descriptions,
  Input,
  Modal,
  Select,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useUtils } from "@/hooks/useUtils";
import dayjs, { type Dayjs } from "dayjs";
import { useConfirmationRequest } from "@/components/common/PasswordConfirmationForm";

type userBan = {
  banned: boolean;
  banReason: string | null;
  banExpires: Date | null;
};

export const UserDetailPage = ({
  data,
  userType,
  onLoading,
  onClose,
}: {
  data:
    | (Parent & { user: userBan })
    | (Staff & { user: userBan })
    | (Teacher & { user: userBan })
    | (Student & { user: userBan })
    | any;
  userType: "parent" | "staff" | "teacher" | "student";
  onLoading?: (value: boolean) => void;
  onClose?: (refetch: boolean) => void;
}) => {
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    action: "reset" | "ban" | "unban" | null;
  }>({
    open: false,
    action: null,
  });
  const [banReason, setBanReason] = useState<string | undefined>();
  const [banExpiresDate, setBanExpiresDate] = useState<Dayjs | null>(null);

  const [loading, setLoading] = useState(false);

  const isParent = userType === "parent";
  const isStaff = userType === "staff";
  const isTeacher = userType === "teacher";
  const isStudent = userType === "student";

  const { ShowMessage } = useUtils();
  const onConfirmationRequest = useConfirmationRequest();

  useEffect(() => {
    if (onLoading) {
      onLoading(loading);
    }
  }, [loading, onLoading]);

  const onResetPassword = async () => {
    setLoading(true);
    try {
      await authClient.forgetPassword.emailOtp(
        {
          email: data?.email,
        },
        {
          onSuccess() {
            ShowMessage({
              content: `Password reset OTP sent to ${data.email}`,
              type: "success",
            });
            onClose?.(false);
          },
          onError(context: any) {
            ShowMessage({
              content: context.error.message,
              type: "error",
            });
          },
        },
      );
    } catch (error: any) {
      ShowMessage({
        content: error?.message || "Something went wrong!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onBanUser = async () => {
    setLoading(true);
    try {
      await authClient.admin.banUser(
        {
          userId: data?.better_auth_id,
          banReason: banReason,
          banExpiresIn: banExpiresDate
            ? dayjs(banExpiresDate).valueOf()
            : undefined,
        },
        {
          onSuccess() {
            ShowMessage({
              content: `User account unbaned successfully${
                banReason ? ` (${banReason})` : ""
              }${
                banExpiresDate
                  ? ` for ${banExpiresDate.format("D MMM, YYYY")}`
                  : ""
              }.`,
              type: "success",
            });
            onClose?.(true);
          },
          onError(context: any) {
            ShowMessage({
              content: context.error.message,
              type: "error",
            });
          },
        },
      );
    } catch (error: any) {
      ShowMessage({
        content: error?.message || "Something went wrong!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onUnBanUser = async () => {
    setLoading(true);
    try {
      await authClient.admin.unbanUser(
        {
          userId: data?.better_auth_id,
        },
        {
          onSuccess() {
            ShowMessage({
              content: "User account baned successfully.",
              type: "success",
            });
            onClose?.(true);
          },
          onError(context: any) {
            ShowMessage({
              content: context.error.message,
              type: "error",
            });
          },
        },
      );
    } catch (error: any) {
      ShowMessage({
        content: error?.message || "Something went wrong!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmationCopy = useMemo(() => {
    if (confirmState.action === "ban") {
      return {
        title: "Ban account",
        content: "This will ban this user account from signing in. Continue?",
        okText: "Yes, ban",
      };
    }

    return {
      title: "",
      content: "",
      okText: "",
    };
  }, [confirmState.action]);

  const openConfirmation = (action: "reset" | "ban" | "unban") => {
    setConfirmState({
      open: false,
      action,
    });

    if (action === "ban") {
      setBanReason(undefined);
      setBanExpiresDate(null);

      setConfirmState({
        open: true,
        action,
      });
    }

    if (action === "unban") {
      onConfirmationRequest(
        async () => await onUnBanUser(),
        "",
        "This will unban this user account to signing in. Continue",
      );
    }

    if (action === "reset") {
      onConfirmationRequest(
        async () => await onResetPassword(),
        "",
        "This will trigger a password reset for this user account. Continue",
      );
    }
  };

  const handleConfirm = async () => {
    if (confirmState.action === "ban") {
      onConfirmationRequest(
        async () => await onBanUser(),
        "",
        "This will ban this user account from signing in. Continue",
      );
    }

    setConfirmState({
      open: false,
      action: null,
    });
  };

  const getFullName = () => {
    if (!data) return "-";

    if (isStudent) {
      return [data.first_name, data.middle_name, data.last_name]
        .filter(Boolean)
        .join(" ")
        .toUpperCase();
    }

    return [data.first_name, data.middle_name]
      .filter(Boolean)
      .join(" ")
      .toUpperCase();
  };

  const renderExtraDetails = () => {
    if (!data) return null;

    if (isTeacher) {
      return (
        <>
          <Descriptions.Item label="Registration #" span={2}>
            {`TEA-${String(data.teacher_registration_number).padStart(6, "0")}` ||
              "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Specialization" span={2}>
            {String(data.subject_specialization).toUpperCase()}
          </Descriptions.Item>
          <Descriptions.Item label="Note" span={2}>
            {data.note || "-"}
          </Descriptions.Item>
        </>
      );
    }

    if (isStaff) {
      return (
        <>
          <Descriptions.Item label="Role" span={2}>
            {data.role}
          </Descriptions.Item>
        </>
      );
    }

    if (isStudent) {
      return (
        <>
          <Descriptions.Item label="Registration #" span={2}>
            {`STU-${String(data.student_registration_number).padStart(6, "0")}` ||
              "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {data.address || "N/A"}
          </Descriptions.Item>
          {data.note && (
            <Descriptions.Item label="Note" span={2}>
              {data.note || "N/A"}
            </Descriptions.Item>
          )}
        </>
      );
    }

    if (isParent) {
      return (
        <>
          <Descriptions.Item label="Address" span={2}>
            {data.address || "N/A"}
          </Descriptions.Item>
          {data.note && (
            <Descriptions.Item label="Note" span={2}>
              {data.note || "N/A"}
            </Descriptions.Item>
          )}
        </>
      );
    }

    return null;
  };

  const imageSrc = isTeacher || isStudent ? data?.image : undefined;
  const fallbackImageSrc =
    data?.sex === "Male"
      ? staticImages.noPhotoBoyImg.src
      : staticImages.noPhotoGirlImg.src;

  return (
    <div
      className={`w-full ${imageSrc ? "rounded-md border border-gray-100 pt-4" : ""}`}
    >
      {imageSrc && (
        <div className="mb-6 flex justify-center">
          <Avatar
            src={imageSrc ?? fallbackImageSrc}
            size={100}
            style={{ backgroundColor: "transparent" }}
          />
        </div>
      )}

      <Descriptions title="" bordered rounded-none column={2}>
        <Descriptions.Item label="Name" span={2}>
          {getFullName()}
        </Descriptions.Item>
        <Descriptions.Item label="Phone number" span={2}>
          {data?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Email address" span={2}>
          {data?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Sex" span={2}>
          {data?.sex}
        </Descriptions.Item>
        {renderExtraDetails()}

        <Descriptions.Item label="Actions" span={2}>
          <div className="flex w-full items-center gap-4">
            <>
              <Button
                type="link"
                onClick={() => {
                  data?.user?.banned === true
                    ? toast.error("This account is currently baned.")
                    : openConfirmation("reset");
                }}
              >
                Reset Password
              </Button>
              <Button
                danger
                type="link"
                onClick={() =>
                  openConfirmation(
                    data?.user?.banned === true ? "unban" : "ban",
                  )
                }
              >
                {data?.user?.banned === true ? "Unban Account" : "Ban Account"}
              </Button>
            </>
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Modal
        open={confirmState.open}
        title={confirmationCopy.title}
        okText={confirmationCopy.okText}
        cancelText="Cancel"
        okButtonProps={{
          danger: confirmState.action === "ban",
          disabled:
            confirmState.action === "ban" && (!banReason || !banExpiresDate),
        }}
        confirmLoading={loading}
        onOk={handleConfirm}
        onCancel={() =>
          setConfirmState({
            open: false,
            action: null,
          })
        }
        centered
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{confirmationCopy.content}</p>

          {confirmState.action === "ban" && (
            <>
              <div className="space-y-2">
                <label className="ban text-sm font-medium text-gray-700">
                  Reason
                </label>
                <Select
                  value={banReason}
                  placeholder="Choose a reason"
                  className="w-full"
                  options={[
                    { label: "Appeal approved", value: "Appeal approved" },
                    {
                      label: "Administrative review completed",
                      value: "Administrative review completed",
                    },
                    {
                      label: "Manual reinstatement",
                      value: "Manual reinstatement",
                    },
                    { label: "Other", value: "Other" },
                  ]}
                  onChange={(value) => setBanReason(value)}
                />
                {banReason === "Other" && (
                  <div className="mt-2">
                    <Input.TextArea
                      placeholder="Enter your other reason"
                      onChange={(e) => {
                        setBanReason(e.target?.value);
                      }}
                      size="large"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="ban text-sm font-medium text-gray-700">
                  Effective date
                </label>
                <DatePicker
                  value={banExpiresDate}
                  className="w-full"
                  format="D MMM, YYYY"
                  onChange={(value) => setBanExpiresDate(value)}
                  disabledDate={(current) =>
                    current ? current.isBefore(dayjs().startOf("day")) : false
                  }
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
