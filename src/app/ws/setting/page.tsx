"use client";

import { useContext, useState } from "react";
import { Form, Spin, FormInstance, Modal } from "antd";
import dynamic from "next/dynamic";
import { BaseSkeleton } from "@/components/forms/FormSkeleton";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
} from "@/store/confirmationModalContext";
import { PasswordInput } from "@/app/auth/login/LoginView";
import { useApiMutation } from "@/hooks/useApi";
import toast from "react-hot-toast";

const School = dynamic(() => import("@/app/ws/setting/school"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

const AY = dynamic(() => import("@/app/ws/setting/academic-year"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

const Setting = dynamic(() => import("@/app/ws/setting/setting"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

const Branch = dynamic(() => import("@/app/ws/setting/branch"), {
  ssr: false,
  loading: () => <BaseSkeleton />,
});

export const PasswordConfirmationForm = ({
  frmName,
  form,
  onFinish,
}: {
  frmName: string;
  form: FormInstance;
  onFinish: (value: any) => void;
}) => {
  return (
    <div>
      <span className="">
        {`Are you sure you want to save these ${frmName.toLowerCase()} changes ? If so, enter your password to confirm`}
      </span>
      <Form
        form={form}
        name="confirmation"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <PasswordInput
          label=""
          showPrefix={false}
          required={true}
          requiredMSG={"* required"}
        />
      </Form>
    </div>
  );
};
export default function Home() {
  const [isLoading, setIsloading] = useState(false);
  const [form] = Form.useForm();

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext,
  );

  const [modal, contextHolder] = Modal.useModal();

  const { mutate } = useApiMutation(
    ["auth/verify-password"],
    "auth/verify-password",
    "POST",
  );

  const handleSubmit = async ({
    values,
    callbackFnc,
  }: {
    values: any;
    callbackFnc: () => void;
  }) => {
    try {
      const payload = { ...values };
      await mutate(
        { body: payload },
        {
          onSuccess: async (res: any) => {
            await callbackFnc();
            await Modal.destroyAll();
            form.resetFields(["password"]);
          },
        },
      );
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const onConfirmationRequest = (callbackFnc: () => void, frmName: string) => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      title: "Confirmation",
      content: (
        <PasswordConfirmationForm
          frmName={frmName}
          onFinish={async (values: any) => {
            handleSubmit({ values, callbackFnc });
          }}
          form={form}
        />
      ),
      okButtonText: "Yes, Proceed.",
      cancelButtonText: "Cancel",
      onOk: async () => {
        await form.submit();
      },
      onCancel: () => {
        setcmProps((p: ConfirmationModalPropsType) => ({
          ...p,
        }));
      },
      okButtonProps: {
        danger: false,
      },
      show: true,
      closeOnOk: false,
    }));
  };

  return (
    <Spin spinning={isLoading}>
      <div className="bg-white rounded-md p-8 w-11/12 shadow-2xl">
        <School
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
        <AY
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
        <Setting
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
        <Branch
          onLoading={setIsloading}
          onConfirmationRequest={onConfirmationRequest}
        />
      </div>
    </Spin>
  );
}
