import { Counts } from "./counts";
import { Chart } from "./chart";
import { useApiQuery } from "@/hooks/useApi";
import { useContext } from "react";
import { IdsContext } from "@/store/idsContext";

const Index = () => {
  const { Ids } = useContext(IdsContext);

  const { data, isLoading } = useApiQuery<{
    maleStudents: number;
    femaleStudents: number;
    teachers: number;
    attendanceToday: number;
    expenseData: number[];
    feeData: number[];
  }>([`dashboard/${Ids?.schoolId}`], `dashboard/${Ids?.schoolId}`);

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
