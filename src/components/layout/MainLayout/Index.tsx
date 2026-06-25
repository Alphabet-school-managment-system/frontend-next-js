"use client";
import { use, useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import { NavigationItem, useMainLayout, type MenuItem } from "./useMainLayout";
import { Spin } from "antd";
import { usePathname } from "next/navigation";

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

  const { navItems: menuItems } = useMainLayout();

  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = (item: MenuItem): void => {
    setSelectedMenuItem(item);
  };

  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuItems.length) return;

    const newValue = searchHeaderText(menuItems, pathname.split("/")[2]);

    if (selectedMenuItem !== newValue) {
      setSelectedMenuItem(newValue);
    }
  }, [pathname]);

  const searchHeaderText = (items: NavigationItem[], label: string) => {
    for (const item of items) {
      if (item.key == label) return item;
      if (item.children) {
        const found: any = searchHeaderText(item.children, label);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <Spin spinning={isLoading} size="large">
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
            collapsed ? "ml-20" : "ml-75"
          }  relative`}
        >
          <Header
            pageTitle={selectedMenuItem?.label}
            pageTitleDescription={selectedMenuItem?.description}
            onLoading={(value: boolean) => setIsLoading(value)}
          />

          <main
            className="flex-1 overflow-auto custom-scrollbar bg-gray-50 rounded-sm
     p-4"
          >
            {children}
          </main>
        </div>
      </div>
    </Spin>
  );
};

export default Index;
