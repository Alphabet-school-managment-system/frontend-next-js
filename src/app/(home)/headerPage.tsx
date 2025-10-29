"use client";

import { Drawer } from "@/components/common/Drawer";
import { useEffect, useState } from "react";
import { SignUpForm } from "./signupPage";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import logoImg from "@/assets/images/logo.png";
import Image from "next/image";

export const Index = () => {
  const params = useSearchParams();
  const q = params.get("q");

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (q === "signup") {
      setOpenDrawer(true);
    }
  }, [q]);

  return (
    <>
      <header className="flex fixed justify-between items-center px-8 py-5 shadow-lg w-full z-10 bg-white">
        <div className="flex items-center justify-between">
          <Image
            src={logoImg}
            alt="School Logo"
            width={50}
            height={50}
            className="w-[50px] h-[50px]"
            priority
          />
          <h1 className="text-xl font-semibold pt-2">Alphabet</h1>
        </div>
        <nav className="flex gap-8 text-sm font-medium">
          <a
            href="#home"
            className="font-semibold text-base hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="#aboutUs"
            className="font-semibold text-base hover:text-blue-600"
          >
            About
          </a>
          <a
            href="#features"
            className="font-semibold text-base hover:text-blue-600"
          >
            Features
          </a>
        </nav>

        <button
          className="bg-gray-900 rounded-md px-6 py-3 !text-white cursor-pointer"
          type="button"
          onClick={() => setOpenDrawer(true)}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center justify-center">
              Request a Demo
            </span>
            <span className="flex items-center justify-center">
              <Icon
                icon="lsicon:open-new-filled"
                className="text-white"
                width={22}
                height={22}
              />
            </span>
          </div>
        </button>
      </header>

      {openDrawer && (
        <Drawer
          title={"Register"}
          open
          onClose={() => {}}
          width={500}
          footer={<div></div>}
          styles={{
            header: {
              display: "none",
            },
            body: {
              borderWidth: 0,
            },
            content: { boxShadow: "none" },
          }}
          className="!bg-transparent !border-none !custom-scrollbar"
        >
          <SignUpForm
            onSuccess={() => {
              setOpenDrawer(false);
            }}
            onCancel={() => setOpenDrawer(false)}
          />
        </Drawer>
      )}
    </>
  );
};
