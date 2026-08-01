import { Badge } from "../../components/common/Badge";
import { Card } from "../../components/Card";
import { PlusCircle, Search, Filter, FolderKanban, MapPin, Calendar, ExternalLink } from "lucide-react";

export function ProjectsPage() {
  const projects = [
    { id: "1", name: "Sundarbans Delta Mangrove Restoration", state: "West Bengal", district: "South 24 Parganas", ecosystem: "Mangrove", area: "120 Ha", status: "In Verification", date: "2026-07-28" },
    { id: "2", name: "Mahanadi Mangrove Ecosystem Revival", state: "Odisha", district: "Kendrapara", ecosystem: "Mangrove", area: "85 Ha", status: "Active", date: "2026-07-22" },
    { id: "3", name: "Pichavaram Coastal Wetland Preservation", state: "Tamil Nadu", district: "Cuddalore", ecosystem: "Salt Marsh", area: "145 Ha", status: "Credits Issued", date: "2026-07-15" },
    { id: "4", name: "Gulf of Kutch Seagrass Meadow Project", state: "Gujarat", district: "Jamnagar", ecosystem: "Seagrass", area: "100 Ha", status: "Draft", date: "2026-07-10" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            My Projects Portfolio
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage your registered Blue Carbon restoration sites and GeoJSON boundary files
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer w-fit">
          <PlusCircle className="w-4 h-4" />
          Register New Project
        </button>
      </div>

      {/* Filter Bar */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl w-full sm:w-80 text-xs text-slate-400">
          <Search className="w-4 h-4 shrink-0" />
          <input type="text" placeholder="Search by name, state, ecosystem..." className="w-full bg-transparent border-none outline-none text-slate-800" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer">
            <Filter className="w-3.5 h-3.5" /> Filter Status
          </button>
        </div>
      </Card>

      {/* Projects Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="p-4">Project Name</th>
                <th className="p-4">Ecosystem</th>
                <th className="p-4">Area</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900">
                    <div>{p.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {p.district}, {p.state}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{p.ecosystem}</td>
                  <td className="p-4 font-bold">{p.area}</td>
                  <td className="p-4"><Badge variant={p.status}>{p.status}</Badge></td>
                  <td className="p-4 text-slate-500">{p.date}</td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition cursor-pointer">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
