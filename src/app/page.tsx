"use client";
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { Index as Footer } from "@/app/(home)/footerPage";
import { Index as Header } from "@/app/(home)/headerPage";
import { Index } from "@/app/(home)/index";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/ws/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spin size="large" spinning />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <Index />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center w-full h-screen">
          <Spin size="large" spinning />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
