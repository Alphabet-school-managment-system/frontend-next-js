"use client";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { AcademicYear } from "@/types";
import { Button, Card, DatePicker, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { IdsContext } from "@/store/idsContext";

const { RangePicker } = DatePicker;

const Index = ({ onLoading }: { onLoading: (value: boolean) => void }) => {
  const [ayForm] = Form.useForm();
  const { Ids } = useContext(IdsContext);

  const [id, setId] = useState<string | undefined>("");
  const apiRoute = "academic-year";

  const { data, isLoading } = useApiQuery<AcademicYear>(
    [`${apiRoute}/${Ids?.branchId}`],
    `${apiRoute}/${Ids?.branchId}`
  );

  const { data: ServerDate, isLoading: gettingServerDate } = useApiQuery<any>(
    [`util/server-date`],
    `util/server-date`
  );

  const { mutate, isPending: isUpdating } = useApiMutation(
    [`${apiRoute}/${Ids?.branchId}`],
    data ? `${apiRoute}/${id}/update` : apiRoute,
    data ? "PUT" : "POST"
  );

  useEffect(() => {
    if (data) {
      ayForm.setFieldsValue({
        ...data,
        start_end_date: [dayjs(data.start_date), dayjs(data.end_date)],
        enrollment_start_end_date: [
          dayjs(data.enrollment_start),
          dayjs(data.enrollment_end),
        ],
      });
      setId(data?.id);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading || isUpdating || gettingServerDate) {
      onLoading(true);
    } else {
      setTimeout(() => {
        onLoading(false);
      }, 500);
    }
  }, [isLoading, isUpdating, gettingServerDate]);

  const handleSubmit = async (values: any) => {
    try {
      const payload = { ...values };
      !data ? delete payload.id : null;
      payload.branch_id = Ids?.branchId;
      if (values.start_end_date) {
        payload.start_date = values.start_end_date[0];
        payload.end_date = values.start_end_date[1];
        delete payload.start_end_date;
      }
      if (values.enrollment_start_end_date) {
        payload.enrollment_start = values.enrollment_start_end_date[0];
        payload.enrollment_end = values.enrollment_start_end_date[1];
        delete payload.enrollment_start_end_date;
      }

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
      <Card
        variant="borderless"
        title="Academic Year"
        style={{ marginBottom: 24 }}
      >
        <Form layout="vertical" form={ayForm} onFinish={handleSubmit}>
          <div className={`grid gap-4 md:grid-cols-2`}>
            <Form.Item label="id" name="id" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item
              label="Academic Year Name"
              name="name"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="e.g. 2024/2025" size="large" />
            </Form.Item>
            <Form.Item
              label="Name (Local)"
              name="name_local"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Local language name" size="large" />
            </Form.Item>
            <Form.Item
              label="Start & End Date"
              name="start_end_date"
              rules={[{ required: true, message: "" }]}
            >
              <RangePicker
                size="large"
                className="w-full"
                disabledDate={(current) =>
                  current.year() !== dayjs(ServerDate).year()
                }
              />
            </Form.Item>
            <Form.Item
              label="Enrollment Period"
              name="enrollment_start_end_date"
              rules={[{ required: true, message: "" }]}
            >
              <RangePicker
                size="large"
                className="w-full"
                disabledDate={(current) =>
                  current.year() !== dayjs(ServerDate).year()
                }
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              type="link"
              htmlType="submit"
              className="!rounded-sm"
              size="large"
              loading={isLoading}
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
