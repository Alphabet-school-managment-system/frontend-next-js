"use client";

import { useState } from "react";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import {BaseSkeleton} from "@/components/forms/FormSkeleton";

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

  return (
    <Spin spinning={isLoading}>
      <div className="bg-white rounded-md p-8 w-11/12 shadow-2xl">
        <School onLoading={setIsloading} />
        <AY onLoading={setIsloading} />
        <Setting onLoading={setIsloading} />
        <Branch onLoading={setIsloading} />
      </div>
    </Spin>
  );
}
