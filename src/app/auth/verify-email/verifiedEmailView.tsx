"use client";
import { authClient } from "@/lib/auth-client";
import { Spin } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifiedEmailView() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ data: any; error: any }>({
    data: undefined,
    error: undefined,
  });
  const params = useSearchParams();
  const email = params.get("email");

  useEffect(() => {
    async function verify() {
      setLoading(true);
      if (params.get("token")) {
        try {
          const response = await authClient.verifyEmail({
            query: {
              token: params.get("token") || "",
            },
          });
          setResponse(response);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setResponse({ data: undefined, error });
        }
      }
    }
    verify();
  }, [params]);

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-sm text-center">
        {loading ? (
          <>
            <Spin spinning={loading} size="large" />
            <span className="block mt-4">Verifying your email...</span>
          </>
        ) : response?.error ? (
          <span className="text-red-600">
            Verification failed: {response?.error?.message || "Unknown error"}
          </span>
        ) : (
          <>
            <h1>
              <span className="font-semibold block mb-2">{email}</span>Your
              email has been verified!
            </h1>
            <p>
              You can now log in to your account. Click{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline"
              >
                here
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </>
  );
}
