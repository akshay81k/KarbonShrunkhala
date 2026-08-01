import { ShieldCheck } from "lucide-react";

export default function Badge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
      <ShieldCheck
        size={16}
        className="text-[#22A06B]"
      />

      <span className="text-sm font-medium text-[#22A06B]">
        Transparent • Verifiable • Impactful
      </span>
    </div>
  );
}