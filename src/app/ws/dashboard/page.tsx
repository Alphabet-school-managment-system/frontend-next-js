"use client";

import { DashboardSkeleton } from "@/components/forms/FormSkeleton";
import dynamic from "next/dynamic";

const Index = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

export default function Home() {
  return (
    <div className="">
      <Index />
    </div>
  );
}
