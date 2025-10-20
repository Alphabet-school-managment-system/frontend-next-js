import { Toaster } from "react-hot-toast";
import Index from "@/components/layout/authLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="white">
      <Toaster position="top-center" />
      <Index>{children}</Index>
    </div>
  );
}
