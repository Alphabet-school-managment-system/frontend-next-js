"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import {
  useMainLayout,
  type MenuItem,
  type NavigationItem,
} from "./useMainLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SidebarProps = {
  activeKey?: string;
  onSelect: (item: MenuItem) => void;
  onCollapsed: (value: boolean) => void;
};

const SideBar = ({ activeKey, onSelect, onCollapsed }: SidebarProps) => {
  const { navItems: menuItems } = useMainLayout();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");

  useEffect(() => {
    if (activeKey) {
      setSelectedMenuItem(activeKey);
    }
  }, [activeKey]);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ [key]: !prev[key] }));
  };
  const router = useRouter();

  return (
    <aside
      className={`h-screen bg-white shadow-lg transition-all duration-300 ease-in-out fixed top-0 left-0 z-1 ${
        collapsed ? "w-20" : "w-75"
      }`}
    >
      {/* Collapse Icon button */}
      <span className="flex justify-between items-center p-3 px-5">
        <span
          className={`text-gray-600  ${collapsed ? "hidden" : ""} flex flex-col justify-center gap-2`}
        >
          <span className={"font-bold uppercase"}>Alphabet</span>
          <span className={``}>Student Record MGT System </span>
        </span>

        <span
          onClick={() => {
            setCollapsed(!collapsed);
            onCollapsed(!collapsed);
          }}
          className={`cursor-pointer transition-transform duration-300 ease-in-out ${
            collapsed ? "rotate-180" : ""
          }`}
        >
          <Icon
            icon="gravity-ui:layout-side-content"
            width={25}
            height={25}
            color="white"
          />
        </span>
      </span>

      {/* Menu Items */}
      <nav className="mt-4 px-4 overflow-y-auto h-[calc(100vh-120px)] custom-scrollbar">
        <ul className="space-y-2">
          {menuItems.map((item: NavigationItem) => (
            <li key={item.key} className="text-gray-800">
              {/* Parent with children (collapsible) */}
              {item.children && item.children.length > 0 ? (
                <>
                  <button
                    className={`w-full flex items-center px-2 py-2 rounded-md hover:cursor-pointer text-gray-400 font-semibold ${
                      collapsed ? "justify-center" : "justify-between"
                    } ${openGroups[item.key] ? "border-blue-200 border-solid border-2 bg-slate-50 shadow shadow-blue-100" : ""}`}
                    onClick={() => toggleGroup(item.key)}
                  >
                    <div
                      className={`${openGroups[item.key] ? "text-blue-500" : ""} flex items-center space-x-2`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <Icon
                        icon={
                          openGroups[item.key]
                            ? "ph:caret-up-bold"
                            : "ph:caret-down-bold"
                        }
                        className="transition-transform duration-300"
                        width={18}
                        height={18}
                        color={"gray"}
                      />
                    )}
                  </button>
                  {openGroups[item.key] && !collapsed && (
                    <ul className="space-y-1 border-l-gray-400 border-l-solid border-l-[2] pl-2.5 mt-2! ml-2">
                      {item.children.map((child) => {
                        return (
                          <li key={child.key}>
                            <span
                              className={`flex items-center px-2 py-2 rounded-md text-sm hover:cursor-pointer ${
                                selectedMenuItem === child.key
                                  ? "font-semibold text-blue-500 bg-slate-100 "
                                  : "hover:bg-gray-100 text-gray-500 font-semibold"
                              }`}
                              onClick={() => {
                                setSelectedMenuItem(child.key);
                                onSelect(child);
                                router.push(child.path);
                              }}
                            >
                              <span className="shrink-0">{child.icon}</span>
                              <span className="ml-2">{child.label}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                // Single menu item
                <Link
                  href={item.path}
                  className={`flex items-center px-2 py-2 rounded-md  font-semibold hover:cursor-pointer ${
                    selectedMenuItem === item.key
                      ? "border-blue-300 border-solid border-2 bg-[#dfe7f3]! font-semibold! text-blue-500"
                      : "hover:bg-gray-100! text-gray-800!"
                  }`}
                  onClick={() => {
                    setSelectedMenuItem(item.key);
                    onSelect(item);
                  }}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span
                    className={`ml-3 ${
                      collapsed ? "hidden" : "block"
                    } whitespace-nowrap`}
                  >
                    {item.label}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
