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
    { label: "Students (Male)", value: maleStudents, icon: "fa:male" },
    {
      label: "Students (Female)",
      value: femaleStudents,
      icon: "fa:female",
    },
    { label: "Teachers", value: teachers, icon: "mdi:teacher" },
    {
      label: "Today Attendance",
      value: attendanceToday,
      icon: "mdi:clipboard-check",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center gap-4">
        {stats.map((item, i) => (
          <Card key={i} className="w-full min-h-4" variant="borderless">
            <div className="flex items-center gap-4">
              <span className="rounded-md p-3 bg-gray-100 flex justify-center items-center">
                <Icon icon={item.icon} width="50" height="50" color="#101828" />
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
