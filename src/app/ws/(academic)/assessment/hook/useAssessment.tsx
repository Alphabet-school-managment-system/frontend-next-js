import UserProfileInfo from "@/components/common/UserProfileInfo";

export const useAssessment = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Teacher Full Name",
        dataIndex: "teacher_full_name",
        key: "teacher_full_name",
        render: (_: string, record: any) => (
          <UserProfileInfo
            first_name={record?.first_name}
            last_name={record?.last_name}
            photoUrl={record?.photoUrl}
            link={`/ws/teacher/${record?.id}/detail`}
          />
        ),
      },
      {
        title: "Subject",
        dataIndex: "subject",
        key: "subject",
        render: (val: string) => <span className="text-sm">{val || "-"}</span>,
      },
      {
        title: "Sections",
        dataIndex: "sections",
        key: "sections",
        render: (sections: any[]) => (
          <span className="text-sm">
            {sections && sections.length > 0
              ? sections
                  .map(
                    (s) =>
                      s.classsection?.class_name +
                      " " +
                      s.classsection?.section_name
                  )
                  .join(", ")
              : "-"}
          </span>
        ),
      },
      {
        title: "Max Score",
        dataIndex: "max_score",
        key: "max_score",
        render: (val: number) => <span className="text-sm">{val ?? "-"}</span>,
      },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        render: (val: string) => (
          <span className="text-sm">
            {val ? new Date(val).toLocaleDateString() : "-"}
          </span>
        ),
      },
    ];
  };

  return {
    getTableColumns,
  };
};
