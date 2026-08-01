import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

export function CreditsPage() {
  const credits = [
    { tokenId: "KB-BLUE-2026-001", amount: "4,500 tCO₂e", tx: "0x8f2a...4b1c", status: "Active", date: "2026-07-28" },
    { tokenId: "KB-BLUE-2026-002", amount: "6,700 tCO₂e", tx: "0x3e1d...9f82", status: "Active", date: "2026-06-15" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Tokenized Carbon Credits Ledger
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Polygon Amoy Blockchain ERC-1155 Tokenized Blue Carbon Credits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100"><Award className="w-6 h-6 text-amber-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Total Credits Minted</span>
            <span className="font-heading text-2xl font-extrabold text-slate-900">11,200 tCO₂e</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100"><ShieldCheck className="w-6 h-6 text-emerald-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Polygon Smart Contract</span>
            <span className="font-mono text-xs font-bold text-emerald-700 block">0x71C...89B1 (Polygon Amoy)</span>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
              <th className="p-4">Token ID</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Blockchain Tx</th>
              <th className="p-4">Status</th>
              <th className="p-4">Issued Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {credits.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition">
                <td className="p-4 font-mono font-bold text-slate-900">{c.tokenId}</td>
                <td className="p-4 font-bold text-emerald-700">{c.amount}</td>
                <td className="p-4 font-mono text-slate-500 flex items-center gap-1">
                  {c.tx} <ExternalLink className="w-3 h-3 text-slate-400" />
                </td>
                <td className="p-4"><Badge variant="active">{c.status}</Badge></td>
                <td className="p-4 text-slate-500">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
