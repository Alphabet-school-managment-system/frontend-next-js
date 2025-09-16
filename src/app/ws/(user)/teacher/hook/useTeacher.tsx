import UserProfileInfo from "@/components/common/UserProfileInfo";
import { Icon } from "@iconify-icon/react";

export const useTeacher = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Full Name",
        dataIndex: "teacher",
        key: "teacher",
        render: (_: string, record: any) => (
          <UserProfileInfo
            first_name={record?.first_name}
            last_name={record?.last_name}
            photoUrl={record?.photoUrl}
            link={`/ws/teacher-detail/${record?.id}`}
          />
        ),
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
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
        render: (val: string) => (
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:email"
              width={20}
              height={20}
              className="text-gray-700"
            />
            <span className="text-sm">{val || "-"}</span>
          </div>
        ),
      },
      {
        title: "Subject Specialization",
        dataIndex: "subject_specialization",
        key: "subject_specialization",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  return {
    getTableColumns,
  };
};
