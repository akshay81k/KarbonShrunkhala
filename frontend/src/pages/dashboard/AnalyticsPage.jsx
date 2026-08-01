import { Card } from "../../components/Card";
import { LineChart, Globe, Award, TrendingUp } from "lucide-react";

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          National Platform Analytics
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Aggregate Blue Carbon Sequestration &amp; Impact Metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100"><Globe className="w-5 h-5 text-emerald-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Total Area Restored</span>
            <span className="font-heading text-xl font-extrabold text-slate-900">12,450 Hectares</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><Award className="w-5 h-5 text-blue-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Total Credits Issued</span>
            <span className="font-heading text-xl font-extrabold text-slate-900">145,600 tCO₂e</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-100"><TrendingUp className="w-5 h-5 text-teal-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">National NDVI Health</span>
            <span className="font-heading text-xl font-extrabold text-slate-900">+28.4% Average</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
