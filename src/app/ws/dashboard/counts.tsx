import { Card } from "antd";
import { Icon } from "@iconify-icon/react";

export const Counts = ({
  maleStudents,
  femaleStudents,
  teachers,
  attendanceToday,
}: {
  maleStudents?: number;
  femaleStudents?: number;
  teachers?: number;
  attendanceToday?: number;
}) => {
  const stats = [
    {
      label: "Students (Male)",
      value: maleStudents,
      icon: <Icon icon="fa:male" width="50" height="50" color="#101828" />,
    },
    {
      label: "Students (Female)",
      value: femaleStudents,
      icon: <Icon icon="fa:female" width="50" height="50" color="#101828" />,
    },
    {
      label: "Teachers",
      value: teachers,
      icon: <Icon icon="mdi:teacher" width="50" height="50" color="#101828" />,
    },
    {
      label: "Today Attendance",
      value: attendanceToday,
      icon: (
        <Icon
          icon="mdi:clipboard-check"
          width="50"
          height="50"
          color="#101828"
        />
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center gap-4">
        {stats.map((item, i) => (
          <Card key={i} className="w-full min-h-4" variant="borderless">
            <div className="flex items-center gap-4">
              <span className="rounded-md p-3 bg-gray-100 flex justify-center items-center">
                {item.icon}
              </span>
              <div className="flex flex-col">
                <span className="block text-lg text-gray-800 font-semiBold">
                  {item.label}
                </span>
                <span className="text-4xl text-gray-800 font-bold">
                  {item.value}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
