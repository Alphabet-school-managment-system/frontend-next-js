"use client";

import React from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import { Icon } from "@iconify-icon/react";
import PhoneNumberInput from "../common/PhoneNumberInput";
import { useRouter } from "next/navigation";

export enum FieldType {
  Input = "input",
  Select = "select",
  Date = "date",
  Textarea = "textarea",
  Phone = "phone",
}

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  rules?: any[];
}

interface FormGeneratorProps {
  fields: FieldConfig[];
  columns?: number;
  onSubmit: (values: any) => void;
  initialValues?: Record<string, any>;
  submitText?: string;
  title: string;
  subTitle?: string;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  fields,
  columns = 1,
  onSubmit,
  initialValues,
  submitText = "CONTINUE",
  title,
  subTitle,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "input":
        return (
          <Input
            placeholder={field.placeholder}
            size="large"
            className="w-full"
          />
        );
      case "textarea":
        return (
          <Input.TextArea
            placeholder={field.placeholder}
            size="large"
            className="w-full"
            rows={4}
          />
        );
      case "select":
        return (
          <Select
            placeholder={field.placeholder}
            size="large"
            className="w-full"
          >
            {field.options?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );
      case "date":
        return <DatePicker className="w-full" size="large" />;
      case "phone":
        return (
          <PhoneNumberInput
            onChange={() => {}}
            onPressEnter={() => {}}
            onChecking={() => {}}
            disabled={false}
            value={undefined}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
      requiredMark={true}
    >
      <div
        className={`
        bg-white rounded-md p-4`}
      >
        <div className=" border-gray-100 rounded-md p-6">
          {/* title and subtitle */}
          <div className="text-gray-800 mb-4">
            <h1 className="!font-bold text-lg">{title}</h1>
            {subTitle && <h2 className="font-semibold">{subTitle}</h2>}
          </div>
          {/* actual form inputes */}
          <div
            className={`grid gap-4 ${
              columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1"
            } md:w-3/4 sm:w-full`}
          >
            {fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={
                  <span className=" text-gray-900 !font-semibold">
                    {field.label}
                  </span>
                }
                rules={field.rules}
              >
                {renderField(field)}
              </Form.Item>
            ))}
          </div>
          <p className="text-gray-600 mt-4 md:w-3/4 sm:w-full">
            Inorder to process the registration, we ask you to provide the
            following information. Please note that all fields with an astrisk
            (*) are mandatory.
          </p>
          {/* form submit button */}
          <div className="flex mt-6 md:w-3/4 sm:w-full">
            <Form.Item>
              <Button
                type="primary"
                danger
                htmlType="button"
                className="mt-2 !rounded-sm"
                size="large"
                onClick={() => {
                  router.back();
                }}
              >
                CANCEL
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="mt-2 !rounded-sm !ml-4 !items-center flex"
                size="large"
                icon={<Icon icon="ion:arrow-forward" width={24} height={24} />}
                iconPosition="end"
              >
                {submitText}
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormGenerator;
