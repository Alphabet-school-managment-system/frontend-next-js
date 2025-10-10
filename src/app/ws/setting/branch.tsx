import { Drawer } from "@/components/common/Drawer";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import {
  ConfirmationModalContext,
  ConfirmationModalPropsType,
  defaultConfirmationModalProps,
} from "@/store/confirmationModalContext";
import { Branch } from "@/types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Index = ({ onLoading }: { onLoading: (value: boolean) => void }) => {
  const apiRoute = "branch";

  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext
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
  const [schoolId, setSchoolId] = useState<string | undefined>(
    "a120f8c1-6da5-43b7-95d0-79ff888c0593"
  );

  const [branchForm] = Form.useForm();
  const { data, isLoading } = useApiQuery<Branch[]>(
    [`${apiRoute}/${schoolId}`],
    `${apiRoute}/${schoolId}`
  );

  const { mutate, isPending } = useApiMutation(
    [`${apiRoute}/${schoolId}`],
    isEditBranch
      ? `${apiRoute}/${branchForm.getFieldValue("id")}/update`
      : apiRoute,
    isEditBranch ? "PUT" : "POST"
  );

  const { mutate: Delete, isPending: deleting } = useApiMutation(
    [`${apiRoute}/${schoolId}`],
    `${apiRoute}/${id}/delete`,
    "DELETE"
  );

  useEffect(() => {
    if (isLoading || isPending || deleting) {
      onLoading(true);
    } else {
      setTimeout(() => {
        onLoading(false);
      }, 500);
    }
  }, [isLoading, isPending, deleting]);

  const handleSubmit = async (values: any) => {
    try {
      const payload = isEditBranch
        ? { ...values }
        : { ...values, school_id: schoolId };
      await mutate(
        { body: payload },
        {
          onSuccess: (res) => {
            handleDrawerClose();
          },
        }
      );
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
        }
      );
    } catch (error) {
      console.log("Item deletion error:", error);
    }
  };

  return (
    <div>
      <Card
        title="Branches"
        extra={
          <Button icon={<PlusOutlined />} onClick={() => setOpenDrawer(true)}>
            Add Branch
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          {data &&
            data.map((branch: Branch) => (
              <Col key={branch?.id} xs={24} sm={12} md={8}>
                <Card
                  size="small"
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        branchForm.setFieldsValue(branch);
                        setIsEditBranch(true);
                        setOpenDrawer(true);
                      }}
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() =>
                        setcmProps((prev: ConfirmationModalPropsType) => ({
                          ...prev,
                          show: true,
                          onOk: async () => {
                            await setId(branch?.id);
                            await handleDeleteBranch();
                          },
                        }))
                      }
                    />,
                  ]}
                >
                  <span className="block">{branch.name}</span>
                  <span>{branch.location}</span>
                </Card>
              </Col>
            ))}
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
