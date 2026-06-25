"use client";

import { Icon } from "@iconify-icon/react";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../../store/userContext";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../../store/confirmationModalContext";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import ChangePassword from "@/app/ws/(profile)/change-password";
import { Drawer } from "@/components/common/Drawer";
import { Button, Form } from "antd";
import { useApiQuery } from "@/hooks/useApi";
import { IdsContext } from "@/store/idsContext";

type HeaderProps = {
  pageTitle?: string;
  pageTitleDescription?: string;
  bgColor?: string;
  onLoading: (value: boolean) => void;
};

export const Logout = async ({
  onRequest,
  onResponse,
  onClear,
}: {
  onRequest: () => void;
  onResponse: () => void;
  onClear: () => void;
}) => {
  await signOut(
    {},
    {
      onRequest: () => {
        onRequest();
      },
      onResponse: () => {
        onClear();
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
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { Ids, setIds } = useContext(IdsContext);
  const [getIds, setGetIds] = useState(false);
  const { setUserData, userData, clearUserData } = useContext(UserContext);

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
            onClear: () => {
              clearUserData();
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

  const { data: ids, isLoading: gettingIds } = useApiQuery<any>(
    ["auth/getIds"],
    `${"auth/getIds"}/${userData?.better_auth_userId}`,
    getIds
  );

  useEffect(() => {
    async function loadSession() {
      if (!userData?.better_auth_userId) {
        const { data: session, error } = await getSession();

        if (error || !session) {
          router.replace("/auth/login");
          return;
        }

        setUserData({
          first_name: session.user.name,
          image: session.user.image,
          better_auth_userId: session.user.id,
        });

        setGetIds(true);
      } else {
        setGetIds(true);
      }
    }

    loadSession();
  }, []);

  useEffect(() => {
    onLoading(gettingIds);
  }, [gettingIds]);

  useEffect(() => {
    if (ids) {
      setIds({
        schoolId: ids?.schoolId,
        branchId: ids?.branchId,
        branchName: ids?.branchName,
        academicYearId: ids?.academicYearId[0],
      });
    }
  }, [ids]);

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
          {Ids?.branchName && (
            <span
              className="bg-blue-50 text-gray-800 p-2 text-sm font-semibold rounded-md cursor-pointer"
              title="Current branch"
            >
              {Ids?.branchName}
            </span>
          )}
          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            {userData?.first_name && (
              <button
                className="flex items-center space-x-3 focus:outline-none cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="flex items-center justify-center text-gray-800">
                  <span>{`Welcome, ${userData?.first_name}`}</span>
                  {!userData?.image && (
                    <Icon icon="ei:user" width={40} height={40} />
                  )}
                </div>
              </button>
            )}

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
              className="rounded-sm! flex w-full"
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
