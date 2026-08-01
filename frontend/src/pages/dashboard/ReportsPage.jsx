import { Card } from "../../components/Card";
import { FileSpreadsheet, Download, Calendar } from "lucide-react";

export function ReportsPage() {
  const reports = [
    { title: "Quarterly Blue Carbon Sequestration Audit — Q2 2026", date: "2026-07-01", credits: "4,500 tCO₂e" },
    { title: "Annual Mangrove Canopy Density & Biomass Report 2025", date: "2025-12-31", credits: "10,900 tCO₂e" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Generated MRV Audit Reports
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Formal Sequestration &amp; Environmental Audit Summaries
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((r, i) => (
          <Card key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><FileSpreadsheet className="w-5 h-5 text-blue-600" /></div>
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">{r.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Generated {r.date} — Verified Carbon Impact: <strong className="text-emerald-600">{r.credits}</strong>
                </p>
              </div>
            </div>
            <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
