import { Card } from "../../components/Card";
import { MessageSquare, Send } from "lucide-react";

export function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Verifier Communication &amp; Messages
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Direct messaging channel with NCCR Verifiers and MoES Representatives
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900">Dr. Vikram Seth (NCCR Lead Verifier)</h3>
            <p className="text-xs text-slate-400">Re: Sundarbans Delta Boundary Verification</p>
          </div>
        </div>

        <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-slate-700"><strong>NCCR Verifier:</strong> GeoJSON spatial boundary verified against Sentinel-2 spectral imagery. Approved for credit tokenization calculation.</p>
          <span className="text-[10px] text-slate-400">July 28, 2026 at 14:32 PM</span>
        </div>

        <div className="flex gap-2">
          <input type="text" placeholder="Type response..." className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
          <button className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"><Send className="w-3.5 h-3.5" /> Send</button>
        </div>
      </Card>
    </div>
  );
}
