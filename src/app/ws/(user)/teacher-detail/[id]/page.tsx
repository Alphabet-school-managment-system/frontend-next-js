"use client";

import { useApiQuery } from "@/hooks/useApi";
import { Teacher } from "@/types";
import { Card, Descriptions, Button, Spin, Tag } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useTeacher } from "../../teacher/hook/useTeacher";

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { get_speciality_label } = useTeacher();
  const teacherId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: teacher, isLoading } = useApiQuery<Teacher>(
    [],
    `teacher/${teacherId}`,
    Boolean(teacherId)
  );

  const fullName = teacher
    ? `${teacher.first_name} ${teacher.last_name}`.trim()
    : "Teacher profile";

  return (
    <Spin spinning={isLoading}>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{fullName}</h1>
            <p className="text-sm text-gray-500">
              View teacher information and jump to editing if needed.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => router.back()}>Back</Button>
            <Button
              type="primary"
              onClick={() => router.push(`/ws/teacher/${teacherId}/update`)}
            >
              Edit teacher
            </Button>
          </div>
        </div>

        <Card className="shadow-sm">
          <Descriptions
            bordered
            column={1}
            size="middle"
            items={[
              {
                key: "name",
                label: "Name",
                children: fullName,
              },
              {
                key: "phone",
                label: "Phone",
                children: teacher?.phone || "-",
              },
              {
                key: "email",
                label: "Email",
                children: teacher?.email || "-",
              },
              {
                key: "subject",
                label: "Subject Specialization",
                children: teacher?.subject_specialization ? (
                  <Tag color="blue">
                    {get_speciality_label(teacher.subject_specialization)}
                  </Tag>
                ) : (
                  "-"
                ),
              },
              {
                key: "note",
                label: "Note",
                children: teacher?.note || "-",
              },
              {
                key: "branch",
                label: "Branch ID",
                children: teacher?.branch_id || "-",
              },
            ]}
          />
        </Card>
      </div>
    </Spin>
  );
}
