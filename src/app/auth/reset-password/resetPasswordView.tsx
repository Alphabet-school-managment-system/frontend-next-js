"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Button } from "antd";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { OTPInput, PasswordInput } from "../login/LoginView";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (!email) {
      toast.error("Invalid or missing reset email!");
      return;
    }

    setLoading(true);

    try {
      await authClient.emailOtp.resetPassword(
        {
          otp: values.otp,
          email: email,
          password: values.password,
        },
        {
          onSuccess() {
            toast.success("Password reset successful! Please log in.");
            router.push("/auth/login");
          },
          onError(context: any) {
            toast.error(context.error.message);
          },
        }
      );
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your new password below.
        </p>

        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          requiredMark={false}
        >
          <OTPInput label="Password reset OTP" />
          <PasswordInput />
          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              ({
                getFieldValue,
              }: {
                getFieldValue: (name: string) => any;
              }) => ({
                validator(_: any, value: any) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-sm text-gray-600">
          <a
            href="/auth/forgot-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to forgot password
          </a>
        </div>
      </div>
    </div>
  );
}
