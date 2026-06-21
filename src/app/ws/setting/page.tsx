"use client";

import { useState } from "react";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import { BaseSkeleton } from "@/components/forms/FormSkeleton";
import { useConfirmationRequest } from "@/components/common/PasswordConfirmationForm";

const School = dynamic(() => import("@/app/ws/setting/school"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

const AY = dynamic(() => import("@/app/ws/setting/academic-year"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

const Setting = dynamic(() => import("@/app/ws/setting/setting"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

const Branch = dynamic(() => import("@/app/ws/setting/branch"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

export default function Home() {
  const [isLoading, setIsloading] = useState(false);
  const onConfirmationRequest = useConfirmationRequest();

  return (
    <Spin spinning={isLoading}>
      <div className="bg-white rounded-md p-8 w-11/12 shadow-2xl">
        <School
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
        <AY
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
        <Setting
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
        <Branch
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
      </div>
    </Spin>
  );
}
