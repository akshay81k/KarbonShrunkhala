import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";
import { CreateProjectModal } from "../../components/CreateProjectModal";
import {
  PlusCircle,
  Search,
  Filter,
  FolderKanban,
  MapPin,
  Calendar,
  ExternalLink,
  Trash2,
  Loader2,
} from "lucide-react";

export function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error("Fetch Projects Error:", err);
      setError(err.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete project.");
    }
  };

  const filteredProjects = projects.filter((p) => {
    const projName = p.name || p.projectName || "";
    const projState = p.state || "";
    const projDistrict = p.district || "";
    const projEcosystem = p.ecosystemType || "";

    const matchesSearch =
      projName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projState.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projDistrict.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projEcosystem.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            {user?.role === "NGO" ? "My Projects Portfolio" : "All Registered Projects"}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage registered Blue Carbon restoration sites and spatial boundaries
          </p>
        </div>

        {user?.role === "NGO" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer w-fit"
          >
            <PlusCircle className="w-4 h-4" />
            Register New Project
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl w-full sm:w-80 text-xs text-slate-400">
          <Search className="w-4 h-4 shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, state, ecosystem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_VERIFICATION">Under Verification</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </Card>

      {/* Projects Table */}
      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading project portfolio...</span>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-rose-600 text-xs font-medium">{error}</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <FolderKanban className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-600">No projects found</p>
            <p className="text-[11px] text-slate-400">Click "Register New Project" to submit your first restoration site.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                  <th className="p-4">PROJECT NAME</th>
                  <th className="p-4">ECOSYSTEM</th>
                  <th className="p-4">AREA (HA)</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">DATE CREATED</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-bold text-slate-900">
                      <Link to={`/dashboard/projects/${p.id}`} className="hover:text-emerald-600 transition">
                        {p.name}
                      </Link>
                      <div className="text-[10px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" /> {p.district}, {p.state}
                      </div>
                    </td>
                    <td className="p-4">{p.ecosystemType}</td>
                    <td className="p-4 font-bold">{p.areaHectares} Ha</td>
                    <td className="p-4">
                      <Badge variant={p.status}>{p.status}</Badge>
                    </td>
                    <td className="p-4 text-slate-500 flex items-center gap-1.5 mt-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        to={`/dashboard/projects/${p.id}`}
                        className="p-1.5 inline-block hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition"
                        title="View Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {p.status === "DRAFT" && user?.role === "NGO" && (
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600 transition cursor-pointer"
                          title="Delete Draft"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}
