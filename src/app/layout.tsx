import type { Metadata } from "next";
import "../styles/globals.css";
import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import QueryProvider from "@/store/query-provider";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/store/userContext";

export const metadata: Metadata = {
  title: "Alphabet",
  description: "Alphabet school managment system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <ConfigProvider
          theme={{
            components: {
              Button: {
                // defaultBg: "#13C110",
                // defaultActiveBg: "#13C110",
              },
            },
          }}
        >
          <QueryProvider>
            <UserProvider>{children}</UserProvider>
          </QueryProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
