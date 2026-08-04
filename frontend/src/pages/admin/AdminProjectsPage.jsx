import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Loader2, FolderKanban } from "lucide-react";
import { projectService } from "../../services/projectService";
import { Badge } from "../../components/Badge";

export function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await projectService.getAllProjects().catch(() => []);
        setProjects(data);
      } catch (err) {
        console.error("Failed to load admin projects:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) =>
    (p.projectName || p.name || p.district || p.state || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Global Project Registry</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Monitor all Blue Carbon restoration projects across the platform</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects by name, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium font-mono">Total Registry Projects: {projects.length}</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading projects from registry database...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <FolderKanban className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
            <p className="font-bold text-slate-600">No projects found in global registry.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Project Name</th>
                  <th className="p-3.5">Ecosystem Type</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Area (Ha)</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5 font-bold text-slate-900">{p.projectName || p.name}</td>
                    <td className="p-3.5 text-slate-600">{p.ecosystemType}</td>
                    <td className="p-3.5 text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {p.district}, {p.state}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">{p.areaHectares} Ha</td>
                    <td className="p-3.5">
                      <Badge variant={p.status}>{p.status}</Badge>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <Link
                        to={`/admin/projects`}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
                      >
                        Inspect Record
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
