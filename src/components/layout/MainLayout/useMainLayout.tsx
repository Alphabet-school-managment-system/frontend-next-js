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
      key: "academic",
      icon: <Icon icon="mdi:school-outline" width={24} height={24} />,
      label: "Academic",
      path: "#",
      description: "Manage academic operations",
      children: [
        {
          key: "enrollment",
          icon: <Icon icon="mdi:calendar-plus" width={22} height={22} />,
          label: "Manage Enrollment",
          path: "/ws/enrollment",
          description: "Enroll students for academic sessions",
        },
        {
          key: "assign-student-section",
          icon: <Icon icon="mdi:account-group" width={22} height={22} />,
          label: "Manage Student Assignment",
          path: "/ws/assign-student-section",
          description: "Assign selected students to a class section",
        },
        {
          key: "timetable",
          icon: <Icon icon="mdi:calendar-clock" width={22} height={22} />,
          label: "Manage Class Schedule",
          path: "/ws/timetable",
          description: "Schedule classes and subjects",
        },
      ],
    },
    {
      key: "finance",
      icon: <Icon icon="mdi:currency-usd-circle" width={24} height={24} />,
      label: "Finance",
      path: "#",
      description: "Manage financial records",
      children: [
        {
          key: "Manage Expense",
          icon: <Icon icon="mdi:cash-minus" width={22} height={22} />,
          label: "Manage Expense",
          path: "/ws/expense",
          description: "Track school expenses",
        },
        {
          key: "fee",
          icon: <Icon icon="mdi:cash-plus" width={22} height={22} />,
          label: "Manage Student Fee",
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
          label: "Manage Items",
          path: "/ws/library-item",
          description: "Catalog and manage libraray Items",
        },
        {
          key: "library-item-loan",
          icon: <Icon icon="mdi:book-check-outline" width={22} height={22} />,
          label: "Manage Item Borrow",
          path: "/ws/library-item-loan",
          description: "Track book issues and returns",
        },
      ],
    },
    {
      key: "management",
      icon: <Icon icon="mdi:account-group-outline" width={24} height={24} />,
      label: "Management",
      path: "#",
      description: "Manage users in the system",
      children: [
        {
          key: "manage_parent",
          icon: <Icon icon="mdi:account-tie" width={22} height={22} />,
          label: "Manage Parents",
          path: "/ws/parent",
          description: "Manage parent records",
        },
        {
          key: "manage_staff",
          icon: (
            <Icon icon="mdi:account-badge-outline" width={22} height={22} />
          ),
          label: "Manage Staffs",
          path: "/ws/staff",
          description: "Manage staff details",
        },
        {
          key: "manage_student",
          icon: (
            <Icon icon="mdi:account-school-outline" width={22} height={22} />
          ),
          label: "Manage Students",
          path: "/ws/student",
          description: "Manage student records",
        },
        {
          key: "manage_teacher",
          icon: <Icon icon="mdi:account-tie-outline" width={22} height={22} />,
          label: "Manage Teachers",
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
          label: "Browse Finance Summary",
          path: "/ws/finance-archive",
          description: "Archive past financial records",
        },
        {
          key: "mark-archive",
          icon: <Icon icon="hugeicons:ai-sheets" width={22} height={22} />,
          label: "Browse cumulative Mark",
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
