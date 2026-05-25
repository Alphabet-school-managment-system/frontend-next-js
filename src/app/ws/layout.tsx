"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Index from "@/components/layout/MainLayout/Index";
import { ConfirmationModalProvider } from "@/store/confirmationModalContext";
import ConfirmationModal from "@/components/common/Modals";
import { Toaster } from "react-hot-toast";
import { IdsProvider } from "@/store/idsContext";
import { UserContext } from "@/store/userContext";
import { getLandingPath } from "@/lib/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (!children) {
      router.replace(getLandingPath(userData?.role));
    }
  }, [children, router, userData?.role]);

  return (
    <ConfirmationModalProvider>
        <IdsProvider>
          <ConfirmationModal />
          <Toaster position="top-center" />
          <Index>{children}</Index>
        </IdsProvider>
    </ConfirmationModalProvider>
  );
}
