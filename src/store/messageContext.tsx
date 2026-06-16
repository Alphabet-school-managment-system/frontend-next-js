"use client";

import { message } from "antd";
import React, { createContext, useMemo, type ReactNode } from "react";

export type AppMessageType = {
  content: string;
  type: "success" | "error";
};

export type MessageContextType = {
  showMessage: (value: AppMessageType) => void;
};

export const MessageContext = createContext<MessageContextType>({
  showMessage: () => {},
});

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const value = useMemo(
    () => ({
      showMessage: ({ content, type }: AppMessageType) => {
        messageApi.open({
          type,
          content,
        });
      },
    }),
    [messageApi],
  );

  return (
    <MessageContext.Provider value={value}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
