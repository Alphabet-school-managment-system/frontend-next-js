"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { ExpenseType, useExpense } from "../hook/useExpense";
import { useContext, useState } from "react";
import { Form, GetProp, Image, UploadFile, UploadProps } from "antd";
import { Icon } from "@iconify-icon/react";
import { IdsContext } from "@/store/idsContext";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (file: FileType): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getFileUrl = async (fileList: any[]) => {
  const file: UploadFile = fileList?.[0];

  if (!file) {
    return "";
  }

  if (!file.url && !file.preview) {
    file.preview = await getBase64(file as FileType);
    return file.url || (file.preview as string);
  }
};

export const ReceiptPreview = ({ previewImage }: { previewImage: string }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  return (
    <div className="flex justify-center items-center rounded-md p-4 bg-gray-50 shadow-sm m-4 h-3/4">
      {previewImage ? (
        <Image
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={previewImage}
        />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <span className="flex items-center mb-2">
            <Icon
              icon="akar-icons:reciept"
              width={30}
              height={30}
              className="text-gray-600"
            />
          </span>
          <h2 className="text-lg font-medium mb-4 text-gray-600">
            Receipt preview shown here.
          </h2>
        </div>
      )}
    </div>
  );
};

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export default function Home() {
  const { getFormFields } = useExpense();
  const [previewImage, setPreviewImage] = useState("");
  const [expenseTypes, setExpenseTypes] = useState<{
    type?: ExpenseType;
    otherType?: ExpenseType;
  }>({});

  const { Ids } = useContext(IdsContext);
  const [form] = Form.useForm();

  return (
    <FormGenerator
      columns={2}
      fields={getFormFields({
        onFileChange: (fileList) => {
          getFileUrl(fileList).then((url) => setPreviewImage(url ?? ""));
        },
        onTypeChange: (value: ExpenseType) => {
          setExpenseTypes((prev) => ({
            ...prev,
            type: value,
          }));
          if (value !== ExpenseType.Other) {
            setExpenseTypes((prev) => ({
              ...prev,
              otherType: undefined,
            }));
            form.setFieldValue("other_type", undefined);
          }
        },
        onOtherTypeChange: (value) => {
          if (value) {
            setExpenseTypes((prev) => ({
              ...prev,
              otherType: value,
            }));
          } else {
            setExpenseTypes((prev) => ({
              ...prev,
              otherType: undefined,
            }));
            form.setFieldValue("other_type", undefined);
          }
        },
        type: expenseTypes.type,
        other_type: expenseTypes.otherType,
      })}
      title="Create new Expense"
      apiRoute="expense"
      data={{
        academic_year_id: Ids?.academicYearId,
      }}
      leftContent={<ReceiptPreview previewImage={previewImage} />}
      formInstance={form}
    />
  );
}
