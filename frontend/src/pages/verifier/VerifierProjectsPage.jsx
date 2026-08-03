import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { verificationService } from "../../services/verificationService";
import { Search, Filter, MapPin, Clock, Loader2 } from "lucide-react";
import { Badge } from "../../components/Badge";

export function VerifierProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectService.getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load verifier projects:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    const projName = p.name || p.projectName || "";
    const projState = p.state || "";
    const projDistrict = p.district || "";

    const matchesSearch =
      projName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projState.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projDistrict.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Projects for Verification &amp; Audit
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          National Centre for Coastal Research (NCCR) Verifier Workstation
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-96 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-emerald-600 focus-within:bg-white transition">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search project name, state, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xs text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-emerald-600 transition cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="SUBMITTED">Submitted (Pending Audit)</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading verifier project queue...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 font-medium">
            No projects found matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Project Name</th>
                  <th className="p-3.5">NGO Partner</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Area (Ha)</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date Registered</th>
                  <th className="p-3.5 pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5 font-bold text-slate-900">
                      {p.name || p.projectName}
                      <span className="block text-[10px] font-normal text-slate-400">{p.ecosystemType}</span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {p.owner?.organizationName || p.owner?.fullName || "NGO Partner"}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.district}, {p.state}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">{p.areaHectares} Ha</td>
                    <td className="p-3.5">
                      <Badge variant={p.status}>{p.status}</Badge>
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <button
                        onClick={() => navigate(`/verifier/projects/${p.id}`)}
                        className={`px-3.5 py-1.5 font-bold text-xs rounded-xl transition cursor-pointer ${
                          p.status === "SUBMITTED"
                            ? "bg-[#22A06B] hover:bg-[#1A7A52] text-white"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {p.status === "SUBMITTED" ? "Review Site" : "Inspect Details"}
                      </button>
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
