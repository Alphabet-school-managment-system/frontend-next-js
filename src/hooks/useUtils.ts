"use client";

import { useContext } from "react";
import { MessageContext } from "@/store/messageContext";

export const useUtils = () => {
  const { showMessage } = useContext(MessageContext);
  return {
    ShowMessage: showMessage,
    contextHolder: null,
  };
};
