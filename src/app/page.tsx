"use client";
import { useSession } from "@/lib/auth-client";
import { useContext, useEffect } from "react";
import { Index as Footer } from "@/app/(home)/footerPage";
import { Index as Header } from "@/app/(home)/headerPage";
import { Index } from "@/app/(home)/index";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { UserContext } from "@/store/userContext";
import { getLandingPath } from "@/lib/constants";

function HomeContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { userData, isHydrated } = useContext(UserContext);

  useEffect(() => {
    if (!isHydrated || isPending) {
      return;
    }

    if (session || userData?.better_auth_userId) {
      router.replace(getLandingPath(userData?.role));
    }
  }, [session, isPending, router, userData?.better_auth_userId, isHydrated]);

  if (isPending || !isHydrated) {
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
