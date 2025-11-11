import UserProfileInfo from "@/components/common/UserProfileInfo";

export const useLeaveRequest = () => {
  const getTableColumns = (userType: "student" | "teacher"): any[] => {
    return [
      {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
        render: (_: string, record: any) => (
          <UserProfileInfo
            full_name={`${record?.first_name} ${record?.middle_name} ${record?.last_name}`}
            photoUrl={record?.photoUrl}
            link={`/ws/${userType}/${record?.id}/detail`}
          />
        ),
      },
      {
        title: "When",
        dataIndex: "date",
        key: "date",
        render: (val: string, record: any) => (
          <span className="text-sm">
            {`${new Date(record?.start_date).toLocaleDateString()} - ${new Date(
              record?.end_date
            ).toLocaleDateString()}`}
          </span>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
    ];
  };

  return {
    getTableColumns,
  };
};
