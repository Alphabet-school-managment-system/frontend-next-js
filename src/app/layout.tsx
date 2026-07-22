import type { Metadata } from "next";
// @ts-ignore: allow side-effect import of CSS without type declarations
import "../styles/globals.css";
// @ts-ignore: allow side-effect import of CSS without type declarations
import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import QueryProvider from "@/store/query-provider";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/store/userContext";
import { MessageProvider } from "@/store/messageContext";
import { UtilProvider } from "@/store/utilContext";

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
          <MessageProvider>
            <UtilProvider>
              <QueryProvider>
                <UserProvider>{children}</UserProvider>
              </QueryProvider>
            </UtilProvider>
          </MessageProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
