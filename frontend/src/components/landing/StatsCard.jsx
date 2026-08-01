export default function StatsCard({
    value,
    label,
    className = "",
    bordered = true,
}) {
    return (
        <div
            className={`flex flex-col justify-center ${bordered ? "border-r border-slate-200 pr-8" : ""
                } ${className}`}
        >
            <h3 className="font-['IBM_Plex_Sans'] text-5xl font-bold leading-none text-[#22A06B]">
                {value}
            </h3>

            <p className="mt-2 text-base text-slate-500">
                {label}
            </p>
        </div>
    );
}