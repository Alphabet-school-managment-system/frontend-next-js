import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { staticImages } from "@/lib/static-images";
import { ConfirmationModalContext } from "@/store/confirmationModalContext";
import {
  Enrollment,
  Parent,
  ParentStudent,
  Student,
  StudentWithEnrollment,
} from "@/types";
import { useContext, useEffect, useMemo, useState } from "react";
import { Avatar, Button, Empty, List, Skeleton, Typography } from "antd";
import toast from "react-hot-toast";
import SearchInput from "@/components/common/SearchInput";
import UserProfileInfo from "@/components/common/UserProfileInfo";
import { Select } from "@/components/common/Select";
import { useUtils } from "@/hooks/useUtils";

const getFullName = (student?: Student) =>
  [student?.first_name, student?.middle_name, student?.last_name]
    .filter(Boolean)
    .join(" ") || "-";

const ParentStudentCardSkeleton = () => {
  return (
    <div className="flex h-full min-h-60 flex-col rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Skeleton.Avatar active size={72} shape="circle" />

        <div className="w-full min-w-0">
          <div className="flex flex-col items-center gap-2">
            <Skeleton.Input
              active
              size="small"
              style={{ width: "62%", height: 18 }}
            />
            <Skeleton.Input
              active
              size="small"
              style={{ width: "38%", height: 14 }}
            />
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <Skeleton.Input
              active
              size="small"
              style={{ width: "78%", height: 14 }}
            />
            <Skeleton.Input
              active
              size="small"
              style={{ width: "52%", height: 14 }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Skeleton.Button active size="small" style={{ width: 108 }} />
      </div>
    </div>
  );
};

const ParentStudentCard = ({ relation }: { relation: ParentStudent }) => {
  const { setConfirmationModalProps: setcmProps } = useContext(
    ConfirmationModalContext,
  );

  const { getGradeLabel } = useUtils();

  const { data: enrollment, isLoading: loadingEnrollment } =
    useApiQuery<Enrollment>(
      [`enrollment/${relation.student_id}`],
      `enrollment/${relation.student_id}`,
      Boolean(relation.student_id),
    );

  const { data: student, isLoading: loadingStudent } = useApiQuery<Student>(
    [`student/${enrollment?.student_id ?? ""}`],
    `student/${enrollment?.student_id}`,
    Boolean(enrollment?.student_id),
  );

  const { mutate: deleteRelation, isPending: deletingRelation } =
    useApiMutation(
      ["parent-student", relation.parent_id],
      `parent-student/${relation.id}/delete`,
      "DELETE",
    );

  const defaultPhoto =
    student?.sex === "Female"
      ? staticImages.noPhotoGirlImg
      : staticImages.noPhotoBoyImg;

  const handleDelete = () => {
    setcmProps((prev) => ({
      ...prev,
      show: true,
      title: "Remove Student",
      content: `Remove ${getFullName(student)} from this parent?`,
      okButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      onOk: () => {
        deleteRelation({ body: undefined });
      },
      onCancel: () => {},
    }));
  };

  return (
    <List.Item
      key={student?.id}
      actions={[
        <Button
          key="remove"
          type="default"
          danger
          onClick={handleDelete}
          loading={deletingRelation}
        >
          Remove
        </Button>,
      ]}
      className="bg-gray-50 p-3! rounded-lg"
    >
      <List.Item.Meta
        avatar={<Avatar size={50} src={student?.image || defaultPhoto.src} />}
        title={
          <span>
            {`STU-${String(student?.student_registration_number).padStart(6, "0")}`}
          </span>
        }
        description={
          <div className="flex flex-col gap-1 text-sm text-gray-600">
            <span className="font-semibold text-gray-700 uppercase">
              {getFullName(student)}
            </span>
            <span className="font-semibold">
              {`${getGradeLabel(Number(enrollment?.grade) || 0)}${
                enrollment?.section ? ` - ${enrollment.section}` : ""
              }`}
            </span>
          </div>
        }
      />
    </List.Item>
  );
};

export const ParentChildrenDrawer = ({ parent }: { parent?: Parent }) => {
  const [selectedStudent, setSelectedStudent] = useState<
    StudentWithEnrollment | undefined
  >();
  const [parentType, setParentType] = useState<string | undefined>(undefined);
  const [lookingUpEnrollment, setLookingUpEnrollment] = useState(false);

  const parentChildrenKey = parent?.id
    ? ["parent-student", parent.id]
    : ["parent-student", "empty"];

  const {
    data: parentStudents = [],
    isLoading: loadingChildren,
    isFetching: fetchingChildren,
  } = useApiQuery<ParentStudent[]>(
    parentChildrenKey,
    parent ? `parent-student/search?parent_id=${parent.id}` : "",
    Boolean(parent?.id),
  );

  const { mutate: addRelation, isPending: addingRelation } = useApiMutation(
    parentChildrenKey,
    "parent-student",
    "POST",
  );

  useEffect(() => {
    setSelectedStudent(undefined);
  }, [parent?.id]);

  const handleAddStudent = async () => {
    if (!parent?.id) return;

    if (!selectedStudent?.id)
      return toast.error("Please select the student first.");
    if (!parentType) return toast.error("Please select the parent type first.");

    try {
      setLookingUpEnrollment(true);

      const alreadyLinked = parentStudents.some(
        (relation) =>
          relation.student_id === selectedStudent?.enrollment[0]?.id,
      );

      if (alreadyLinked) {
        toast.error("This student is already linked to the parent.");
        return;
      }

      addRelation(
        {
          body: {
            parent_id: parent.id,
            student_id: selectedStudent?.enrollment[0]?.id,
            type: parentType || "Guardian",
          },
        },
        {
          onSuccess: () => {
            setSelectedStudent(undefined);
          },
        },
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to add student.",
      );
    } finally {
      setLookingUpEnrollment(false);
    }
  };

  const isBusy =
    loadingChildren ||
    fetchingChildren ||
    lookingUpEnrollment ||
    addingRelation;

  const subTitle = useMemo(() => {
    const enrollment = selectedStudent?.enrollment?.[0];

    if (!enrollment) return undefined;

    const grade = enrollment.grade ? `${enrollment.grade}` : "";
    const section = enrollment.section ? `(${enrollment.section})` : "";

    return [grade, section].filter(Boolean).join(" - ") || undefined;
  }, [selectedStudent]);

  const parentTypeOptions = [
    { label: "Guardian", value: "Guardian" },
    { label: "Father", value: "Father" },
    { label: "Mother", value: "Mother" },
    { label: "Other", value: "Other" },
    { label: "Brother", value: "Brother" },
    { label: "Sister", value: "Sister" },
    { label: "Aunt", value: "Aunt" },
    { label: "Uncle", value: "Uncle" },
  ];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            Search for a student, then add them to this parent.
          </p>
        </div>

        {/* search student form */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchInput
              queryKeys={["first_name", "middle_name", "last_name"]}
              apiRoute="student"
              placeholder="Search student by name, email, or phone"
              suffixIcon={<div />}
              onSelect={(value) =>
                setSelectedStudent(value as StudentWithEnrollment)
              }
              onClear={() => setSelectedStudent(undefined)}
              size="middle"
            />
          </div>

          <Button
            type="primary"
            className="h-10"
            onClick={handleAddStudent}
            loading={lookingUpEnrollment || addingRelation}
            disabled={!selectedStudent?.id || !parent?.id}
          >
            Add Student
          </Button>
        </div>

        {selectedStudent && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-white p-3 shadow-sm">
            <div className="min-w-0">
              <UserProfileInfo
                full_name={`${selectedStudent?.first_name} ${selectedStudent?.middle_name}`}
                subTitle={subTitle}
                photoUrl={selectedStudent?.image ?? ""}
                sex={
                  selectedStudent?.sex?.toLowerCase() as
                    | "male"
                    | "female"
                    | undefined
                }
                link={undefined}
              />
            </div>
            <div>
              <Select
                placeholderText="Select relationship type"
                value={
                  parentStudents.find(
                    (relation) =>
                      relation.student_id ===
                      selectedStudent?.enrollment?.[0]?.id,
                  )?.type
                }
                onChange={(value) => {
                  setParentType(value);
                }}
                classNames="min-w-[200px]"
                data={parentTypeOptions}
              />
            </div>
            <div>
              <Button
                type="text"
                onClick={() => {
                  setSelectedStudent(undefined);
                  setParentType(undefined);
                }}
                danger
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="mb-3 flex items-center justify-between">
          <Typography.Title level={5} className="mb-0! mt-0!">
            Linked Students
          </Typography.Title>
          <span className="text-sm text-gray-500">
            {parentStudents.length} total
          </span>
        </div>

        {isBusy && parentStudents.length === 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ParentStudentCardSkeleton key={index} />
            ))}
          </div>
        ) : parentStudents.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8">
            <Empty description="No students are linked to this parent yet." />
          </div>
        ) : (
          <div className="">
            <List
              itemLayout="horizontal"
              dataSource={parentStudents}
              renderItem={(student) => (
                <ParentStudentCard key={student.id} relation={student} />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};
