"use client";

import { FieldType } from "@/components/forms/FormGenerator";
import { FormSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";
import { useStudent } from "../../student/hook/useStudent";
import { useTeacher } from "../hook/useTeacher";
import { ImagePreview } from "../../student/new/page";
import { useContext, useState } from "react";
import { IdsContext } from "@/store/idsContext";

const FormGenerator = dynamic(
  () => import("@/components/forms/FormGenerator"),
  {
    ssr: false,
    loading: () => <FormSkeleton />,
  }
);

export default function Home() {
  const { getCommonFormFields } = useStudent();
  const { getFormFields } = useTeacher();
  const [image, setImage] = useState<any>(null);
  const { Ids } = useContext(IdsContext);

  return (
    <div className="">
      <FormGenerator
        columns={2}
        fields={[...getCommonFormFields(false), ...getFormFields({ image })]}
        title="Create new Teacher"
        apiRoute="teacher"
        data={{
          branch_id: Ids?.branchId,
        }}
        leftContent={<ImagePreview onImageSelect={setImage} />}
      />
    </div>
  );
}
