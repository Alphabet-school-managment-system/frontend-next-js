import { Icon } from "@iconify-icon/react";
import { ReactElement } from "react";
export type MenuItem = {
  key: string;
  icon: ReactElement;
  label: string;
  path: string;
  role?: string;
  description?: string;
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
          key: "assign-student-section",
          icon: <Icon icon="mdi:account-group" width={22} height={22} />,
          label: "Assign Student Section",
          path: "/ws/assign-student-section",
          description: "Assign selected students to a class section",
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
          icon: (
            <Icon icon="mdi:book-open-page-variant" width={22} height={22} />
          ),
          label: "Books",
          path: "/ws/library-item",
          description: "Catalog and manage books",
        },
        {
          key: "library-item-loan",
          icon: <Icon icon="mdi:book-check-outline" width={22} height={22} />,
          label: "Transactions",
          path: "/ws/library-item-loan",
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
          icon: (
            <Icon icon="mdi:account-badge-outline" width={22} height={22} />
          ),
          label: "Staff",
          path: "/ws/staff",
          description: "Manage staff details",
        },
        {
          key: "student",
          icon: (
            <Icon icon="mdi:account-school-outline" width={22} height={22} />
          ),
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
      key: "Archives",
      icon: <Icon icon="mdi:archive" width={24} height={24} />,
      label: "Archives",
      path: "#",
      description: "Manage Archival records of ...",
      children: [
        {
          key: "finance-archive",
          icon: <Icon icon="tabler:cash" width={22} height={22} />,
          label: "Finance",
          path: "/ws/finance-archive",
          description: "Archive past financial records",
        },
        {
          key: "mark-archive",
          icon: <Icon icon="hugeicons:ai-sheets" width={22} height={22} />,
          label: "Mark",
          path: "/ws/mark-archive",
          description: "Archive student marks",
        },
      ],
    },
    {
      key: "setting",
      icon: <Icon icon="mdi:cog-outline" width={24} height={24} />,
      label: "Settings",
      path: "/ws/setting",
      description: "Configure system settings",
    },
  ];

  return { navItems };
};
