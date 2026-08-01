import { Card } from "../../components/Card";
import { LineChart, Globe, RefreshCw, Activity, Layers } from "lucide-react";

export function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Satellite Monitoring &amp; NDVI Analytics
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Google Earth Engine Sentinel-2 Multispectral Vegetation Index Data
          </p>
        </div>
        <button className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer w-fit">
          <RefreshCw className="w-3.5 h-3.5" /> Sync Sentinel Feed
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100"><LineChart className="w-5 h-5 text-emerald-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Mean NDVI Index</span>
            <span className="font-heading text-xl font-extrabold text-slate-900">0.742 (High Canopy)</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-100"><Activity className="w-5 h-5 text-teal-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Mean EVI Index</span>
            <span className="font-heading text-xl font-extrabold text-slate-900">0.589 (Robust Vegetation)</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100"><Globe className="w-5 h-5 text-blue-600" /></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase block">Satellite Source</span>
            <span className="font-heading text-xl font-extrabold text-slate-900">Sentinel-2 L2A</span>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <h3 className="font-heading text-base font-bold text-slate-900">6-Month Biomass &amp; Canopy Health Index</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">GEE Pipeline Synced</span>
        </div>
        <div className="h-56 flex items-end justify-between gap-4 px-4 bg-slate-50 rounded-xl border border-slate-100 p-6">
          {[0.35, 0.42, 0.51, 0.63, 0.71, 0.79, 0.86].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-mono font-bold text-slate-700">{val}</span>
              <div className="w-full bg-gradient-to-t from-teal-600 to-emerald-500 rounded-t-md" style={{ height: `${val * 100}%` }} />
              <span className="text-xs text-slate-400 font-mono">Month {idx + 1}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
