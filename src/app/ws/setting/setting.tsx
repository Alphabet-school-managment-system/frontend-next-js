import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { Setting } from "@/types";
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Index = ({ onLoading }: { onLoading: (value: boolean) => void }) => {
  const [settingForm] = Form.useForm();
  const [id, setId] = useState<string | undefined>("");
  const [schoolId, setSchoolId] = useState<string | undefined>(
    "a120f8c1-6da5-43b7-95d0-79ff888c0593"
  );
  const apiRoute = "setting";

  const { data, isLoading } = useApiQuery<Setting>(
    [`${apiRoute}/${schoolId}`],
    `${apiRoute}/${schoolId}`
  );
  const { mutate, isPending: isUpdating } = useApiMutation(
    [`${apiRoute}/${schoolId}`],
    data ? `${apiRoute}/${id}/update` : apiRoute,
    data ? "PUT" : "POST"
  );

  useEffect(() => {
    if (data) {
      settingForm.setFieldsValue(data);
      setId(data?.id);
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
      payload.school_id = schoolId;
      payload.sections_per_class = Number(values.sections_per_class);
      payload.number_of_terms = Number(values.number_of_terms);

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
    <div>
      <Card variant="borderless" title="Setting" style={{ marginBottom: 24 }}>
        <Form layout="vertical" form={settingForm} onFinish={handleSubmit}>
          <div className={`grid gap-4 md:grid-cols-2`}>
            <Form.Item label="id" name="id" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item label="school_id" name="school_id" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item
              label="Number of Terms"
              name="number_of_terms"
              rules={[{ required: true, message: "" }]}
            >
              <Select placeholder="Select number of terms" size="large">
                <Select.Option value={2}>2 (Semester)</Select.Option>
                <Select.Option value={3}>3 (Terms)</Select.Option>
                <Select.Option value={4}>4 (Quarter)</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Sections per Class"
              name="sections_per_class"
              rules={[{ required: true, message: "" }]}
            >
              <Input type="number" min={1} placeholder="e.g. 4" size="large" />
            </Form.Item>
            <Form.Item
              label="Level of Education"
              name="levels_of_education"
              rules={[{ required: true, message: "" }]}
            >
              <Select placeholder="Select level" mode="multiple" size="large">
                <Select.Option value="kg">KG</Select.Option>
                <Select.Option value="primary">Primary</Select.Option>
                <Select.Option value="secondary">Secondary</Select.Option>
                <Select.Option value="college_prep">
                  College Preparatory
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="link"
              htmlType="submit"
              className="!rounded-sm"
              size="large"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Index;
