"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useSession } from "@/lib/auth-client";
import { UserContext } from "@/store/userContext";
import { getLandingPath } from "@/lib/constants";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { userData, isHydrated } = useContext(UserContext);

  useEffect(() => {
    if (!isHydrated || isPending) {
      return;
    }

    router.replace(getLandingPath(userData?.role));
  }, [router, isHydrated, isPending, session, userData?.role]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Spin size="large" spinning className="text-gray-800" />
    </div>
  );
}
