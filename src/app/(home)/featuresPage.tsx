"use client";
import { Card } from "antd";

export const Index = () => {
  const features = [
    {
      title: "User & Access Management",
      items: [
        "Student, Teacher & Parent Registration",
        "Role-based Access Control",
        "Authorization & Authentication",
      ],
    },
    {
      title: "Academic Management",
      items: [
        "Enrollment & Section Assignment",
        "Term & Timetable Management",
        "Attendance & Mark Recording",
      ],
    },
    {
      title: "Finance Management",
      items: [
        "Fee Collection & Expense Tracking",
        "Finance Summary & Archival",
      ],
    },
    {
      title: "Library Management",
      items: ["Book Registration & Lending", "Member Management & Returns"],
    },
    {
      title: "Behavior & HR Management",
      items: ["Conduct & Behavior Records", "Leave Request & Approval"],
    },
    {
      title: "Reports & Printing",
      items: [
        "Student ID Cards",
        "Certificates & Report Cards",
        "Class Rosters & Timetables",
      ],
    },
  ];

  return (
    <div className="p-6" id="features">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Core Features
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature) => (
          <Card
            key={feature.title}
            title={
              <span className="text-lg font-semibold text-gray-700">
                {feature.title}
              </span>
            }
            variant="outlined"
            className="shadow-sm rounded-xl transition hover:shadow-md"
          >
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {feature.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};
