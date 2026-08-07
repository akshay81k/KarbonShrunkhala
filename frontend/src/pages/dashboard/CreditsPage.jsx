import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { creditService } from "../../services/creditService";
import { marketplaceService } from "../../services/marketplaceService";
import { projectService } from "../../services/projectService";
import {
  Award, ShieldCheck, Zap, ExternalLink, Loader2,
  Sparkles, Calculator, CheckCircle, AlertTriangle, Info,
  ShoppingBag, DollarSign, Tag
} from "lucide-react";
import { Badge } from "../../components/Badge";

export function CreditsPage() {
  const { user, profile } = useAuth();
  
  // Extract role robustly
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
  
  // Minting state & Calculation breakdown
  const [mintingProjectId, setMintingProjectId] = useState("");
  const [calculation, setCalculation] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState("");

  const [isOverridden, setIsOverridden] = useState(false);
  const [mintAmount, setMintAmount] = useState(0);
  const [overrideReason, setOverrideReason] = useState("");
  const [minting, setMinting] = useState(false);
  const [mintResult, setMintResult] = useState(null);

  // Listing Modal State
  const [listingCredit, setListingCredit] = useState(null);
  const [listPrice, setListPrice] = useState(15.0);
  const [listQty, setListQty] = useState(10);
  const [listingLoading, setListingLoading] = useState(false);
  const [listingSuccess, setListingSuccess] = useState("");
  const [listingError, setListingError] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const creditsData = await creditService.getAllCredits().catch(() => creditService.getMyCredits().catch(() => []));
      const projectsData = await projectService.getAllProjects().catch(() => projectService.getMyProjects().catch(() => []));
      
      setCredits(creditsData);
      const approved = projectsData.filter((p) => p.status === "APPROVED");
      setApprovedProjects(approved);

      if (approved.length > 0 && !mintingProjectId) {
        setMintingProjectId(approved[0].id);
      }
    } catch (err) {
      console.error("Failed to load credits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userRole]);

  // Fetch dynamic scientific calculation whenever selected project changes
  useEffect(() => {
    if (!mintingProjectId) {
      setCalculation(null);
      return;
    }

    async function fetchCalculation() {
      setCalcLoading(true);
      setCalcError("");
      try {
        const res = await creditService.calculateCredits(mintingProjectId);
        setCalculation(res);
        setMintAmount(res.recommendedCredits);
        setIsOverridden(false);
        setOverrideReason("");
      } catch (err) {
        console.error("Calculation fetch error:", err);
        setCalcError(err.message || "Failed to calculate carbon credits.");
        setCalculation(null);
      } finally {
        setCalcLoading(false);
      }
    }

    fetchCalculation();
  }, [mintingProjectId]);

  const handleMintOnChain = async (e) => {
    e.preventDefault();
    if (!canMintTokens || !mintingProjectId) return;

    if (isOverridden && (!overrideReason || overrideReason.trim().length < 15)) {
      alert("Mandatory justification required: Please provide a detailed justification (minimum 15 characters) when overriding the scientific carbon credit recommendation.");
      return;
    }

    setMinting(true);
    setMintResult(null);
    try {
      const res = await creditService.mintCredits(
        mintingProjectId,
        mintAmount,
        isOverridden ? overrideReason : null
      );
      setMintResult(res.onChain);
      await loadData();
    } catch (err) {
      alert(err.message || "Failed to mint carbon tokens on Polygon Amoy.");
    } finally {
      setMinting(false);
    }
  };

  const openListingModal = (credit) => {
    setListingCredit(credit);
    setListPrice(15.0);
    setListQty(parseFloat(credit.quantity) || 10);
    setListingError("");
    setListingSuccess("");
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!listingCredit) return;
    setListingLoading(true);
    setListingError("");
    setListingSuccess("");

    try {
      await marketplaceService.createListing({
        creditId: listingCredit.id,
        pricePerCredit: listPrice,
        quantity: listQty,
      });

      setListingSuccess("Carbon credits successfully listed on the Blue Carbon Marketplace!");
      setTimeout(() => {
        setListingCredit(null);
      }, 1500);
    } catch (err) {
      setListingError(err.message || "Failed to list credits on marketplace.");
    } finally {
      setListingLoading(false);
    }
  };

  const totalTokens = credits.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);

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

      {/* ── MINT TOKENS CARD WITH AUTOMATED CALCULATION ENGINE ── */}
      {canMintTokens && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 rounded-2xl text-white space-y-6 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-extrabold text-white flex items-center gap-2">
                  Automated Carbon Credit Calculation &amp; Minting Engine
                </h3>
                <p className="text-xs text-slate-300">
                  IPCC Tier 2 / Verra VM0033 Methodology • Polygon Amoy Testnet
                </p>
              </div>
            </div>

            <Badge variant="APPROVED" className="self-start sm:self-auto">
              IPCC 2013 VM0033
            </Badge>
          </div>

          {approvedProjects.length === 0 ? (
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 font-medium">
              No approved projects ready for credit minting. Approve a project in the Verifier workstation first.
            </div>
          ) : (
            <div className="space-y-5">
              
              {/* Project Select */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Select Approved Project for On-Chain Issuance
                </label>
                <select
                  value={mintingProjectId}
                  onChange={(e) => setMintingProjectId(e.target.value)}
                  className="w-full sm:w-96 px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-400"
                >
                  {approvedProjects.map((p) => (
                    <option key={p.id} value={p.id} className="text-slate-900">
                      {p.projectName || p.name} ({p.areaHectares} Ha — {p.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Scientific Calculation Breakdown */}
              {calcLoading ? (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2 bg-slate-950/40 rounded-xl border border-slate-800">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                  <span className="text-xs font-medium">Executing IPCC Tier 2 calculation over Sentinel-2 telemetry...</span>
                </div>
              ) : calcError ? (
                <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-xl text-xs text-red-300 font-medium">
                  {calcError}
                </div>
              ) : calculation ? (
                <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Scientific Formula</span>
                      <code className="text-xs font-mono text-slate-200 block">{calculation.formula}</code>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      Methodology: {calculation.methodologyVersion}
                    </span>
                  </div>

                  {/* Input Parameter Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Project Area</span>
                      <strong className="text-white block font-mono">{calculation.parameters.areaHectares} Ha</strong>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Ecosystem Rate</span>
                      <strong className="text-white block font-mono">{calculation.parameters.baselineRate} tCO₂e/ha/yr</strong>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Sentinel-2 Mean NDVI</span>
                      <strong className="text-emerald-400 block font-mono">{calculation.parameters.meanNdvi}</strong>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Canopy Vigor (f_NDVI)</span>
                      <strong className="text-white block font-mono">{calculation.parameters.ndviFactor}x</strong>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Leakage Risk</span>
                      <strong className="text-amber-400 block font-mono">-5.0% (Activity)</strong>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Buffer Escrow</span>
                      <strong className="text-purple-400 block font-mono">-10.0% (Risk)</strong>
                    </div>
                  </div>

                  {/* Intermediate Calculations & Recommended Output */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Gross Sequestration:</span>
                        <strong className="text-slate-200 font-mono">{calculation.intermediateCalculations.grossSequestration} tCO₂e</strong>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Leakage Deduction (5%):</span>
                        <strong className="text-amber-400 font-mono">-{calculation.intermediateCalculations.leakageDeduction} tCO₂e</strong>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Non-Permanence Buffer (10%):</span>
                        <strong className="text-purple-400 font-mono">-{calculation.intermediateCalculations.bufferReserveWithheld} tCO₂e</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Recommended Credit Issuance</span>
                        <span className="font-heading text-2xl font-extrabold text-white block">
                          {calculation.recommendedCredits.toLocaleString()} tCO₂e
                        </span>
                      </div>
                      <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Form & Override Controls */}
              <form onSubmit={handleMintOnChain} className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    id="overrideCheck"
                    checked={isOverridden}
                    onChange={(e) => {
                      setIsOverridden(e.target.checked);
                      if (!e.target.checked && calculation) {
                        setMintAmount(calculation.recommendedCredits);
                        setOverrideReason("");
                      }
                    }}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <label htmlFor="overrideCheck" className="text-slate-300 font-medium cursor-pointer">
                    Override scientific recommended token quantity (Requires mandatory audit justification)
                  </label>
                </div>

                {isOverridden && (
                  <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Verifier Override Protocol Active</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Custom Token Quantity (tCO₂e)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="1"
                          value={mintAmount}
                          onChange={(e) => setMintAmount(parseFloat(e.target.value) || 0)}
                          className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white outline-none focus:border-amber-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Mandatory Override Justification (Min 15 chars)</label>
                        <textarea
                          rows={2}
                          value={overrideReason}
                          onChange={(e) => setOverrideReason(e.target.value)}
                          placeholder="Provide scientific or ground audit justification for overriding the GEE recommended credit amount..."
                          className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-amber-400"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-400 font-mono">
                    Token Amount to Mint: <strong className="text-emerald-400 font-bold">{mintAmount} tCO₂e</strong>
                  </span>

                  <button
                    type="submit"
                    disabled={minting || !mintingProjectId || (isOverridden && overrideReason.trim().length < 15)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {minting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Signing &amp; Minting on Polygon Amoy...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Mint {mintAmount} Tokens on Polygon Amoy</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Mint Result Banner */}
              {mintResult && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> ERC-1155 Tokens Minted Successfully!
                    </span>
                    <a
                      href={mintResult.explorerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-emerald-300 underline font-mono inline-flex items-center gap-1 hover:text-white"
                    >
                      View on Amoy Explorer <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono space-y-0.5">
                    <div>Tx Hash: {mintResult.transactionHash}</div>
                    <div>Token ID: #{mintResult.tokenId} • Block: {mintResult.blockNumber}</div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* Issued Carbon Credits Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-heading text-sm font-extrabold text-slate-900">
            Platform Carbon Credit Registry &amp; Audit Logs
          </h3>
          <span className="text-xs text-slate-500 font-medium">Total Batches: {credits.length}</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading tokenized credit registry from blockchain &amp; database...</span>
          </div>
        ) : credits.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-1">
            <Award className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
            <p className="font-bold text-slate-600">No tokenized carbon credits issued yet.</p>
            <p className="text-[11px]">Carbon credits are minted on Polygon Amoy after verifier project approval.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Token ID / Batch</th>
                  <th className="p-3.5">Associated Project</th>
                  <th className="p-3.5">Methodology</th>
                  <th className="p-3.5">Quantity (tCO₂e)</th>
                  <th className="p-3.5">Calculation Basis</th>
                  <th className="p-3.5">Issued Date</th>
                  <th className="p-3.5 pr-5 text-right">Actions / Marketplace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {credits.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5">
                      <span className="font-bold font-mono text-slate-900 block">{c.tokenId || c.id.substring(0, 8)}</span>
                      <span className="text-[10px] text-slate-400 font-mono">ERC-1155 Multi-Token</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 block">{c.project?.projectName || "Sundarbans Restoration"}</span>
                      <span className="text-[10px] text-slate-500">{c.project?.district}, {c.project?.state}</span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600 font-semibold">
                      {c.methodologyVersion || "IPCC-2013-VM0033-v1.0"}
                    </td>
                    <td className="p-3.5 font-extrabold text-emerald-700 font-mono text-sm">
                      {parseFloat(c.quantity).toLocaleString()} tCO₂e
                    </td>
                    <td className="p-3.5">
                      {c.isOverridden ? (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md flex items-center gap-1 w-fit" title={c.overrideReason}>
                          <AlertTriangle className="w-3 h-3" /> Overridden
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" /> Scientific GEE Match
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono">
                      {new Date(c.issuedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {c.blockchainTx && (
                          <a
                            href={`https://amoy.polygonscan.com/tx/${c.blockchainTx}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition inline-flex items-center gap-1 font-mono text-[11px]"
                            title="View on Polygon Amoy Explorer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => openListingModal(c)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <Tag className="w-3.5 h-3.5" /> List for Sale
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── CREATE MARKETPLACE LISTING MODAL ── */}
      {listingCredit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-600" /> List Carbon Credits for Sale
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Publish credits to the Blue Carbon Marketplace</p>
              </div>
              <button
                onClick={() => setListingCredit(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            {listingError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold">
                {listingError}
              </div>
            )}

            {listingSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-extrabold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{listingSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Credit Batch</span>
                  <strong className="text-slate-900 font-mono font-bold block">{listingCredit.tokenId || listingCredit.id}</strong>
                  <span className="text-slate-500 text-[11px] block">{listingCredit.project?.projectName || "Blue Carbon Project"}</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Quantity to List (tCO₂e)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max={parseFloat(listingCredit.quantity)}
                    value={listQty}
                    onChange={(e) => setListQty(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold font-mono text-slate-900 outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">Price per Credit ($ USD / tCO₂e)</label>
                  <input
                    type="number"
                    step="0.50"
                    min="1"
                    value={listPrice}
                    onChange={(e) => setListPrice(parseFloat(e.target.value) || 15.0)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold font-mono text-slate-900 outline-none focus:border-emerald-600"
                    required
                  />
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between font-bold">
                  <span className="text-slate-700">Total Listing Value:</span>
                  <span className="text-emerald-800 font-mono text-sm">${(listQty * listPrice).toFixed(2)} USD</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setListingCredit(null)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={listingLoading}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {listingLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Publishing Listing...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Publish to Marketplace</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
