import StatusIndicator from "@/components/common/StatusIndicator";
import UserProfileInfo from "@/components/common/UserProfileInfo";
import { Icon } from "@iconify-icon/react";

export const useStudent = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "User",
        dataIndex: "user",
        key: "user",
        render: (_: string, record: any) => (
          <UserProfileInfo
            first_name={record?.first_name}
            last_name={record?.last_name}
            photoUrl={record?.photoUrl}
            link={`/ws/student-detail/${record?._id}`}
          />
        ),
      },
      {
        title: "Phone #",
        dataIndex: "phone",
        key: "phone",
        render: (_: string, record: any) => (
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:phone"
              width={25}
              height={25}
              className="text-gray-700"
            />
            <span className="text-sm">{record?.phone}</span>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (_: string, record: any) => (
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:email"
              width={25}
              height={25}
              className="text-gray-700"
            />
            <span className="text-sm">{record?.email}</span>
          </div>
        ),
      },
      {
        title: "Account status",
        dataIndex: "status",
        key: "status",
        render: (_: string, record: any) => {
          return <StatusIndicator status={record?.status} />;
        },
      },
    ];
  };

  return {
    getTableColumns,
  };
};
