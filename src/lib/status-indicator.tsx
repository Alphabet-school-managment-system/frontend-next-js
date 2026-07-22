type StatusIndicatorProps = {
  status?: string | null;
  className?: string;
};

export const getStatusConfig = (status?: string | null) => {
  switch (status?.toLowerCase()) {
    case "active":
      return {
        label: "Active",
        textClass: "text-green-700",
        bgClass: "bg-green-100",
      };
    case "inactive":
      return {
        label: "Inactive",
        textClass: "text-gray-500",
        bgClass: "bg-gray-200",
      };
    case "suspended":
      return {
        label: "Suspended",
        textClass: "text-yellow-700",
        bgClass: "bg-yellow-100",
      };
    case "deleted":
      return {
        label: "Deleted",
        textClass: "text-red-600",
        bgClass: "bg-red-100",
      };
    case "requested":
      return {
        label: "Pending",
        textClass: "text-blue-500",
        bgClass: "bg-blue-200",
      };
    case "accepted":
      return {
        label: "Accepted",
        textClass: "text-green-900",
        bgClass: "bg-green-200",
      };
    case "rejected":
      return {
        label: "Rejected",
        textClass: "text-red-900",
        bgClass: "bg-red-200",
      };
    case "ongoing":
      return {
        label: "Started",
        textClass: "text-yellow-900",
        bgClass: "bg-yellow-200",
      };
    case "completed":
      return {
        label: "Completed",
        textClass: "text-green-900",
        bgClass: "bg-green-200",
      };
    case "canceled":
      return {
        label: "Canceled",
        textClass: "text-red-900",
        bgClass: "bg-red-200",
      };
    case "returned":
      return {
        label: "Returned",
        textClass: "text-green-700",
        bgClass: "bg-green-100",
      };
    case "lost":
      return {
        label: "Lost",
        textClass: "text-red-700",
        bgClass: "bg-red-100",
      };
    default:
      return {
        label: status ?? "Unknown",
        textClass: "text-gray-500",
        bgClass: "bg-gray-200",
      };
  }
};

const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  const { label, textClass, bgClass } = getStatusConfig(status);

  return (
    <div
      className={`rounded px-2 py-1 text-center ${bgClass} ${className ?? ""}`.trim()}
    >
      <span className={`font-semibold text-sm capitalize ${textClass}`}>
        {label}
      </span>
    </div>
  );
};

export default StatusIndicator;
