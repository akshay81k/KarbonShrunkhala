import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { creditService } from "../../services/creditService";
import { projectService } from "../../services/projectService";
import { Award, ShieldCheck, Zap, ExternalLink, Loader2, Send, Sparkles } from "lucide-react";
import { Badge } from "../../components/Badge";

export function CreditsPage() {
  const { user, profile } = useAuth();
  
  // Extract role robustly (checking profile, user, or user_metadata)
  const userRole = (
    profile?.role ||
    user?.role ||
    user?.user_metadata?.role ||
    "NGO"
  ).toUpperCase();

  // Verifier & Government (Admin) accounts can mint carbon credits on-chain
  const canMintTokens = userRole === "VERIFIER" || userRole === "GOVERNMENT";

  const [credits, setCredits] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mintingProjectId, setMintingProjectId] = useState("");
  const [mintAmount, setMintAmount] = useState(100);
  const [minting, setMinting] = useState(false);
  const [mintResult, setMintResult] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      // Try getAllCredits first (works for Verifier & Admin), fallback to getMyCredits (works for NGO)
      const creditsData = await creditService.getAllCredits().catch(() => creditService.getMyCredits().catch(() => []));
      const projectsData = await projectService.getAllProjects().catch(() => projectService.getMyProjects().catch(() => []));
      
      setCredits(creditsData);
      setApprovedProjects(projectsData.filter((p) => p.status === "APPROVED"));
    } catch (err) {
      console.error("Failed to load credits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userRole]);

  const handleMintOnChain = async (e) => {
    e.preventDefault();
    if (!canMintTokens || !mintingProjectId) return;
    setMinting(true);
    setMintResult(null);
    try {
      const res = await creditService.mintCredits(mintingProjectId, mintAmount);
      setMintResult(res.onChain);
      await loadData();
    } catch (err) {
      alert(err.message || "Failed to mint carbon tokens on Polygon Amoy.");
    } finally {
      setMinting(false);
    }
  };

  const totalTokens = credits.reduce((sum, c) => sum + (c.quantity || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            Tokenized Carbon Credits (ERC-1155)
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Polygon Amoy Testnet (Chain ID: 80002) • Verified Blue Carbon Tokenomics
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Tokens</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalTokens.toLocaleString()} tCO₂e</span>
          <span className="text-[10px] font-bold text-emerald-700 block">1 Token = 1 Metric Ton CO₂e</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-cyan-600">
          <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Token Batches</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{credits.length} Batches</span>
          <span className="text-[10px] font-bold text-cyan-700 block">NCCR On-Chain Anchoring</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-purple-600">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Blockchain Network</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">Polygon Amoy</span>
          <span className="text-[10px] font-bold text-purple-700 block">EVM ERC-1155 Multi-Token</span>
        </div>
      </div>

      {/* Mint Tokens Card (VERIFIER & GOVERNMENT) */}
      {canMintTokens && (
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 p-6 rounded-2xl text-white space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading text-base font-extrabold text-white">
              Mint Verified ERC-1155 Carbon Tokens on Polygon Amoy
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Select an approved Blue Carbon project to issue tokenized carbon credits on the Polygon Amoy blockchain.
          </p>

          {approvedProjects.length === 0 ? (
            <div className="p-3.5 bg-white/10 border border-white/20 rounded-xl text-xs text-slate-300 font-medium">
              No approved projects ready for minting yet. Approve a project in the Verifier workstation first.
            </div>
          ) : (
            <form onSubmit={handleMintOnChain} className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={mintingProjectId}
                onChange={(e) => setMintingProjectId(e.target.value)}
                className="w-full sm:w-80 px-3.5 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-400"
                required
              >
                <option value="" className="text-slate-900">Select Approved Project...</option>
                {approvedProjects.map((p) => (
                  <option key={p.id} value={p.id} className="text-slate-900">
                    {p.projectName || p.name} ({p.areaHectares} Ha)
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                max="100000"
                value={mintAmount}
                onChange={(e) => setMintAmount(parseInt(e.target.value) || 100)}
                className="w-full sm:w-32 px-3.5 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-400"
                placeholder="Quantity"
                required
              />

              <button
                type="submit"
                disabled={minting || !mintingProjectId}
                className="w-full sm:w-auto px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {minting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Mint Tokens On-Chain
              </button>
            </form>
          )}

          {mintResult && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 space-y-1 font-mono">
              <p className="font-bold text-emerald-400">✅ On-Chain Token Minting Confirmed!</p>
              <p className="truncate">Tx Hash: {mintResult.transactionHash}</p>
              <a
                href={mintResult.explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-300 underline font-bold inline-flex items-center gap-1"
              >
                View on Polygonscan Amoy Explorer <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Carbon Credits Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading text-base font-extrabold text-slate-900">
            Tokenized Carbon Token Holdings &amp; Issuance History
          </h3>
          <span className="text-xs text-slate-500 font-medium">Smart Contract: 0xC0e2...2a1d</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading tokenized credit portfolio...</span>
          </div>
        ) : credits.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 font-medium">
            No tokenized carbon credits issued yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Token ID / Serial</th>
                  <th className="p-3.5">Project Name</th>
                  <th className="p-3.5">Issued Date</th>
                  <th className="p-3.5">Token Quantity</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-5 text-right">Polygon Amoy Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {credits.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5 font-bold font-mono text-slate-900">
                      {c.tokenId || c.id.substring(0, 8)}
                    </td>
                    <td className="p-3.5 text-slate-800 font-bold">
                      {c.project?.projectName || "Sundarbans Project"}
                      <span className="block text-[10px] font-normal text-slate-400">{c.project?.district}, {c.project?.state}</span>
                    </td>
                    <td className="p-3.5 text-slate-500 font-medium">
                      {new Date(c.issuedAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">{c.quantity} tCO₂e</td>
                    <td className="p-3.5">
                      <Badge variant="ISSUED">ISSUED</Badge>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      {c.blockchainTx ? (
                        <a
                          href={`https://amoy.polygonscan.com/tx/${c.blockchainTx}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1 font-mono"
                        >
                          {c.blockchainTx.substring(0, 10)}... <ExternalLink className="w-3.5 h-3.5" />
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
