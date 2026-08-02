import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, TrendingUp, ArrowUpRight, ArrowRight, ShieldCheck, Zap, FileText } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const ESTIMATED = [2100, 4200, 5800, 7200, 9400, 12450];
const VERIFIED  = [0,    800,  1200, 1800, 2100, 2460];

const TRANSACTIONS = [
  { id: "TXN-001", project: "Sundarbans Restoration", type: "Credit Generated", amount: "+2,460", date: "12 Jun 2025", status: "completed", hash: "0xf4a2...b7c1" },
  { id: "TXN-002", project: "Gahirmatha Mangrove",   type: "Credit Generated", amount: "+1,200", date: "08 Jun 2025", status: "completed", hash: "0x8d1e...a4f2" },
  { id: "TXN-003", project: "Sundarbans Restoration", type: "Credit Transferred", amount: "-500",  date: "01 Jun 2025", status: "completed", hash: "0x2c9b...3e7a" },
  { id: "TXN-004", project: "Kadathundi Coastline",   type: "Credit Generated", amount: "+800",   date: "25 May 2025", status: "pending",   hash: "—" },
  { id: "TXN-005", project: "Pichavaram Wetland",     type: "Credit Generated", amount: "+400",   date: "20 May 2025", status: "pending",   hash: "—" },
];

export function CreditsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const maxVal = Math.max(...ESTIMATED);

  return (
    <div>
      <div className="db-page-header">
        <h1>Credits Overview</h1>
        <p>Track your blue carbon credit generation, verification, and transaction history</p>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Credits", value: "12.45K tCO₂e", icon: <Award size={20} color="#22A06B" />, iconBg: "#e9f8f1", trend: "↑ 18.7%", color: "#22A06B" },
          { label: "Verified Credits", value: "2.46K tCO₂e",  icon: <ShieldCheck size={20} color="#0891b2" />, iconBg: "#e0f7ff", trend: "↑ 12.4%", color: "#0891b2" },
          { label: "Issued On-chain",  value: "2.10K tCO₂e",  icon: <Zap size={20} color="#7c3aed" />, iconBg: "#f3eeff", trend: "↑ 10.3%", color: "#7c3aed" },
        ].map((k) => (
          <div key={k.label} className="db-kpi-card">
            <div className="db-kpi-icon" style={{ background: k.iconBg }}>{k.icon}</div>
            <div className="db-kpi-label">{k.label}</div>
            <div className="db-kpi-value">{k.value}</div>
            <div className={`db-kpi-trend up`} style={{ color: k.color, background: k.iconBg, marginTop: 8 }}>
              <ArrowUpRight size={11} /> {k.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Transactions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

        {/* Growth Chart */}
        <div className="db-card">
          <div className="db-card-header">
            <div>
              <h3>Credit Growth Trend</h3>
              <p>Estimated vs Verified · Last 6 months</p>
            </div>
          </div>
          <div className="db-card-body">
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, paddingBottom: 4 }}>
              {MONTHS.map((m, i) => (
                <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: "100%", justifyContent: "flex-end", flexDirection: "column" }}>
                    <div style={{ width: "100%", height: `${(ESTIMATED[i]/maxVal)*100}%`, background: "linear-gradient(to top,#22A06B,#4ade80)", borderRadius: "4px 4px 0 0", opacity: .6 }} />
                    <div style={{ position: "absolute", width: "calc(100%/6 - 10px)", height: `${(VERIFIED[i]/maxVal)*100 || 2}%`, background: "#0F4C81", borderRadius: "4px 4px 0 0", zIndex: 1 }} />
                  </div>
                  <span style={{ fontSize: 9, color: "#94a3b8" }}>{m}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#64748b" }}>
                <div style={{ width: 12, height: 8, borderRadius: 2, background: "#22A06B", opacity: .7 }} />
                Estimated
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#64748b" }}>
                <div style={{ width: 12, height: 8, borderRadius: 2, background: "#0F4C81" }} />
                Verified
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="db-card">
          <div className="db-card-header"><h3>Credit Breakdown</h3></div>
          <div className="db-card-body">
            {[
              { label: "Generated (Total)", val: "12,450 tCO₂e", pct: 100, color: "#22A06B" },
              { label: "Verified by NCCR",  val: "2,460 tCO₂e",  pct: 20,  color: "#0891b2" },
              { label: "Issued On-chain",   val: "2,100 tCO₂e",  pct: 17,  color: "#7c3aed" },
              { label: "Retired",           val: "500 tCO₂e",    pct: 4,   color: "#d97706" },
            ].map((row) => (
              <div key={row.label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{row.val}</span>
                </div>
                <div style={{ height: 6, background: "#f1f5f9", borderRadius: 8 }}>
                  <div style={{ height: "100%", width: `${row.pct}%`, background: row.color, borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="db-card">
        <div className="db-card-header">
          <div>
            <h3>Transaction History</h3>
            <p>On-chain credit operations and transfers</p>
          </div>
          <div className="db-tabs" style={{ marginLeft: "auto" }}>
            {["all","completed","pending"].map((t) => (
              <button key={t} className={`db-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)} style={{ textTransform: "capitalize" }}>{t}</button>
            ))}
          </div>
        </div>
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Project</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Blockchain Hash</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS
                .filter((t) => activeTab === "all" || t.status === activeTab)
                .map((t) => (
                <tr key={t.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>{t.id}</td>
                  <td style={{ fontSize: 12 }}>{t.project}</td>
                  <td style={{ fontSize: 12 }}>{t.type}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: t.amount.startsWith("+") ? "#22A06B" : "#ef4444" }}>
                      {t.amount} tCO₂e
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: "#64748b" }}>{t.date}</td>
                  <td style={{ fontFamily: "monospace", fontSize: 11, color: "#64748b" }}>{t.hash}</td>
                  <td>
                    <span className={`db-status ${t.status === "completed" ? "approved" : "pending"}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
