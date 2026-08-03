import { useState } from "react";
import { projectService } from "../services/projectService";
import { MapBoundarySelector } from "./MapBoundarySelector";
import {
  X,
  PlusCircle,
  FileUp,
  Leaf,
  AlertCircle,
  Sparkles,
  MapPin,
} from "lucide-react";

export function CreateProjectModal({ isOpen, onClose, onProjectCreated }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    ecosystemType: "MANGROVE",
    areaHectares: "",
    state: "West Bengal",
    district: "South 24 Parganas",
    baselineCarbonStock: "",
  });

  const [geojsonBoundary, setGeojsonBoundary] = useState(null);
  const [evidenceFile, setEvidenceFile] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBoundaryChange = (geojson) => {
    setGeojsonBoundary(geojson);
  };

  const handleAreaChange = (hectares) => {
    if (hectares > 0) {
      setForm((prev) => ({ ...prev, areaHectares: hectares.toString() }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("ecosystemType", form.ecosystemType);
      formData.append("areaHectares", form.areaHectares || "10.00");
      formData.append("state", form.state);
      formData.append("district", form.district);
      if (form.baselineCarbonStock) {
        formData.append("baselineCarbonStock", form.baselineCarbonStock);
      }

      if (geojsonBoundary) {
        formData.append("geojsonBoundary", JSON.stringify(geojsonBoundary));
      }

      if (evidenceFile) {
        formData.append("evidenceFile", evidenceFile);
      }

      const created = await projectService.createProject(formData);
      onProjectCreated(created);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to register project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                Register Blue Carbon Project
              </h3>
              <p className="text-xs text-slate-500 font-medium">Step {step} of 3 — Project Details &amp; Interactive Boundary Selection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-700 overflow-y-auto flex-1">
          
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="uppercase text-[10px] text-slate-500">Project Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sundarbans Delta Mangrove Restoration Zone C"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-normal transition"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase text-[10px] text-slate-500">Ecosystem Type *</label>
                <select
                  name="ecosystemType"
                  value={form.ecosystemType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-semibold transition cursor-pointer"
                >
                  <option value="MANGROVE">Mangrove Ecosystem</option>
                  <option value="SEAGRASS">Seagrass Meadow</option>
                  <option value="SALT_MARSH">Coastal Salt Marsh</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="uppercase text-[10px] text-slate-500">Project Description</label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Describe restoration goals, community involvement, and mangrove species..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-normal transition"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="uppercase text-[10px] text-slate-500">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-normal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="uppercase text-[10px] text-slate-500">District *</label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={form.district}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="uppercase text-[10px] text-slate-500">Total Area (Hectares)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="areaHectares"
                    placeholder="Auto-calculated from map boundary or enter manually"
                    value={form.areaHectares}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-normal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="uppercase text-[10px] text-slate-500">Baseline Carbon (tCO₂e)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="baselineCarbonStock"
                    placeholder="5200.00"
                    value={form.baselineCarbonStock}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-normal"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              
              {/* Interactive Satellite Boundary Map Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="uppercase text-[10px] text-slate-500 font-bold">
                    Project Spatial Boundary (Interactive Map Drawing &amp; Upload)
                  </label>
                  <span className="text-[11px] text-emerald-700 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> High-Resolution Esri Satellite Imagery
                  </span>
                </div>

                <MapBoundarySelector
                  initialGeoJSON={geojsonBoundary}
                  onBoundaryChange={handleBoundaryChange}
                  onAreaChange={handleAreaChange}
                />
              </div>

              {/* Evidence Document Upload */}
              <div className="space-y-1 pt-2">
                <label className="uppercase text-[10px] text-slate-500">
                  Ground Evidence Document (PDF / Images)
                </label>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileUp className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs text-slate-600 font-medium">
                      {evidenceFile ? evidenceFile.name : "Attach baseline report or field photos"}
                    </span>
                  </div>
                  <label className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                    Browse File
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.zip"
                      onChange={(e) => setEvidenceFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(step - 1);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
              >
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (step === 1 && !form.name.trim()) {
                    setError("Project name is required.");
                    return;
                  }
                  setError("");
                  setStep(step + 1);
                }}
                className="px-5 py-2 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold rounded-xl transition cursor-pointer"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                {loading ? "Registering..." : "Submit Project"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
