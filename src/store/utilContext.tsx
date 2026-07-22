"use client";

import React, { createContext, useState, type ReactNode } from "react";
import type { DrawerProps } from "@/types";

export type DrawerType = {
  drawerProps: DrawerProps;
};

export type UtilContextType = {
  drawerProps: DrawerProps;
  setDrawerProps: React.Dispatch<React.SetStateAction<DrawerProps>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export const UtilContext = createContext<UtilContextType>({
  drawerProps: {
    title: undefined,
    onClose: (): void => {},
    children: undefined,
    open: false,
  },
  setDrawerProps: () => {},
  formData: undefined,
  setFormData: () => {},
});

export const UtilProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [drawerProps, setDrawerProps] = useState<DrawerProps>({
    title: "",
    onClose: () => {},
    children: undefined,
    open: false,
  });
  const [formData, setFormData] = useState<any>();

  return (
    <UtilContext.Provider
      value={{ drawerProps, setDrawerProps, formData, setFormData }}
    >
      {children}
    </UtilContext.Provider>
  );
};
