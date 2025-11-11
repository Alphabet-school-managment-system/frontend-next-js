import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { School } from "@/types";
import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Index = ({
  onLoading,
}: {
  onLoading: (value: boolean) => void;
}) => {
  const [schoolForm] = Form.useForm();
  const [schoolId, setSchoolId] = useState<string | undefined>(
    "a120f8c1-6da5-43b7-95d0-79ff888c0593"
  );
  const apiRoute = "school";

  const { data, isLoading } = useApiQuery<School>(
    [`${apiRoute}/${schoolId}`],
    `${apiRoute}/${schoolId}`
  );
  const { mutate, isPending: isUpdating } = useApiMutation(
    [`${apiRoute}/${schoolId}`],
    `${apiRoute}/${schoolId}/update`,
    "PUT"
  );

  useEffect(() => {
    if (data) {
      schoolForm.setFieldsValue(data);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading || isUpdating) {
      onLoading(true);
    } else {
      setTimeout(() => {
        onLoading(false);
      }, 500);
    }
  }, [isLoading, isUpdating]);

  const handleSubmit = async (values: any) => {
    try {
      const payload = { ...values };
      await mutate(
        { body: payload },
        {
          onSuccess: (res) => {},
        }
      );
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <Card variant="borderless" title="School Information" style={{ marginBottom: 24 }}>
      <Form layout="vertical" form={schoolForm} onFinish={handleSubmit}>
        <div className={`grid gap-4 md:grid-cols-2`}>
          <Form.Item label="id" name="id" hidden>
            <Input hidden />
          </Form.Item>
          <Form.Item
            label="School Name"
            name="name"
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Enter school name" size="large" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "" }]}
          >
            <Input placeholder="Enter address" size="large" />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: "" }]}
            className="md:col-span-2"
          >
            <Input.TextArea
              rows={2}
              placeholder="Enter contact info"
              size="large"
            />
          </Form.Item>
          <Form.Item label="Note" name="note" className="md:col-span-2">
            <Input.TextArea rows={3} placeholder="Enter notes" size="large" />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="link"
            htmlType="submit"
            className="!rounded-sm"
            size="large"
            loading={isUpdating}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};


export default Index;