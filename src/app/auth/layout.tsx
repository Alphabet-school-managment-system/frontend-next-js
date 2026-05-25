"use client";

import { Toaster } from "react-hot-toast";
import Index from "@/components/layout/authLayout";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { UserContext } from "@/store/userContext";
import { Spin } from "antd";
import { getLandingPath } from "@/lib/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { userData, isHydrated } = useContext(UserContext);

  useEffect(() => {
    if (!isHydrated || isPending) {
      return;
    }

    if (session || userData?.better_auth_userId) {
      router.replace(getLandingPath(userData?.role));
    }
  }, [isHydrated, isPending, router, session, userData?.better_auth_userId]);

  if (!isHydrated || isPending) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spin size="large" spinning />
      </div>
    );
  }

  return (
    <div className="white">
      <Toaster position="top-center" />
      <Index>{children}</Index>
    </div>
  );
}
