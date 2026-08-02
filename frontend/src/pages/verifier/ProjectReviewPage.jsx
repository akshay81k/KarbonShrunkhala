import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Calendar, Building, FileText, Download,
  CheckCircle, Clock, MessageSquare, AlertCircle, Map,
  Satellite, CheckSquare, Square, ThumbsUp, ThumbsDown, FileEdit,
  X,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────── */
const PROJECT = {
  id: "vp-1",
  name: "Sundarbans Restoration",
  type: "Mangrove Restoration",
  ngo: "GreenCoast NGO",
  ngoContact: "arvind@greencoast.in",
  location: "West Bengal, India",
  coords: "21.9497° N, 88.8750° E",
  area: 1250,
  estCredits: 12450,
  submittedOn: "2 hours ago",
  status: "pending",
  description: "Large-scale mangrove restoration project in the Sundarbans delta covering 1,250 hectares. Focuses on replanting native mangrove species, protecting existing ecosystems, and restoring coastal biodiversity.",
  methodology: "VM0033 – Blue Carbon Methodology",
  timeline: [
    { label: "Project Submitted", date: "Oct 15, 2024", done: true },
    { label: "Documents Uploaded", date: "Oct 15, 2024", done: true },
    { label: "Verifier Assigned", date: "Oct 16, 2024", done: true },
    { label: "Under Review", date: "Current", active: true },
  ],
  documents: [
    { name: "Project Boundary GeoJSON", type: "GeoJSON", date: "Oct 15" },
    { name: "Land Ownership Certificate", type: "PDF", date: "Oct 15" },
    { name: "Baseline Assessment Report", type: "PDF", date: "Oct 15" },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=300&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=300&q=80",
  ],
  ndviBefore: 0.24,
  ndviCurrent: 0.61,
};

const CHECKLIST = [
  { id: "c1", label: "GeoJSON boundary covers stated area (1,250 ha)" },
  { id: "c2", label: "Land ownership documents verified and valid" },
  { id: "c3", label: "Baseline assessment methodology matches VM0033" },
  { id: "c4", label: "Satellite NDVI confirms pre-project bare soil/degradation" },
  { id: "c5", label: "Current NDVI shows significant vegetation growth" },
  { id: "c6", label: "No signs of double counting in registries" },
];

export function ProjectReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checks, setChecks] = useState({});
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleCheck = (cid) => {
    setChecks(prev => ({ ...prev, [cid]: !prev[cid] }));
  };

  const allChecked = CHECKLIST.every(c => checks[c.id]);
  const progress = Math.round((Object.values(checks).filter(Boolean).length / CHECKLIST.length) * 100);

  return (
    <div>
      {/* Back button */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 14px", background: "white",
            border: "1px solid #e8eff6", borderRadius: 10,
            fontSize: 13, fontWeight: 600, color: "#475569",
            cursor: "pointer", transition: "all .15s",
          }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
              PENDING VERIFICATION
            </span>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>ID: {PROJECT.id.toUpperCase()}</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px", color: "#0f172a" }}>{PROJECT.name}</h1>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#475569" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Building size={14} /> {PROJECT.ngo}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={14} /> {PROJECT.location}</span>
          </div>
        </div>
        <div>
          <button className="db-new-project-btn" style={{ background: "white", color: "#0F4C81", border: "1px solid #E8EFF6", marginRight: 10 }}>
            <FileText size={14} /> View Methodology
          </button>
          <button className="db-new-project-btn">
            <Download size={14} /> Verification Report
          </button>
        </div>
      </div>

      {/* Three Column Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 340px", gap: 20 }}>

        {/* ── Left Column: Details & Docs ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          <div className="db-card">
            <div className="db-card-header"><h3>Project Details</h3></div>
            <div className="db-card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Ecosystem</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{PROJECT.type}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Area</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{PROJECT.area.toLocaleString()} ha</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Est. Credits</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#7c3aed" }}>{PROJECT.estCredits.toLocaleString()}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Coordinates</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", fontFamily: "monospace" }}>{PROJECT.coords}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Methodology</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{PROJECT.methodology}</div>
              </div>
            </div>
          </div>

          <div className="db-card">
            <div className="db-card-header"><h3>NGO Contact</h3></div>
            <div className="db-card-body">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e9f8f1", display: "flex", alignItems: "center", justifyContent: "center", color: "#22A06B", fontWeight: 700 }}>
                  G
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{PROJECT.ngo}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{PROJECT.ngoContact}</div>
                </div>
              </div>
              <button style={{ width: "100%", padding: "6px", background: "transparent", border: "1px solid #E8EFF6", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#475569", cursor: "pointer" }}>
                Message NGO
              </button>
            </div>
          </div>

          <div className="db-card">
            <div className="db-card-header"><h3>Submitted Documents</h3></div>
            <div style={{ padding: "0 16px 16px" }}>
              {PROJECT.documents.map((doc, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i !== PROJECT.documents.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={14} color="#ef4444" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>{doc.type} · {doc.date}</div>
                  </div>
                  <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8" }}><Download size={14} /></button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Center Column: Maps & Satellite ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* GeoJSON Map Placeholder */}
          <div className="db-card" style={{ height: 300, display: "flex", flexDirection: "column" }}>
            <div className="db-card-header" style={{ borderBottom: "none", paddingBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Map size={16} color="#0F4C81" />
                <h3 style={{ margin: 0 }}>Project Boundary Map</h3>
              </div>
            </div>
            <div style={{ flex: 1, padding: 16 }}>
              <div style={{ width: "100%", height: "100%", background: "#f8fafc", borderRadius: 12, border: "2px dashed #cbd5e1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                <Map size={32} style={{ marginBottom: 8, opacity: .5 }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>Map Integration Placeholder</span>
                <span style={{ fontSize: 11 }}>GeoJSON boundary layer over satellite base map</span>
              </div>
            </div>
          </div>

          {/* Satellite NDVI Comparison */}
          <div className="db-card">
            <div className="db-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Satellite size={16} color="#22A06B" />
                <h3 style={{ margin: 0 }}>Sentinel-2 NDVI Analysis</h3>
              </div>
            </div>
            <div className="db-card-body">
              <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px", lineHeight: 1.5 }}>
                Google Earth Engine analysis showing vegetation health changes over the project lifecycle within the GeoJSON boundary.
              </p>
              
              <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                <div style={{ flex: 1, background: "#f8fafc", padding: 16, borderRadius: 12, border: "1px solid #e8eff6" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8 }}>Baseline NDVI (Pre-project)</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{PROJECT.ndviBefore}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#d97706" }}>Degraded/Bare</span>
                  </div>
                </div>
                <div style={{ flex: 1, background: "#f8fafc", padding: 16, borderRadius: 12, border: "1px solid #e8eff6" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8 }}>Current NDVI (Latest)</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: "#22A06B" }}>{PROJECT.ndviCurrent}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#22A06B" }}>Healthy Canopy</span>
                  </div>
                </div>
              </div>

              <div style={{ height: 120, background: "#f8fafc", borderRadius: 12, border: "1px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>
                NDVI Trend Chart Placeholder
              </div>
            </div>
          </div>

          {/* Evidence Gallery */}
          <div className="db-card">
            <div className="db-card-header"><h3>Field Evidence Gallery</h3></div>
            <div className="db-card-body">
              <div style={{ display: "flex", gap: 12 }}>
                {PROJECT.gallery.map((img, i) => (
                  <div key={i} style={{ width: 100, height: 75, borderRadius: 8, overflow: "hidden", border: "1px solid #e8eff6" }}>
                    <img src={img} alt="Evidence" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
                <div style={{ width: 100, height: 75, borderRadius: 8, background: "#f8fafc", border: "1px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  +3 more
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right Column: Verification Workflow ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Verification Checklist */}
          <div className="db-card">
            <div className="db-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>Verification Checklist</h3>
              <span style={{ fontSize: 12, fontWeight: 700, color: progress === 100 ? "#22A06B" : "#0F4C81" }}>{progress}%</span>
            </div>
            
            <div style={{ padding: "0 16px" }}>
              <div style={{ height: 4, background: "#f1f5f9", borderRadius: 2, marginBottom: 16 }}>
                <div style={{ height: "100%", width: `${progress}%`, background: progress === 100 ? "#22A06B" : "#0F4C81", borderRadius: 2, transition: "width .3s ease" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {CHECKLIST.map((item) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }} onClick={() => handleCheck(item.id)}>
                    <div style={{ marginTop: 2, color: checks[item.id] ? "#22A06B" : "#cbd5e1", transition: "color .2s" }}>
                      {checks[item.id] ? <CheckSquare size={16} /> : <Square size={16} />}
                    </div>
                    <span style={{ fontSize: 12, color: checks[item.id] ? "#475569" : "#0f172a", lineHeight: 1.4, transition: "color .2s" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ padding: 16, borderTop: "1px solid #f1f5f9", background: "#f8fafc", borderRadius: "0 0 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
              <button 
                disabled={!allChecked}
                style={{ 
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: "10px", background: allChecked ? "#22A06B" : "#94a3b8", color: "white",
                  border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: allChecked ? "pointer" : "not-allowed",
                  transition: "background .2s"
                }}
              >
                <ThumbsUp size={16} /> Approve & Verify Credits
              </button>
              
              <div style={{ display: "flex", gap: 10 }}>
                <button 
                  style={{ 
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "8px", background: "white", color: "#d97706",
                    border: "1px solid #fcd34d", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  <FileEdit size={14} /> Request Changes
                </button>
                <button 
                  onClick={() => setRejectModalOpen(true)}
                  style={{ 
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "8px", background: "white", color: "#ef4444",
                    border: "1px solid #fca5a5", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}
                >
                  <ThumbsDown size={14} /> Reject
                </button>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="db-card">
            <div className="db-card-header"><h3>Activity Timeline</h3></div>
            <div className="db-card-body">
              <div className="db-timeline">
                {PROJECT.timeline.map((step, i) => (
                  <div key={i} className={`db-tl-item ${step.done ? "done" : step.active ? "active-step" : "pending-step"}`}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{step.label}</h4>
                    <span style={{ fontSize: 11, fontWeight: 600, color: step.done ? "#22A06B" : step.active ? "#0F4C81" : "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                      {step.done ? <CheckCircle size={11} /> : step.active ? <Clock size={11} /> : <Clock size={11} />}
                      {step.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
          <div style={{ background: "white", width: 400, borderRadius: 20, padding: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: 0 }}>Reject Project</h3>
              <button onClick={() => setRejectModalOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: "12px", background: "#fee2e2", borderRadius: 10, display: "flex", gap: 10, marginBottom: 16 }}>
              <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ margin: 0, fontSize: 12, color: "#991b1b", lineHeight: 1.5 }}>
                Rejecting this project will permanently change its status. The NGO will be notified. This action cannot be undone.
              </p>
            </div>

            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 8 }}>Reason for Rejection</label>
            <textarea 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Provide a detailed reason for rejecting this project..."
              style={{ width: "100%", height: 100, padding: 12, border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 13, fontFamily: "inherit", resize: "none", marginBottom: 20 }}
            />

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setRejectModalOpen(false)} style={{ flex: 1, padding: "10px", background: "#f1f5f9", border: "none", borderRadius: 10, fontWeight: 600, color: "#475569", cursor: "pointer" }}>Cancel</button>
              <button disabled={!rejectReason.trim()} style={{ flex: 1, padding: "10px", background: "#ef4444", border: "none", borderRadius: 10, fontWeight: 700, color: "white", cursor: rejectReason.trim() ? "pointer" : "not-allowed", opacity: rejectReason.trim() ? 1 : 0.5 }}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
