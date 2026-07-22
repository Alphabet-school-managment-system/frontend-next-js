import { ExpenseType } from "@/app/ws/(finance)/expense/hook/useExpense";
import { Day } from "./enums";
import { AttendanceStatus } from "./enums";
import { BehaviorType } from "./enums";
import { FeeStatus } from "./enums";
import { Sex } from "./enums";
import { LeaveStatus } from "./enums";
import { ParentType } from "./enums";
import { StaffRole } from "./enums";
import { FeeType } from "@/app/ws/(finance)/fee/hook/useFee";
import { DrawerStyles } from "antd/es/drawer/DrawerPanel";
// import { User } from "better-auth/types";

export type selectType = {
  label: string;
  value: string | number | boolean | any;
};

export type AcademicYear = {
  id: string;
  branch_id: string | null;
  name: string;
  name_local?: string | null;
  start_date: Date | null;
  end_date: Date | null;
  enrollment_start: Date | null;
  enrollment_end: Date | null;
  term_id?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type Assessment = {
  _id: string;
  term_id?: string | null;
  section_id?: string | null;
  subject: string;
  max_score: number;
};

export type Attendance = {
  _id: string;
  student_id?: string | null;
  section_id?: string | null;
  date: Date;
  status: AttendanceStatus;
};

export type Behavior = {
  _id: string;
  student_id?: string | null;
  date?: Date | null;
  description?: string | null;
  type: BehaviorType;
};

export type Branch = {
  id?: string;
  school_id?: string | null;
  name: string;
  location?: string | null;
  isCurrent?: boolean | null;
  isDefault?: boolean | null;
};

export type ClassSection = {
  _id: string;
  branch_id?: string | null;
  class_name?: string | null;
  section_name?: string | null;
};

export type Enrollment = {
  id?: string | null;
  academic_year_id: string;
  student_id: string;
  grade: string;
  section?: string | null;
  stream?: stream;
  isTransferred: boolean;
  transferredFrom?: string | null;
  note?: string | null;
  student?: Student;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type Expense = {
  _id: string;
  academic_year_id?: string | null;
  description?: string | null;
  amount: number;
  date?: Date | null;
  type: ExpenseType;
  other_type?: ExpenseType;
  receipt?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type Fee = {
  _id: string;
  academic_year_id?: string | null;
  student_id?: string | null;
  amount: number;
  due_date?: Date | null;
  status: FeeStatus;
  type: FeeType;
  other_type?: FeeType;
  attachment?: string | null;
  note?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type FinanceSummary = {
  _id: string;
  full_name?: string | null;
  full_name_local?: string | null;
  gender?: Sex | null;
  ay_name?: string | null;
  ay_name_local?: string | null;
  total_fee?: number | null;
  total_expense?: number | null;
  net_balance?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type StudentLeaveRequest = {
  _id: string;
  student_id: string;
  reason: string;
  from_date: Date;
  to_date: Date;
};

export type StaffLeaveRequest = {
  _id: string;
  staff_id?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  reason?: string | null;
  status: LeaveStatus;
};

export type LibraryItem = {
  id: string;
  branch_id: string | null;
  title: string;
  author: string | null;
  item_type: string | null;
  subject: string | null;
  isbn?: string | null;
  copies_available?: number | null;
  note?: number | null;
  publication_date?: string | null;
};

export type LibraryTransaction = {
  id: string;
  item_id?: string | null;
  student_id?: string | null;
  teacher_id?: string | null;
  issue_date?: Date | null;
  return_date?: Date | null;
  status?: BorrowStatusType | null;
  note?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type Mark = {
  _id: string;
  student_id?: string | null;
  assessment_id?: string | null;
  score?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type ParentStudent = {
  id: string;
  student_id: string;
  parent_id: string;
  type: ParentType;
};

export type Parent = {
  id: string;
  better_auth_id?: string | null;
  first_name: string;
  middle_name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  sex?: Sex | null;
  note?: string | null;
  branch_id?: string | null;
};

export type School = {
  _id: string;
  name: string;
  address?: string | null;
  contact?: string | null;
  note?: string | null;
};

export type Staff = {
  _id: string;
  better_auth_id?: string | null;
  first_name: string;
  middle_name: string;
  sex?: Sex | null;
  phone?: string | null;
  email?: string | null;
  role: StaffRole;
  branch_id?: string | null;
};

export type StudentMarkSummary = {
  _id: string;
  full_name?: string | null;
  full_name_local?: string | null;
  gender?: Sex | null;
  ay_name?: string | null;
  ay_name_local?: string | null;
  subject?: string | null;
  total_score?: number | null;
  average_score?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type Student = {
  id: string;
  better_auth_id?: string | null;
  first_name: string;
  middle_name: string;
  last_name: string;
  full_name_local?: string | null;
  sex?: Sex | null;
  dob?: Date | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  note?: string | null;
  branch_id?: string | null;
  image?: string | null;
  student_registration_number?: string | null;
  user?: User;
};

export type StudentWithEnrollment = Student & {
  enrollment: Enrollment[];
  user: User;
};

export type Teacher = {
  id: string;
  better_auth_id: string;
  first_name: string;
  middle_name: string;
  phone: string;
  email: string;
  sex: Sex;
  subject_specialization: string;
  note?: string | null;
  image: string;
  branch_id?: string | null;
  user?: User;
};

export type Term = {
  _id: string;
  branch_id?: string | null;
  name: string;
  start_month?: number | null;
  end_month?: number | null;
};

export type Timetable = {
  id: string;
  academic_year_id: string;
  term?: string;
  grade: string;
  section: string;
  teacher_id: string;
  day: Day;
  period: number;
  note?: string | null;
};

export type levels_of_education =
  | "kg"
  | "0"
  | "lower_primary"
  | "middle_primary"
  | "upper_primary"
  | "secondary"
  | "college_prep";

export type stream = "Natural_Sciences" | "Social_Sciences" | "General";

export interface Setting {
  id: string;
  number_of_terms: number;
  sections_per_grade: number;
  levels_of_education: levels_of_education[];
  periods_per_day: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface User {
  id: String;
  name: String;
  email: String;
  emailVerified: Boolean;
  image?: String;
  createdAt: Date;
  updatedAt: Date;
  role?: String;
  banned?: Boolean;
  banReason?: String;
  banExpires?: Date;
}

export interface DrawerProps {
  title: string | React.ReactNode;
  isEdit?: boolean;
  onClose: () => void;
  form?: any;
  children: React.ReactNode;
  open: boolean;
  width?: number | string;
  buttonTitle?: string;
  buttonDanger?: boolean;
  loading?: boolean;
  footer?: React.ReactNode | null;
  styles?: DrawerStyles;
  className?: string;
}

export type UserType = "student" | "teacher" | "parent" | "staff";
export type BorrowStatusType = "returned" | "borrowed" | "reserved" | "lost";
