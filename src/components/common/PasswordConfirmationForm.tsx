import { PasswordInput } from "@/app/auth/login/LoginView";
import { useApiMutation } from "@/hooks/useApi";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
} from "@/store/confirmationModalContext";
import { Form, FormInstance, Modal } from "antd";
import { useContext } from "react";
import toast from "react-hot-toast";

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

export const useConfirmationRequest = () => {
  const [form] = Form.useForm();
  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext,
  );

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

  const onConfirmationRequest = (
    callbackFnc: () => void,
    frmName: string,
  ) => {
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

  return onConfirmationRequest;
};
