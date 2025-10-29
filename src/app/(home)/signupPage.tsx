import { Button, Form, Input } from "antd";
import { PasswordInput } from "../auth/login/LoginView";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useApiMutation } from "@/hooks/useApi";

export const SignUpForm = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { mutate, isPending } = useApiMutation([], "auth/signup", "POST");

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isPending]);

  const handleSubmit = async (values: any) => {
    try {
      const payload = { ...values };
      await mutate(
        { body: payload },
        {
          onSuccess: (res: any) => {
            form.resetFields();
            onSuccess();
          },
        }
      );
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="bg-white rounded-lg p-8">
        <h4 className="text-2xl mb-6 font-bold">Sign Up</h4>
        <p className="mb-6">Create your account</p>
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Enter first name" size="large" required />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Enter last name" size="large" required />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "" },
              { type: "email", message: "Invalid email address" },
            ]}
          >
            <Input
              placeholder="Enter email address"
              size="large"
              required
              type="email"
            />
          </Form.Item>

          <PasswordInput
            prefix={
              <span className="flex items-center justify-center h-full" />
            }
          />

          <Form.Item
            label="School Name"
            name="school_name"
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Enter school name" size="large" required />
          </Form.Item>
          <Form.Item>
            <Button
              className="h-10 w-full bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              loading={loading}
              size="large"
              type="primary"
              htmlType={loading ? "button" : "submit"}
            >
              {"Sign up"}
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center items-center">
          <Button
            className="mt-4"
            type="link"
            onClick={() => {
              loading ? null : onCancel();
            }}
          >
            <span className="text-base">Cancel</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
