"use client";

import dynamic from "next/dynamic";

const View = dynamic(
  () => import("@/app/auth/verify-email/verifiedEmailView"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <View />;
}
