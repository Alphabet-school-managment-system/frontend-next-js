import { Drawer } from "@/components/common/Drawer";
import { Select } from "@/components/common/Select";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
  defaultConfirmationModalProps,
} from "@/store/confirmationModalContext";
import { IdsContext } from "@/store/idsContext";
import { Branch } from "@/types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Icon } from "@iconify-icon/react";

const Index = ({
  onLoading,
  onConfirmationRequest,
}: {
  onLoading: (value: boolean) => void;
  onConfirmationRequest: (fnc: () => void, frmName: string) => void;
}) => {
  const apiRoute = "branch";

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext,
  );

  useEffect(() => {
    setcmProps((prev: ConfirmationModalPropsType) => ({
      ...prev,
      onCancel: () => {},
      content: "Are you sure you want to delete this branch?",
    }));
  }, []);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isEditBranch, setIsEditBranch] = useState(false);
  const [id, setId] = useState<string | undefined>("");
  const { Ids, setIds } = useContext(IdsContext);

  const [branchForm] = Form.useForm();
  const [changeCurrentBranchForm] = Form.useForm();

  const { data, isLoading } = useApiQuery<Branch[]>(
    [`${apiRoute}/${Ids?.schoolId}`],
    `${apiRoute}/${Ids?.schoolId}`,
  );

  const { mutate, isPending } = useApiMutation(
    [`${apiRoute}/${Ids?.schoolId}`],
    isEditBranch
      ? `${apiRoute}/${branchForm.getFieldValue("id")}/update`
      : apiRoute,
    isEditBranch ? "PUT" : "POST",
  );

  const { mutate: changeCurrent, isPending: changingCurrentBranch } =
    useApiMutation(
      [`${apiRoute}/${Ids?.schoolId}`],
      `${apiRoute}/change-current`,
      "PUT",
    );

  const { mutate: Delete, isPending: deleting } = useApiMutation(
    [`${apiRoute}/${Ids?.schoolId}`],
    `${apiRoute}/${id}/delete`,
    "DELETE",
  );

  useEffect(() => {
    if (isLoading || isPending || deleting || changingCurrentBranch) {
      onLoading(true);
    } else {
      setTimeout(() => {
        onLoading(false);
      }, 500);
    }
  }, [isLoading, isPending, deleting, changingCurrentBranch]);

  const handleSubmit = async (
    values: any,
    isChangeCurrent: boolean = false,
  ) => {
    try {
      if (isChangeCurrent) {
        changeCurrent(
          { body: { ...values } },
          {
            onSuccess: (res) => {
              if (setIds) {
                setIds({
                  ...(Ids ?? {}),
                  branchId: res?.data?.id,
                  branchName: res?.data?.name,
                });
              }
            },
          },
        );
      } else {
        const payload = isEditBranch
          ? { ...values }
          : { ...values, school_id: Ids?.schoolId };
        await mutate(
          { body: payload },
          {
            onSuccess: (res) => {
              handleDrawerClose();
            },
          },
        );
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleDrawerClose = () => {
    branchForm.resetFields();
    setOpenDrawer(false);
    setIsEditBranch(false);
  };

  const handleDeleteBranch = () => {
    try {
      Delete(
        { body: undefined },
        {
          onSuccess: (res) => {
            setcmProps({ ...defaultConfirmationModalProps });
          },
        },
      );
    } catch (error) {
      console.log("Item deletion error:", error);
    }
  };

  return (
    <div>
      <Card
        variant="borderless"
        title="Branches"
        extra={
          <Button icon={<PlusOutlined />} onClick={() => setOpenDrawer(true)}>
            Add Branch
          </Button>
        }
      >
        {/* change the school current branch */}
        <div className=" flex flex-col mb-4">
          <Form
            layout="vertical"
            onFinish={(values: any) =>
              onConfirmationRequest(
                async () => await handleSubmit({ id: values?.id }, true),
                "branch",
              )
            }
            form={changeCurrentBranchForm}
          >
            <Form.Item
              label="Set this branch as your school's current default"
              name="id"
              rules={[{ required: true, message: "" }]}
            >
              <Select
                placeholderText="Select Branch"
                classNames="!w-full"
                data={
                  data?.map((branch: Branch) => ({
                    label: branch.name,
                    value: branch.id ?? "",
                  })) ?? []
                }
                onChange={(value: any) => {
                  changeCurrentBranchForm.setFieldValue("id", value);
                }}
                allowClear={true}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                htmlType="submit"
                className="!rounded-sm"
                size="large"
                loading={changingCurrentBranch}
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Row gutter={[16, 16]}>
          {data &&
            data.map((branch: Branch) => {
              if (branch?.isCurrent)
                changeCurrentBranchForm.setFieldValue("id", branch.id);
              return (
                <Col key={branch?.id} xs={24} sm={12} md={8}>
                  <Card
                    variant="outlined"
                    size="small"
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => {
                          if (changingCurrentBranch) return;
                          branchForm.setFieldsValue(branch);
                          setIsEditBranch(true);
                          setOpenDrawer(true);
                        }}
                      />,
                      !branch?.isDefault ? (
                        <DeleteOutlined
                          key="delete"
                          onClick={() => {
                            if (changingCurrentBranch) return;
                            setcmProps((prev: ConfirmationModalPropsType) => ({
                              ...prev,
                              show: true,
                              onOk: async () => {
                                await setId(branch?.id);
                                await handleDeleteBranch();
                              },
                            }));
                          }}
                          size={20}
                        />
                      ) : (
                        <span className="flex justify-center items-center">
                          <Icon
                            icon="mdi:delete-off-outline"
                            className="cursor-pointer text-gray-400"
                            width={20}
                            height={20}
                            title="Default branch can't be deleted"
                          />
                        </span>
                      ),
                    ]}
                    extra={
                      <span className="flex gap-2">
                        {branch.isDefault && (
                          <Icon
                            icon="uit:star"
                            className="text-gray-900 cursor-pointer"
                            width={20}
                            height={20}
                            title="Default Branch"
                          />
                        )}
                        {branch.isCurrent && (
                          <span
                            title="Current Branch"
                            className="text-gray-400"
                          >
                            <small>(Current)</small>
                          </span>
                        )}
                      </span>
                    }
                    title={branch.name}
                  >
                    <span className="text-gray-400">
                      {branch.location?.toString()}
                    </span>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Card>

      {openDrawer && (
        <Drawer
          title={isEditBranch ? "Edit Branch" : "Create Branch"}
          open
          onClose={() => {
            handleDrawerClose();
          }}
          width={500}
          footer={
            <Button
              type="primary"
              htmlType="button"
              className="!rounded-sm flex w-full"
              size="large"
              onClick={() => branchForm.submit()}
            >
              {isEditBranch ? "Save Changes" : "Create"}
            </Button>
          }
        >
          <Form layout="vertical" form={branchForm} onFinish={handleSubmit}>
            <Form.Item label="id" name="id" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item label="school_id" name="school_id" hidden>
              <Input hidden />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Enter Branch name" size="large" />
            </Form.Item>
            <Form.Item
              label="location"
              name="location"
              className="md:col-span-2"
            >
              <Input.TextArea
                rows={4}
                placeholder="Write branch address"
                size="large"
              />
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </div>
  );
};

export default Index;
