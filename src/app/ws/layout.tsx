"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Index from "@/components/layout/MainLayout/Index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (!children) {
      router.replace("/ws/dashboard");
    }
  }, [children, router]);

  return <Index>{children}</Index>;
}
