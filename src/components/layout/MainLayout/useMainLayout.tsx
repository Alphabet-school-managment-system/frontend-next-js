import { Icon } from "@iconify-icon/react";
import { ReactElement } from "react";
export type MenuItem = {
  key: string;
  icon: ReactElement;
  label: string;
  path: string;
  role?: string;
  description?: string; // 👈 new
};

export type NavigationItem = MenuItem & {
  children?: MenuItem[];
};

export const useMainLayout = () => {
  const navItems: NavigationItem[] = [
    {
      key: "dashboard",
      icon: <Icon icon="material-symbols:dashboard" width={24} height={24} />,
      label: "Dashboard",
      path: "/ws/dashboard",
      description: "Overview of key metrics and activities",
    },
    {
      key: "academics",
      icon: <Icon icon="mdi:school-outline" width={24} height={24} />,
      label: "Academics",
      path: "#",
      description: "Manage academic operations",
      children: [
        {
          key: "assessment",
          icon: <Icon icon="mdi:file-document-edit-outline" width={22} height={22} />,
          label: "Assessment",
          path: "/ws/assessment",
          description: "Create and manage student assessments",
        },
        {
          key: "attendance",
          icon: <Icon icon="mdi:clipboard-check-outline" width={22} height={22} />,
          label: "Attendance",
          path: "/ws/attendance",
          description: "Track student attendance records",
        },
        {
          key: "class-section",
          icon: <Icon icon="mdi:account-multiple-outline" width={22} height={22} />,
          label: "Class Section",
          path: "/ws/class-section",
          description: "Organize students into classes and sections",
        },
        {
          key: "enrollment",
          icon: <Icon icon="mdi:calendar-plus" width={22} height={22} />,
          label: "Enrollment",
          path: "/ws/enrollment",
          description: "Enroll students for academic sessions",
        },
        {
          key: "timetable",
          icon: <Icon icon="mdi:calendar-clock" width={22} height={22} />,
          label: "Timetable",
          path: "/ws/timetable",
          description: "Schedule classes and subjects",
        },
        {
          key: "academic-year",
          icon: <Icon icon="mdi:calendar-range" width={22} height={22} />,
          label: "Academic Year",
          path: "/ws/academic-year",
          description: "Manage academic years",
        },
        {
          key: "term",
          icon: <Icon icon="mdi:calendar-month-outline" width={22} height={22} />,
          label: "Term",
          path: "/ws/term",
          description: "Define academic terms",
        },
        {
          key: "mark-entry",
          icon: <Icon icon="mdi:check-decagram-outline" width={22} height={22} />,
          label: "Mark Entry",
          path: "/ws/mark",
          description: "Enter student marks",
        },
        {
          key: "mark-archive",
          icon: <Icon icon="mdi:archive-outline" width={22} height={22} />,
          label: "Mark Archive",
          path: "/ws/mark-archive",
          description: "Archive student marks",
        },
        {
          key: "behavior",
          icon: <Icon icon="mdi:emoticon-outline" width={22} height={22} />,
          label: "Behavior",
          path: "/ws/behavior",
          description: "Record and track student behavior",
        },
        {
          key: "leave-request",
          icon: <Icon icon="mdi:calendar-alert" width={22} height={22} />,
          label: "Leave Request",
          path: "/ws/leave-request",
          description: "Manage student leave requests",
        },
      ],
    },
    {
      key: "finance",
      icon: <Icon icon="mdi:currency-usd" width={24} height={24} />,
      label: "Finance",
      path: "#",
      description: "Manage financial records",
      children: [
        {
          key: "expense",
          icon: <Icon icon="mdi:cash-minus" width={22} height={22} />,
          label: "Expense",
          path: "/ws/expense",
          description: "Track school expenses",
        },
        {
          key: "fee",
          icon: <Icon icon="mdi:cash-plus" width={22} height={22} />,
          label: "Fee",
          path: "/ws/fee",
          description: "Manage student fee payments",
        },
        {
          key: "finance-archive",
          icon: <Icon icon="mdi:archive" width={22} height={22} />,
          label: "Finance Archive",
          path: "/ws/finance-archive",
          description: "Archive past financial records",
        },
      ],
    },
    {
      key: "library",
      icon: <Icon icon="mdi:bookshelf" width={24} height={24} />,
      label: "Library",
      path: "#",
      description: "Manage library resources",
      children: [
        {
          key: "library-books",
          icon: <Icon icon="mdi:book-open-page-variant" width={22} height={22} />,
          label: "Books",
          path: "/ws/library-book",
          description: "Catalog and manage books",
        },
        {
          key: "library-transaction",
          icon: <Icon icon="mdi:book-check-outline" width={22} height={22} />,
          label: "Transactions",
          path: "/ws/library-transaction",
          description: "Track book issues and returns",
        },
      ],
    },
    {
      key: "people",
      icon: <Icon icon="mdi:account-group-outline" width={24} height={24} />,
      label: "People",
      path: "#",
      description: "Manage users in the system",
      children: [
        {
          key: "parent",
          icon: <Icon icon="mdi:account-tie" width={22} height={22} />,
          label: "Parents",
          path: "/ws/parent",
          description: "Manage parent records",
        },
        {
          key: "staff",
          icon: <Icon icon="mdi:account-badge-outline" width={22} height={22} />,
          label: "Staff",
          path: "/ws/staff",
          description: "Manage staff details",
        },
        {
          key: "student",
          icon: <Icon icon="mdi:account-school-outline" width={22} height={22} />,
          label: "Students",
          path: "/ws/student",
          description: "Manage student records",
        },
        {
          key: "teacher",
          icon: <Icon icon="mdi:account-tie-outline" width={22} height={22} />,
          label: "Teachers",
          path: "/ws/teacher",
          description: "Manage teacher records",
        },
      ],
    },
    {
      key: "settings",
      icon: <Icon icon="mdi:cog-outline" width={24} height={24} />,
      label: "Settings",
      path: "#",
      description: "Configure system settings",
      children: [
        {
          key: "branch",
          icon: <Icon icon="mdi:source-branch" width={22} height={22} />,
          label: "Branch",
          path: "/ws/branch",
          description: "Manage school branches",
        },
        {
          key: "school",
          icon: <Icon icon="mdi:office-building" width={22} height={22} />,
          label: "School",
          path: "/ws/school",
          description: "Manage school information",
        },
      ],
    },
  ];

  return { navItems };
};

