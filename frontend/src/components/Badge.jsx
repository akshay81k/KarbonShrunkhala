/**
 * Badge Component — Reusable Status Pill Component
 */
export function Badge({ children, variant = "default", className = "" }) {
  const getVariantStyles = () => {
    switch ((variant || "").toLowerCase()) {
      case "active":
      case "approved":
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "in verification":
      case "submitted":
      case "under_verification":
      case "under verification":
      case "pending":
      case "warning":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "rejected":
      case "error":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "credits issued":
      case "completed":
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "draft":
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getVariantStyles()} ${className}`}
    >
      {children}
    </span>
  );
}
