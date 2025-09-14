"use client";
import { use, useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import { useMainLayout, type MenuItem } from "./useMainLayout";

interface LayoutProps {
  children: React.ReactNode;
  activeKey?: string;
  pageTitle?: string;
  pageTitleDescription?: string;
  loading?: boolean;
  error?: string;
  bgColor?: string;
}

const Index: React.FC<LayoutProps> = ({ children }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    null
  );

  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = (item: MenuItem): void => {
    setSelectedMenuItem(item);
  };

  return (
    <div className="flex h-screen bg-gray-300">
      <Sidebar
        activeKey={selectedMenuItem?.key}
        onSelect={handleSelect}
        onCollapsed={(value: boolean) => {
          setCollapsed(value);
        }}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "ml-20" : "ml-64"
        }  relative`}
      >
        <Header
          pageTitle={selectedMenuItem?.label}
          pageTitleDescription={selectedMenuItem?.description}
        />

        <main
          className="flex-1 overflow-auto custom-scrollbar bg-gray-50 rounded-sm
     p-4"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Index;
