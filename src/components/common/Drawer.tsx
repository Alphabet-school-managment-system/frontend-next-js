import { UtilContext } from "@/store/utilContext";
import { Button, Drawer as MainDrawer } from "antd";
import { useContext } from "react";

export const Drawer = () => {
  const { drawerProps, setDrawerProps } = useContext(UtilContext);
  return (
    <MainDrawer
      title={drawerProps.title}
      open={drawerProps.open}
      onClose={() => {
        setDrawerProps((prev) => ({ ...prev, open: false }));
      }}
      styles={drawerProps.styles && drawerProps.styles}
      footer={
        drawerProps.footer !== undefined ? (
          drawerProps.footer
        ) : (
          <Button
            htmlType="button"
            className="h-10 w-full"
            type="primary"
            onClick={() => {
              drawerProps.form.submit();
            }}
            loading={drawerProps.loading}
            size="large"
            danger={drawerProps.buttonDanger}
          >
            {drawerProps.buttonTitle
              ? drawerProps.buttonTitle
              : drawerProps.isEdit
                ? "Save Changes"
                : "Create"}
          </Button>
        )
      }
      maskClosable={false}
      width={drawerProps.width}
      className={drawerProps.className}
    >
      {drawerProps.children}
    </MainDrawer>
  );
};
