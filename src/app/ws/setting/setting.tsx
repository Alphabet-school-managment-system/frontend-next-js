import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { IdsContext } from "@/store/idsContext";
import { Setting } from "@/types";
import { Button, Card, Form, Input, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Index = ({
  onLoading,
  onConfirmationRequest,
}: {
  onLoading: (value: boolean) => void;
  onConfirmationRequest: (fnc: () => void, frmName: string) => void;
}) => {
  const [settingForm] = Form.useForm();
  const [id, setId] = useState<string | undefined>("");
  const { Ids } = useContext(IdsContext);

  const apiRoute = "setting";

  const { data, isLoading } = useApiQuery<Setting>(
    [`${apiRoute}/${Ids?.schoolId}`],
    `${apiRoute}/${Ids?.schoolId}`,
  );
  const { mutate, isPending: isUpdating } = useApiMutation(
    [`${apiRoute}/${Ids?.schoolId}`],
    data ? `${apiRoute}/${id}/update` : apiRoute,
    data ? "PUT" : "POST",
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
      payload.school_id = Ids?.schoolId;
      payload.sections_per_grade = Number(values.sections_per_grade);
      payload.number_of_terms = Number(values.number_of_terms);
      payload.periods_per_day = Number(values.periods_per_day);

      !data ? delete payload.id : null;

      await mutate(
        { body: payload },
        {
          onSuccess: (res) => {},
        },
      );
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div>
      <Card variant="borderless" title="Setting" style={{ marginBottom: 24 }}>
        <Form
          layout="vertical"
          form={settingForm}
          onFinish={(values: any) =>
            onConfirmationRequest(
              async () => await handleSubmit(values),
              "setting",
            )
          }
        >
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
              label="Sections per Grade"
              name="sections_per_grade"
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
                <Select.Option value="0">KG</Select.Option>
                <Select.Option value="lower_primary">
                  Lower Primary (1 - 4)
                </Select.Option>
                <Select.Option value="middle_primary">
                  Middle Primary (5 & 6)
                </Select.Option>
                <Select.Option value="upper_primary">
                  Upper Primary (7 & 8)
                </Select.Option>

                <Select.Option value="secondary">Secondary</Select.Option>
                <Select.Option value="college_prep">
                  College Preparatory
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Period per Day"
              name="periods_per_day"
              rules={[{ required: true, message: "" }]}
            >
              <Input type="number" min={1} placeholder="e.g. 7" size="large" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="link"
              htmlType="submit"
              className="rounded-sm!"
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
