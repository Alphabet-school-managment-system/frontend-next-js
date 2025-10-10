export const useFinanceArchive = () => {
  const getTableColumns = (): any[] => {
    return [
      {
        title: "Academic Year",
        dataIndex: "ay_name",
        key: "ay_name",
        render: (val: string, record: any) => (
          <span className="text-sm">
            {`${record?.ay_name} (${record?.ay_name_local})` || "-"}
          </span>
        ),
      },
      {
        title: "Total Fee",
        dataIndex: "total_fee",
        key: "total_fee",
        render: (val: number) => (
          <span className="text-sm">
            {val !== null && val !== undefined ? val : "-"}
          </span>
        ),
      },
      {
        title: "Total Expense",
        dataIndex: "total_expense",
        key: "total_expense",
        render: (val: number) => (
          <span className="text-sm">
            {val !== null && val !== undefined ? val : "-"}
          </span>
        ),
      },
      {
        title: "Net Balance",
        dataIndex: "net_balance",
        key: "net_balance",
        render: (val: number) => (
          <span className="text-sm">
            {val !== null && val !== undefined ? val : "-"}
          </span>
        ),
      },
    ];
  };

  return {
    getTableColumns,
  };
};
