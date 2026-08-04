import { useState, useEffect } from "react";
import { FileText, Download, Search, ExternalLink, Loader2, FolderOpen, ShieldCheck } from "lucide-react";
import { projectService } from "../../services/projectService";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../../components/Badge";

export function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadRealDocuments = async () => {
      setLoading(true);
      try {
        const projects = await projectService.getAllProjects().catch(() => []);
        
        // RBAC Check: Verifiers should ONLY see documents for submitted / non-draft projects
        const visibleProjects = user?.role === "VERIFIER"
          ? projects.filter((p) => p.status !== "DRAFT")
          : projects;

        const docsList = [];
        visibleProjects.forEach((p) => {
          // 1. Boundary GeoJSON Document stored on Project
          if (p.geojsonUrl) {
            docsList.push({
              id: `${p.id}-geojson`,
              name: `${p.projectName || p.name} GeoJSON Boundary`,
              project: p.projectName || p.name,
              category: "Boundary",
              type: "GeoJSON",
              url: p.geojsonUrl,
              date: new Date(p.createdAt || Date.now()).toLocaleDateString(),
            });
          }

          // 2. Evidence documents stored in project_documents table
          if (Array.isArray(p.documents)) {
            p.documents.forEach((doc) => {
              docsList.push({
                id: doc.id,
                name: doc.fileName || doc.name || "Evidence File",
                project: p.projectName || p.name,
                category: "Evidence",
                type: doc.fileType?.includes("pdf") ? "PDF" : doc.fileType?.includes("image") ? "Image" : "Document",
                url: doc.storageUrl || doc.url,
                date: new Date(doc.createdAt || p.createdAt || Date.now()).toLocaleDateString(),
              });
            });
          }
        });

        setDocuments(docsList);
      } catch (err) {
        console.error("Failed to load project documents:", err);
      } flex: {
        setLoading(false);
      }
    };

    loadRealDocuments();
  }, [user]);

  const CATEGORIES = ["All", "Boundary", "Evidence"];

  const filteredDocs = documents.filter((d) => {
    const matchCat = category === "All" || d.category === category;
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.project.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const boundaryCount = documents.filter((d) => d.category === "Boundary").length;
  const evidenceCount = documents.filter((d) => d.category === "Evidence").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Project Documents &amp; Evidence Repository</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage project GeoJSON boundaries and ground evidence files uploaded to the PostgreSQL database
        </p>
      </div>

      {/* Real Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-blue-600">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Uploaded Files</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{documents.length} Files</span>
          <span className="text-[10px] font-bold text-blue-700 block">Stored in PostgreSQL</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FolderOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Boundary Files</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{boundaryCount} GeoJSON</span>
          <span className="text-[10px] font-bold text-emerald-700 block">Polygon Coordinates</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-purple-600">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ground Evidence Docs</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{evidenceCount} Docs</span>
          <span className="text-[10px] font-bold text-purple-700 block">Project Verification Audit</span>
        </div>
      </div>

      {/* Filter & Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents by name or project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-lg capitalize transition cursor-pointer ${
                  category === cat ? "bg-white text-emerald-700 shadow-2xs font-extrabold" : "hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading real project documents from database...</span>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-1">
            <FileText className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
            <p className="font-bold text-slate-600">No uploaded documents found.</p>
            <p className="text-[11px]">Documents for submitted projects will appear here for verification review.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Document Name</th>
                  <th className="p-3.5">Associated Project</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Uploaded Date</th>
                  <th className="p-3.5 pr-5 text-right">Download / Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5 font-bold text-slate-900">{doc.name}</td>
                    <td className="p-3.5 text-slate-700 font-medium">{doc.project}</td>
                    <td className="p-3.5">
                      <Badge variant={doc.category === "Boundary" ? "APPROVED" : "ISSUED"}>
                        {doc.category}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono">{doc.date}</td>
                    <td className="p-3.5 pr-5 text-right">
                      {doc.url ? (
                        <a
                          href={doc.url.startsWith("/") ? `http://localhost:5000${doc.url}` : doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1 font-mono"
                        >
                          Download <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
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
