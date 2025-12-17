"use client";

import React, { ReactElement, useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Spin,
  Upload,
  Checkbox,
  InputNumber,
  FormInstance,
} from "antd";
import { Icon } from "@iconify-icon/react";
import PhoneNumberInput, {
  onPhoneNumberInputChangeProps,
} from "../common/PhoneNumberInput";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApi";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import SearchInput, { SearchInputProps } from "../common/SearchInput";
import { UploadOutlined } from "@ant-design/icons";

export enum FieldType {
  Input = "input",
  Select = "select",
  Date = "date",
  Textarea = "textarea",
  Phone = "phone",
  email = "email",
  number = "number",
  hidden = "hidden",
  searchInput = "searchInput",
  file = "file",
  checkbox = "checkbox",
}

export enum SelectMode {
  multiple = "multiple",
  tags = "tags",
}

export enum Staff_Role_Enum {
  Librarian = "Librarian",
  Accountant = "Accountant",
  Admin = "Admin",
}

export interface DateFieldConfig extends FieldConfig {
  disabledDate?: (current: dayjs.Dayjs) => boolean;
}

export interface FileTypeProps {
  onChange: (fileList: any[]) => void;
  accept?: string;
  maxCount?: number;
}

export interface CheckboxTypeProps {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  label?: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  rules?: any[];
  prefix?: ReactElement;
  suffix?: ReactElement;
  rows?: number;
  hidden?: boolean;
  min?: number;
  max?: number;
  className?: string;
  selectMode?: SelectMode;
  disabled?: boolean;
  disabledDate?: (current: dayjs.Dayjs) => boolean;
  searchInputProps?: SearchInputProps;
  fileTypeProps?: FileTypeProps;
  checkboxTypeProps?: CheckboxTypeProps;
  value?: any;
  selectProps?: {
    onChange?: (value: any) => void;
  };
  onChange?: (e: any) => void;
  allowClear?: boolean;
}

interface FormGeneratorProps {
  fields: FieldConfig[];
  columns?: number;
  onSubmit?: (values: any) => void;
  initialValues?: Record<string, any>;
  isCreate?: boolean;
  title: string;
  subTitle?: string;
  data?: any;
  apiRoute: string;
  isFetching?: boolean;
  leftContent?: ReactElement;
  formInstance?: FormInstance;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  fields,
  columns = 1,
  onSubmit,
  initialValues,
  isCreate = true,
  title,
  subTitle,
  data,
  apiRoute,
  isFetching = false,
  leftContent,
  formInstance,
}) => {
  const [form] = Form.useForm(formInstance);
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "input":
        return (
          <Input
            placeholder={field.placeholder}
            size="large"
            className="w-full"
            prefix={field?.prefix}
            suffix={field?.suffix}
            disabled={field?.disabled}
            value={field?.value}
            onChange={(e) => field.onChange?.(e.target?.value)}
            allowClear={field?.allowClear}
          />
        );
      case "textarea":
        return (
          <Input.TextArea
            placeholder={field.placeholder}
            size="large"
            className="w-full"
            rows={field.rows || 1}
            disabled={field?.disabled}
            value={field?.value}
          />
        );
      case "select":
        return (
          <Select
            placeholder={field.placeholder}
            size="large"
            className="w-full"
            prefix={field?.prefix}
            suffixIcon={field?.suffix}
            mode={field.selectMode}
            disabled={field?.disabled}
            value={field?.value}
            onChange={field.selectProps?.onChange}
          >
            {field.options?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );
      case "date":
        const dateField = field as DateFieldConfig;

        return (
          <DatePicker
            className="w-full"
            size="large"
            prefix={field?.prefix}
            suffixIcon={
              field?.suffix ?? (
                <Icon
                  icon="oui:token-date"
                  className="text-gray-400"
                  width={22}
                  height={22}
                />
              )
            }
            placeholder={field.placeholder}
            format={"YYYY-MM-DD"}
            disabledDate={dateField.disabledDate}
            disabled={field.disabled}
            value={field?.value}
          />
        );
      case "phone":
        return (
          <PhoneNumberInput
            onChange={(value: onPhoneNumberInputChangeProps) => {
              form.setFieldValue(field.name, value.raw);
            }}
            onPressEnter={() => {}}
            onChecking={() => {}}
            disabled={!!field?.disabled}
            placeholder={field.placeholder}
            value={field?.value}
          />
        );
      case "email":
        return (
          <Input
            type="email"
            className="w-full"
            size="large"
            placeholder={field.placeholder}
            suffix={
              field?.suffix ?? (
                <span className="flex items-center justify-center h-full">
                  <Icon
                    icon="mdi-light:email"
                    className="text-gray-800"
                    width={22}
                    height={22}
                  />
                </span>
              )
            }
            disabled={field?.disabled}
            value={field?.value}
          />
        );
      case "number":
        return (
          <InputNumber
            type="number"
            className="!w-full"
            size="large"
            placeholder={field.placeholder}
            min={field?.min ?? 1}
            max={field?.max}
            prefix={
              field?.prefix ?? (
                <span className="flex items-center justify-center h-full">
                  <Icon
                    icon="ant-design:number-outlined"
                    className="text-gray-800"
                    width={22}
                    height={22}
                  />
                </span>
              )
            }
            disabled={field?.disabled}
            value={+field?.value}
          />
        );

      case "searchInput": {
        const sip = field.searchInputProps;
        return (
          <SearchInput {...(sip ?? {})} queryKeys={sip?.queryKeys ?? []} />
        );
      }
      case "file":
        const fileProps = field.fileTypeProps!;
        return (
          <Upload
            multiple={(fileProps?.maxCount ?? 0) > 1}
            accept={fileProps?.accept}
            beforeUpload={() => false}
            onChange={({ fileList }) =>
              fileProps.onChange(fileList.map((f) => f.originFileObj))
            }
            maxCount={fileProps?.maxCount}
          >
            <Button size="large" className="!w-full" icon={<UploadOutlined />}>
              {field.placeholder || "Upload File"}
            </Button>
          </Upload>
        );
      case "checkbox":
        const checkboxProps = field.checkboxTypeProps!;
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              onChange={(e) =>
                checkboxProps.onChange &&
                checkboxProps.onChange(e.target.checked)
              }
              checked={checkboxProps?.checked}
            >
              {checkboxProps?.label && (
                <span className="text-gray-900">{checkboxProps.label}</span>
              )}
            </Checkbox>
          </div>
        );
      default:
        return null;
    }
  };

  const { mutate, isPending } = useApiMutation(
    [apiRoute],
    data?.id ? `${apiRoute}/${data.id}/update` : apiRoute,
    data?.id ? "PUT" : "POST"
  );

  const handleFormSubmit = async (values: any) => {
    try {
      const payload = { ...values };
      await mutate(
        { body: payload },
        {
          onSuccess: (res) => {
            if (onSubmit) {
              onSubmit(res);
            } else {
              router.back();
            }
          },
        }
      );
    } catch (error) {
      toast.error(`"${error}`);
    }
  };

  useEffect(() => {
    if (isPending) {
      setIsloading(true);
    } else {
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    }
  }, [isPending]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      initialValues={initialValues}
      requiredMark={true}
    >
      <Spin spinning={isFetching || isLoading}>
        <div className="flex !h-full bg-white p-1 m-4 rounded-md">
          <div className={`rounded-sm p-8 w-full`}>
            <div className="flex justify-between w-full gap-6">
              <div className={`${leftContent ? "w-3/4" : "w-full"}`}>
                {/* title and subtitle */}
                <div className="text-gray-800 mb-4">
                  <h1 className="!font-bold text-lg">{title}</h1>
                  {subTitle && <h2 className="font-semibold">{subTitle}</h2>}
                </div>
                <p className="text-gray-600 mt-4 ">
                  Please note that all fields with an astrisk (*) are mandatory.
                </p>
                {/* actual form inputes */}
                <div
                  className={`grid gap-4 ${
                    columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1"
                  }`}
                >
                  {fields.map((field: FieldConfig, index: number) => (
                    <Form.Item
                      key={index}
                      name={field.name}
                      label={
                        <span className=" text-gray-900">{field.label}</span>
                      }
                      rules={field.rules}
                      hidden={field.hidden}
                      className={`${field.className ?? ""} ${
                        field.className?.includes("w-full")
                          ? `md:col-span-${columns}`
                          : ""
                      }`}
                    >
                      {renderField(field)}
                    </Form.Item>
                  ))}
                </div>

                {/* form submit button */}
                <div className="flex mt-6 ">
                  <Form.Item>
                    <Button
                      type="default"
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
                      icon={
                        <span className="flex items-center">
                          {isCreate ? (
                            <Icon
                              icon="gridicons:create"
                              width={20}
                              height={20}
                            />
                          ) : (
                            <Icon
                              icon="material-symbols:save-outline"
                              width={20}
                              height={20}
                            />
                          )}
                        </span>
                      }
                      iconPosition="end"
                      loading={isPending}
                    >
                      {isCreate ? "Create" : "Save Changes"}{" "}
                    </Button>
                  </Form.Item>
                </div>
              </div>
              {leftContent && (
                <div className="w-1/2 h-screen ">{leftContent}</div>
              )}
            </div>
          </div>
        </div>
      </Spin>
    </Form>
  );
};

export default FormGenerator;
