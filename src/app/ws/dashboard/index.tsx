import { Counts } from "./counts";
import { Chart } from "./chart";
import { useApiQuery } from "@/hooks/useApi";

const Index = () => {
  const schoolId: string = "17fcb7f4-b7a7-4666-9ef5-5afbc1be8969";

  const { data, isLoading } = useApiQuery<{
    maleStudents: number;
    femaleStudents: number;
    teachers: number;
    attendanceToday: number;
    expenseData: number[];
    feeData: number[];
  }>([`dashboard/${schoolId}`], `dashboard/${schoolId}`);

  return (
    <div className="flex flex-col justify-between">
      <Counts
        maleStudents={data?.maleStudents}
        femaleStudents={data?.femaleStudents}
        teachers={data?.teachers}
        attendanceToday={data?.attendanceToday}
      />
      <div className="flex justify-between mt-4">
        <Chart
          type={"bar"}
          HeaderText={"Yearly Expense Summary"}
          legendText={"Monthly Expense"}
          data={data?.expenseData}
        />
        <Chart
          type={"line"}
          HeaderText={"Yearly Collected Fees Summary"}
          legendText={"Monthly fees"}
          data={data?.expenseData}
        />
      </div>
    </div>
  );
};

export default Index;
