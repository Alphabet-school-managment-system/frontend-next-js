import { Form, Input, Button, Checkbox } from "antd";
import { Icon } from "@iconify-icon/react";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const PasswordInput = ({
  name = "password",
  label = "Password",
  dependencies,
  rules,
  prefix,
}: {
  name?: string;
  label?: string;
  dependencies?: string[];
  rules?: any[];
  prefix?: React.ReactNode;
}) => {
  return (
    <Form.Item
      label={<span className="text-gray-900">{label}</span>}
      name={name}
      dependencies={dependencies}
      rules={[
        { required: true, message: "" },
        { min: 5, message: "Password must be at least 5 characters." },
        { max: 12, message: "Password must be at most 12 characters." },
        {
          pattern:
            /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,12}$/,
          message: "Password needs a capital letter, number & special char.",
        },
        ...(rules ?? []),
      ]}
    >
      <Input.Password
        placeholder="It must be 5-12 alphanumeric length"
        size="large"
        required
        prefix={
          prefix ?? (
            <span className="flex items-center justify-center h-full">
              <Icon
                icon="mdi-light:lock"
                className="text-gray-800"
                width={22}
                height={22}
              />
            </span>
          )
        }
      />
    </Form.Item>
  );
};

const LoginView = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const result: any = await signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/ws/dashboard",
        rememberMe: values.rememberMe,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white p-6 rounded-md shadow-sm w-full max-w-md">
          <h3 className="text-lg font-semibold">Login</h3>
          <p className="text-gray-600 mb-6">
            Please enter your credentials to continue.
          </p>
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label={<span className="text-gray-900">Email</span>}
              name="email"
              rules={[
                { required: true, message: "" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="e.g. user@example.com"
                size="large"
                required
                prefix={
                  <span className="flex items-center justify-center h-full">
                    <Icon
                      icon="mdi-light:email"
                      className="text-gray-800"
                      width={22}
                      height={22}
                    />
                  </span>
                }
              />
            </Form.Item>

            <PasswordInput />

            <Form.Item
              name="rememberMe"
              valuePropName="checked"
              className="mt-4"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="mt-4">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>

            <p className="text-center text-gray-900">
              {"Don't have an account?"} <Link href="/?q=signup">Register</Link>
            </p>
            <p className="text-center text-gray-900 mt-2">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginView;
