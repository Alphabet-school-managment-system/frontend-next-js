"use client";

import dynamic from "next/dynamic";
import { AuthFormSkeleton } from "@/components/forms/FormSkeleton";

const View = dynamic(
  () => import("@/app/auth/reset-password/resetPasswordView"),
  {
    ssr: false,
    loading: () => <AuthFormSkeleton />,
  }
);

export default function Home() {
  return <View />;
}
