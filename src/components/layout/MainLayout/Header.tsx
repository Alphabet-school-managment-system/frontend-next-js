"use client";

import { Icon } from "@iconify-icon/react";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../../store/userContext";
import {
  ConfirmationModalContext,
  type ConfirmationModalPropsType,
} from "../../../store/confirmationModalContext";
import { useRouter } from "next/navigation";

type HeaderProps = {
  pageTitle?: string;
  pageTitleDescription?: string;
  bgColor?: string;
};

const Header = ({ pageTitle, pageTitleDescription }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { userData } = useContext(UserContext);

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
        router.push("/auth/logout");
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

  return (
    <>
      <header
        className={`flex justify-between items-center m-0 bg-white shadow-lg z-0 px-4 py-2 rounded-none`}
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
                <span>{`Welcome,${userData?.first_name}`}</span>
                <Icon icon="ei:user" width={40} height={40} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">
                    My Account
                  </p>
                  <p className="mt-2 w-full">
                    <span className="text-xs text-gray-800 bg-gray-200 p-2 rounded uppercase font-bold">
                      {userData?.role}
                    </span>
                  </p>
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
    </>
  );
};

export default Header;
