import { useState } from "react";
import {
  HelpCircle, Search, ChevronDown, ChevronUp, ArrowRight,
  BookOpen, MessageSquare, FileText, Headphones, Mail,
} from "lucide-react";

const FAQS = [
  {
    q: "How do I register a new blue carbon project?",
    a: "Navigate to Projects → click 'New Project'. Fill in the project details including ecosystem type, area, GPS coordinates, and upload your GeoJSON boundary file. Once submitted, a verifier will be assigned within 5-7 business days.",
  },
  {
    q: "What documents are required for verification?",
    a: "You'll need: (1) Project Boundary in GeoJSON or KML format, (2) Land Ownership or Land Use Agreement, (3) Environmental Impact Assessment, (4) Baseline Biomass Survey, and (5) Community Engagement Evidence.",
  },
  {
    q: "How are blue carbon credits calculated?",
    a: "Credits are calculated using IPCC Tier 2 methodology and VM0033 Blue Carbon Methodology, integrating Sentinel-2 satellite NDVI data, ground-truth measurements, and ecosystem type. The platform uses Google Earth Engine for automated analysis.",
  },
  {
    q: "How long does verification typically take?",
    a: "The verification process typically takes 45-90 days from document submission. Field inspection (1-2 days) is followed by satellite data validation (2-3 weeks) and final NCCR review (3-4 weeks).",
  },
  {
    q: "How are credits tokenized on the blockchain?",
    a: "Once verification is complete, blue carbon credits are minted as ERC-1155 tokens on the Polygon blockchain through the KarbonShrunkhala smart contract. Each token represents 1 tCO₂e and is traceable on-chain.",
  },
  {
    q: "Can I sell my credits on the marketplace?",
    a: "Yes! Once credits are issued (minted on-chain), you can list them on the KarbonShrunkhala Marketplace. Corporate buyers can discover and purchase your credits directly, with transactions settled on Polygon.",
  },
];

const GUIDES = [
  { title: "Getting Started Guide", desc: "Step-by-step introduction to the platform", icon: <BookOpen size={18} color="#0F4C81" />, bg: "#eff6ff" },
  { title: "Project Submission Manual", desc: "Complete guide to submitting your first project", icon: <FileText size={18} color="#22A06B" />, bg: "#e9f8f1" },
  { title: "MRV Methodology Guide", desc: "Understanding Sentinel-2 and VM0033 methodology", icon: <Search size={18} color="#7c3aed" />, bg: "#f3eeff" },
  { title: "Blockchain Credits 101", desc: "How carbon tokens work on Polygon", icon: <HelpCircle size={18} color="#d97706" />, bg: "#fff8e6" },
];

export function HelpPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = FAQS.filter(
    (f) => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="db-page-header">
        <h1>Help Center</h1>
        <p>Find answers, guides, and support for the KarbonShrunkhala platform</p>
      </div>

      {/* Search banner */}
      <div style={{
        background: "linear-gradient(135deg,#0F4C81,#1e6fb5)",
        borderRadius: 20, padding: "32px 40px", marginBottom: 24,
        color: "white", textAlign: "center",
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          How can we help you?
        </h2>
        <p style={{ fontSize: 14, opacity: .85, margin: "0 0 20px" }}>
          Search our knowledge base or browse common questions below
        </p>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "white", borderRadius: 12, padding: "10px 16px",
          maxWidth: 500, margin: "0 auto",
        }}>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search FAQs, guides, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: 14, color: "#0f172a", flex: 1 }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>

        {/* FAQs */}
        <div>
          <div className="db-card">
            <div className="db-card-header"><h3>Frequently Asked Questions</h3></div>
            <div style={{ padding: "0 22px" }}>
              {filteredFaqs.length === 0 ? (
                <div style={{ padding: "40px 0", textAlign: "center", color: "#94a3b8" }}>
                  No results found for "{search}"
                </div>
              ) : filteredFaqs.map((faq, i) => (
                <div key={i} className="db-faq-item">
                  <button
                    className="db-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={16} color="#22A06B" /> : <ChevronDown size={16} color="#94a3b8" />}
                  </button>
                  {openFaq === i && (
                    <div className="db-faq-a">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Guides */}
          <div className="db-card">
            <div className="db-card-header"><h3>User Guides</h3></div>
            <div className="db-card-body" style={{ paddingTop: 8 }}>
              {GUIDES.map((g) => (
                <div
                  key={g.title}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 0", borderBottom: "1px solid #f8fafc",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: g.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {g.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{g.title}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{g.desc}</div>
                  </div>
                  <ArrowRight size={14} color="#94a3b8" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="db-help-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <h4 style={{ margin: 0 }}>Contact Support</h4>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(3,105,161,.15)" }}>
                <Headphones size={18} color="#0369a1" />
              </div>
            </div>
            <p>Our support team is available Mon-Fri, 9 AM – 6 PM IST to help you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="db-help-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <MessageSquare size={14} /> Start Live Chat
              </button>
              <button className="db-help-btn" style={{ background: "rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, border: "1px solid rgba(255,255,255,.4)" }}>
                <Mail size={14} /> Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
