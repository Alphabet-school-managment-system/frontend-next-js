"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

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
