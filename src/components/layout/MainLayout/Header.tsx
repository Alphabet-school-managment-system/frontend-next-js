"use client";

import { Icon } from "@iconify-icon/react";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../../store/userContext";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../../store/confirmationModalContext";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import ChangePassword from "@/app/ws/(profile)/change-password";
import { Drawer } from "@/components/common/Drawer";
import { Button, Form } from "antd";

type HeaderProps = {
  pageTitle?: string;
  pageTitleDescription?: string;
  bgColor?: string;
  onLoading: (value: boolean) => void;
};

export const Logout = async ({
  onRequest,
  onResponse,
}: {
  onRequest: () => void;
  onResponse: () => void;
}) => {
  await signOut(
    {},
    {
      onRequest: () => {
        onRequest();
      },
      onResponse: () => {
        onResponse();
        window.location.replace("/auth/login");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    }
  );
};

const Header = ({
  pageTitle,
  pageTitleDescription,
  onLoading,
}: HeaderProps) => {
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerView, setDrawerView] = useState(<></>);
  const [titles, setTitles] = useState<{
    header: string;
    button: string;
  }>({
    header: "",
    button: "",
  });

  const [form] = Form.useForm();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { userData, setUserData } = useContext(UserContext);

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      content: "Are you sure want to log out from system ?",
      okButtonText: "Yes, Proceed.",
      cancelButtonText: "Nuh, Stay!",
      onOk: async () => {
        await Logout({
          onRequest: () => {
            onLoading(true);
          },
          onResponse: () => {
            onLoading(false);
          },
        });
      },
      show: true,
    }));
  };

  useEffect(() => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      onCancel: () => {},
    }));
  }, []);

  const { data: session, isPending, error } = useSession();

  useEffect(() => {
    if (isPending) {
      onLoading(true);
    } else {
      if (error) {
        toast.error(error?.message || "Error occurred");
        router.replace("/auth/login");
      } else {
        if (session) {
          setUserData({
            first_name: session?.user?.name,
            image: session?.user?.image,
          });
        } else {
          router.replace("/auth/login");
        }
      }
      onLoading(false);
    }
  }, [isPending, error, session]);

  return (
    <>
      <header
        className={`flex justify-between items-center m-0 bg-white shadow-lg shadow-gray-200 z-1 px-4 py-2 rounded-none`}
      >
        <div className="flex flex-col">
          <div className="text-lg  text-gray-800 text-left font-semibold">
            {pageTitle}
          </div>
          <div className=" text-gray-800 font-light">
            {pageTitleDescription}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-3 focus:outline-none cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="flex items-center justify-center text-gray-800">
                <span>{`Welcome, ${session?.user?.name}`}</span>
                {!session?.user?.image && (
                  <Icon icon="ei:user" width={40} height={40} />
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                <div className=" mt-2 pt-2">
                  <button
                    onClick={() => {
                      setTitles({
                        header: "Change Password",
                        button: "Update Password",
                      });
                      setOpenDrawer(true);
                      setDrawerView(
                        <ChangePassword form={form} onLoading={setLoading} />
                      );
                    }}
                    className="w-full text-left block px-4 py-2 text-sm   font-medium cursor-pointer"
                  >
                    Change Password
                  </button>
                </div>
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {openDrawer && (
        <Drawer
          title={titles?.header}
          open
          onClose={() => {
            form.resetFields();
            setOpenDrawer(false);
          }}
          width={500}
          footer={
            <Button
              type="primary"
              htmlType="button"
              className="!rounded-sm flex w-full"
              size="large"
              onClick={() => form.submit()}
              loading={loading}
            >
              {titles?.button}
            </Button>
          }
        >
          {drawerView}
        </Drawer>
      )}
    </>
  );
};

export default Header;
