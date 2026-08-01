/**
 * Card Component
 * Reusable surface container for metrics, charts, tables, and widgets.
 */
export function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs ${
        hover ? "card-hover" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
