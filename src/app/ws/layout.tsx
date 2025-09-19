"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Index from "@/components/layout/MainLayout/Index";
import { ConfirmationModalProvider } from "@/store/confirmationModalContext";
import ConfirmationModal from "@/components/common/Modals";
import { Toaster } from "react-hot-toast";

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

  return (
    <ConfirmationModalProvider>
      <ConfirmationModal />
      <Toaster position="top-center" />
      <Index>{children}</Index>
    </ConfirmationModalProvider>
  );
}
