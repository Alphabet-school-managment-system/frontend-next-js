import { Select } from "@/components/common/Select";
import UserProfileInfo from "@/components/common/UserProfileInfo";

export enum AttendanceStatus {
  Present = "present",
  Absent = "absent",
  Excused = "excused",
}
export const useAttendance = () => {

  const getTableColumns = ({
    onStatusChange,
  }: {
    onStatusChange: (value: { id: string; status: AttendanceStatus }) => void;
  }): any[] => {
    return [
      {
        title: "Student Full Name",
        dataIndex: "full_name",
        key: "full_name",
        render: (_: string, record: any) => (
          <UserProfileInfo
            first_name={record?.first_name}
            last_name={record?.last_name}
            photoUrl={record?.photoUrl}
            link={`/ws/student/${record?.id}/detail`}
          />
        ),
      },
      {
        title: "Action Status",
        dataIndex: "action_status",
        key: "action_status",
        render: (val: string, record: any) => (
          <Select
            data={[
              { value: "present", text: "Present" },
              { value: "absent", text: "Absent" },
              { value: "excused", text: "Excused" },
            ]}
            placeholderText="Status"
            onChange={(value: any) => {
              onStatusChange({
                id: record?.id,
                status: value,
              });
            }}
            classNames="shadow-none focus:shadow-none outline-none bg-transparent min-w-[150px]"
          />
        ),
      },
    ];
  };

  return {
    getTableColumns,
    AttendanceStatus,
  };
};
