"use client";

import { useContext, useEffect } from "react";
import { Button, Modal } from "antd";
import {
  ConfirmationModalContext,
  defaultConfirmationModalProps,
  type ConfirmationModalPropsType,
} from "../../store/confirmationModalContext";

const ConfirmationModal = () => {
  const [modal, contextHolder] = Modal.useModal();

  const {
    confirmationModalProps: cmProps,
    setConfirmationModalProps: setcmProps,
  } = useContext(ConfirmationModalContext);

  useEffect(() => {
    if (!cmProps?.show) return;

    modal.confirm({
      title: cmProps?.title,
      content: cmProps?.content,
      icon: null,
      footer: (
        <div className="flex justify-end items-end mt-4 gap-2">
          <Button
            type="default"
            htmlType="button"
            className="mt-2 rounded-sm!"
            size="middle"
            onClick={() => {
              setcmProps((prev: ConfirmationModalPropsType) => ({
                ...prev,
                ...defaultConfirmationModalProps,
              }));
              Modal.destroyAll();
              cmProps?.onCancel && cmProps?.onCancel();
            }}
          >
            {cmProps?.cancelButtonText}
          </Button>
          <Button
            type="primary"
            danger
            htmlType="button"
            className="mt-2 rounded-sm!"
            size="middle"
            onClick={() => {
              setcmProps((prev: ConfirmationModalPropsType) => ({
                ...prev,
                ...defaultConfirmationModalProps,
                show: false,
              }));
              cmProps?.closeOnOk && Modal.destroyAll();
              cmProps?.onOk && cmProps?.onOk();
            }}
            {...cmProps?.okButtonProps}
          >
            {cmProps?.okButtonText}
          </Button>
        </div>
      ),
    });
  }, [cmProps?.show]);

  return <>{contextHolder}</>;
};

export default ConfirmationModal;
