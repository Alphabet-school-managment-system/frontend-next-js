import UserProfileInfo from "@/components/common/UserProfileInfo";
import { Icon } from "@iconify-icon/react";

export const useStudent = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Full Name",
        dataIndex: "student",
        key: "student",
        render: (_: string, record: any) => (
          <UserProfileInfo
            first_name={record?.first_name}
            last_name={record?.last_name}
            photoUrl={record?.photoUrl}
            link={`/ws/student-detail/${record?.id}`}
          />
        ),
      },
      {
        title: "Full Name (Local language)",
        dataIndex: "full_name_local",
        key: "full_name_local",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Sex",
        dataIndex: "gender",
        key: "gender",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Date of Birth",
        dataIndex: "dob",
        key: "dob",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
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
              width={20}
              height={20}
              className="text-gray-700"
            />
            <span className="text-sm">{record?.phone || "-"}</span>
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
              width={20}
              height={20}
              className="text-gray-700"
            />
            <span className="text-sm">{record?.email || "-"}</span>
          </div>
        ),
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  return {
    getTableColumns,
  };
};
