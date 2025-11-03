"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import {
  useMainLayout,
  type MenuItem,
  type NavigationItem,
} from "./useMainLayout";
import Link from "next/link";

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

  return (
    <aside
      className={`h-screen bg-white shadow-lg transition-all duration-300 ease-in-out fixed top-0 left-0 z-1 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Collapse Icon button */}
      <span className="flex justify-between items-center p-3 px-5">
        <span
          className={`text-gray-800 font-bold ${collapsed ? "hidden" : ""} `}
        >
          Alphabet
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
                    className={`w-full flex items-center justify-between px-2 py-2 rounded-md ${
                      collapsed ? "justify-center" : ""
                    }  hover:cursor-pointer`}
                    onClick={() => toggleGroup(item.key)}
                  >
                    <div className="flex items-center space-x-2 font-semibold">
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <Icon
                        icon={
                          openGroups[item.key]
                            ? "ph:caret-down-bold"
                            : "ph:caret-right-bold"
                        }
                        className="!font-bold transition-transform duration-300"
                        width={20}
                        height={20}
                      />
                    )}
                  </button>
                  {openGroups[item.key] && !collapsed && (
                    <ul className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <Link
                            href={child.path}
                            className={`flex items-center px-2 py-2 rounded-md text-sm font-semibold !text-gray-800 hover:cursor-pointer ${
                              selectedMenuItem === child.key
                                ? "!bg-blue-50 !font-semibold"
                                : "hover:!bg-blue-50"
                            }`}
                            onClick={() => onSelect(child)}
                          >
                            <span className="flex-shrink-0">{child.icon}</span>
                            <span className="ml-2">{child.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Single menu item
                <Link
                  href={item.path}
                  className={`flex items-center px-2 py-2 rounded-md !text-gray-800 font-semibold hover:cursor-pointer ${
                    selectedMenuItem === item.key
                      ? "!font-semibold !bg-blue-50"
                      : "hover:!bg-blue-50"
                  }`}
                  onClick={() => onSelect(item)}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
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
