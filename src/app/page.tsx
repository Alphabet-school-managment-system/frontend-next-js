"use client";

import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/ws/dashboard");
  }, [router]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Spin size="large" spinning className="text-gray-800" />
    </div>
  );
}
