"use client";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { Index as Footer } from "@/app/(home)/footerPage";
import { Index as Header } from "@/app/(home)/headerPage";
import { Index } from "@/app/(home)/index";

import { Spin } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending)
      <div className="flex justify-center items-center w-full h-screen">
        <Spin size="large" spinning className="text-gray-800" />
      </div>;

    if (session) {
      router.replace("/ws/dashboard");
    }
  }, [session, isPending, router]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <Index />
      <Footer />
    </main>
  );
}
