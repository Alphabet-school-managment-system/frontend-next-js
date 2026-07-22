import { Form } from "antd";
import toast from "react-hot-toast";
import { PasswordInput } from "@/app/auth/login/LoginView";
import { authClient } from "@/lib/auth-client";
import { Logout } from "@/components/layout/MainLayout/Header";

const ChangePassword = ({
  form,
  onLoading,
}: {
  form: any;
  onLoading: (value: boolean) => void;
}) => {
  const onFinish = async (values: any) => {
    onLoading(true);
    try {
      await authClient.changePassword(
        {
          newPassword: values.newPassword,
          currentPassword: values.currentPassword,
          revokeOtherSessions: true,
        },
        {
          onSuccess: async () => {
            toast.success("Password change successful! Please log in again.");
            await Logout({
              onRequest: () => {
                onLoading(true);
              },
              onResponse: () => {
                onLoading(false);
              },
              onClear: () => {},
            });
          },
          onError(context: any) {
            toast.error(context.error.message);
          },
        },
      );
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="flex flex-col  bg-white">
      <p className="text-gray-500 mb-4">
        Kindly create a fresh password to enhance the security of your account.
      </p>
      <Form
        form={form}
        requiredMark={false}
        className=""
        onFinish={onFinish}
        layout="vertical"
      >
        <PasswordInput
          name="currentPassword"
          label="Current Password"
          size="large"
        />
        <PasswordInput name="newPassword" label="New Password" size="large" />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["newPassword"]}
          rules={[
            ({ getFieldValue }: { getFieldValue: (name: string) => any }) => ({
              validator(_: any, value: any) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
          size="large"
        />
      </Form>
    </div>
  );
};

export default ChangePassword;
