import { useState, useEffect } from "react";
import { Search, MapPin, Mail, Loader2, Building } from "lucide-react";
import { projectService } from "../../services/projectService";

export function AdminNGOsPage() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadNgos = async () => {
      setLoading(true);
      try {
        const projects = await projectService.getAllProjects().catch(() => []);
        
        // Group by owner / organization
        const ngoMap = {};
        projects.forEach((p) => {
          const ownerId = p.ownerId || p.owner?.id || "unknown";
          if (!ngoMap[ownerId]) {
            ngoMap[ownerId] = {
              id: ownerId,
              name: p.owner?.organizationName || p.owner?.fullName || "Registered NGO Partner",
              email: p.owner?.email || "ngo@karbonshrunkhala.org",
              location: `${p.district || "Coastal Region"}, ${p.state || "India"}`,
              projectsCount: 0,
              status: "Active",
            };
          }
          ngoMap[ownerId].projectsCount += 1;
        });

        setNgos(Object.values(ngoMap));
      } catch (err) {
        console.error("Failed to load NGOs:", err);
      } finally {
        setLoading(false);
      }
    };
    loadNgos();
  }, []);

  const filteredNgos = ngos.filter((n) =>
    (n.name + n.email + n.location).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Registered NGO Partners</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Review and audit registered Non-Governmental Organizations on the platform</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search NGOs by name, email, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">Total Registered: {ngos.length}</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading real NGO profiles from database...</span>
          </div>
        ) : filteredNgos.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No NGO organizations registered yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Organization / Contact</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Active Projects</th>
                  <th className="p-3.5 pr-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredNgos.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                          {n.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{n.name}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Mail className="w-3 h-3 text-slate-400" /> {n.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {n.location}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{n.projectsCount} Projects</td>
                    <td className="p-3.5 pr-5 text-right">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                        ACTIVE
                      </span>
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
