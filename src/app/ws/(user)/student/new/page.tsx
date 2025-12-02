"use client";

import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useStudent } from "../hook/useStudent";
import { useContext, useEffect, useState } from "react";
import { Button, Image as AntdImage, Upload, UploadProps } from "antd";
import { staticImages } from "@/lib/static-images";
import { UploadOutlined } from "@ant-design/icons";
import { getFileUrl } from "@/app/ws/(finance)/expense/new/page";

import Image from "next/image";
import { IdsContext } from "@/store/idsContext";

export const ImagePreview = ({
  onImageSelect,
}: {
  onImageSelect: (image: string | undefined) => void;
}) => {
  const [image, setImage] = useState<any>(staticImages.noPhotoBoyImg);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    onImageSelect(image);
  }, [image]);

  return (
    <div className="flex flex-col justify-center items-center rounded-md p-4 bg-gray-50 shadow-sm m-4 h-3/4">
      {image ? (
        <Image
          src={image}
          alt="student placeholder Image"
          width={250}
          height={250}
          className="w-[250px] h-[250px] rounded-md mb-6"
          priority
        />
      ) : (
        <AntdImage
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={image}
          className="rounded-md mb-6 cursor-pointer"
          width={250}
          height={250}
        />
      )}
      <Upload
        multiple={false}
        accept=".jpg,.jpeg,.png"
        beforeUpload={() => false}
        onChange={async ({ fileList }) => {
          if (fileList.length > 0) {
            const tmp =
              (await getFileUrl(fileList.map((f) => f.originFileObj))) ?? "";
            onImageSelect(tmp);
            setImage(tmp);
          } else {
            setImage(staticImages.noPhotoBoyImg);
          }
        }}
        maxCount={1}
      >
        <Button size="large" className="!w-full" icon={<UploadOutlined />}>
          {"Choose Image"}
        </Button>
      </Upload>
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
  const { getFormFields } = useStudent();
  const [image, setImage] = useState<any>(null);
  const { Ids } = useContext(IdsContext);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={getFormFields({ image })}
        title="Create new Student"
        apiRoute="student"
        data={{
          branch_id: Ids?.branchId,
        }}
        leftContent={<ImagePreview onImageSelect={setImage} />}
      />
    </div>
  );
}
