import { authClient } from "@/lib/auth-client";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await authClient.forgetPassword.emailOtp(
        {
          email: values?.email,
        },
        {
          onSuccess() {
            toast.success(`Password reset OTP sent to ${values.email}`);
            form.resetFields();
          },
          onError(context: any) {
            toast.error(context.error.message);
          },
        }
      );
    } catch (error: any) {
      message.error(error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-sm w-full max-w-md">
        <h3 className="text-lg font-semibold text-left">Forgot Password</h3>
        <p className="text-left text-gray-600 mb-6 text-sm">
          Enter your email address below to receive a password reset link.
        </p>
        <Form
          name="forgot_password"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" size="large" required />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
            >
              Send Reset OTP
            </Button>
          </Form.Item>
        </Form>
        <span className="text-sm text-gray-600">
          Remembered your password?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </span>
      </div>
    </div>
  );
}
