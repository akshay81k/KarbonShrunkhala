import { Card } from "../../components/Card";
import { FileUp, FileText, Download, Trash2, Layers } from "lucide-react";

export function DocumentsPage() {
  const docs = [
    { name: "Sundarbans_Boundary_v2.geojson", type: "GeoJSON Spatial Map", size: "2.4 MB", date: "2026-07-28" },
    { name: "Baseline_Soil_Carbon_Analysis.pdf", type: "Lab Soil Report", size: "4.8 MB", date: "2026-07-20" },
    { name: "Ground_Truth_Plantation_Photos.zip", type: "Field Evidence", size: "18.2 MB", date: "2026-07-15" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Project Documents &amp; Evidence Files
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Uploaded spatial maps, ground truth photos, and lab verification reports
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer w-fit">
          <FileUp className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
              <th className="p-4">File Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Size</th>
              <th className="p-4">Date Uploaded</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {docs.map((d, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition">
                <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  {d.name}
                </td>
                <td className="p-4 font-medium">{d.type}</td>
                <td className="p-4 text-slate-500">{d.size}</td>
                <td className="p-4 text-slate-500">{d.date}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"><Download className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
