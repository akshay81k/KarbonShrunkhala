import { useState, useEffect } from "react";
import { marketplaceService } from "../../services/marketplaceService";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../../components/Badge";
import {
  ShoppingBag, Award, CheckCircle, ExternalLink, Loader2,
  Globe, Search, Filter, ShieldCheck, Download, FileText,
  DollarSign, Sparkles, CheckCircle2, ArrowRight
} from "lucide-react";

export function MarketplacePage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [myCertificates, setMyCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("explore"); // "explore" or "certificates"

  const [search, setSearch] = useState("");
  const [ecosystemFilter, setEcosystemFilter] = useState("All");

  // Purchase Modal State
  const [selectedListing, setSelectedListing] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(10);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState(null);
  const [purchaseError, setPurchaseError] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [listingsData, certsData] = await Promise.all([
        marketplaceService.getAllListings().catch(() => []),
        marketplaceService.getBuyerCertificates().catch(() => []),
      ]);
      setListings(listingsData);
      setMyCertificates(certsData);
    } catch (err) {
      console.error("Failed to load marketplace data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openPurchaseModal = (listing) => {
    setSelectedListing(listing);
    setBuyQuantity(Math.min(10, listing.quantityAvailable));
    setPurchaseError("");
    setPurchaseResult(null);
  };

  const handleExecutePurchase = async (e) => {
    e.preventDefault();
    if (!selectedListing || buyQuantity <= 0) return;

    setPurchasing(true);
    setPurchaseError("");
    setPurchaseResult(null);

    try {
      const res = await marketplaceService.purchaseCredits({
        listingId: selectedListing.id,
        quantity: buyQuantity,
      });

      setPurchaseResult(res);
      await loadData();
    } catch (err) {
      setPurchaseError(err.message || "Failed to execute credit purchase trade.");
    } finally {
      setPurchasing(false);
    }
  };

  const filteredListings = listings.filter((l) => {
    const matchType = ecosystemFilter === "All" || (l.ecosystemType || "").toUpperCase() === ecosystemFilter.toUpperCase();
    const matchSearch =
      !search ||
      (l.projectName || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.location || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.seller || "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const totalMarketplaceVolume = listings.reduce((sum, l) => sum + (l.quantityAvailable || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            Blue Carbon Credit Marketplace
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Purchase verified ERC-1155 Blue Carbon credits directly from Indian coastal restoration sites with live GEE telemetry &amp; official PDF ESG certificates
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 shrink-0">
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === "explore" ? "bg-white text-emerald-700 shadow-2xs font-extrabold" : "hover:text-slate-900"
            }`}
          >
            Explore Credit Marketplace
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === "certificates" ? "bg-white text-emerald-700 shadow-2xs font-extrabold" : "hover:text-slate-900"
            }`}
          >
            <Award className="w-3.5 h-3.5" /> My ESG Certificates ({myCertificates.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Marketplace Volume</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalMarketplaceVolume.toLocaleString()} tCO₂e</span>
          <span className="text-[10px] font-bold text-emerald-700 block">Verified Restoration Credits</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-blue-600">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Listings</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{listings.length} Listings</span>
          <span className="text-[10px] font-bold text-blue-700 block">IPCC &amp; Verra Compliant</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-purple-600">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">My ESG Ownership Certificates</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{myCertificates.length} Issued</span>
          <span className="text-[10px] font-bold text-purple-700 block">Downloadable PDF Certificates</span>
        </div>
      </div>

      {/* ── EXPLORE MARKETPLACE TAB ── */}
      {activeTab === "explore" && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, location, or seller..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 w-full sm:w-auto">
              {["All", "MANGROVE", "SEAGRASS", "SALT_MARSH"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEcosystemFilter(cat)}
                  className={`px-3 py-1 rounded-lg capitalize transition cursor-pointer text-[11px] ${
                    ecosystemFilter === cat ? "bg-white text-emerald-700 shadow-2xs font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  {cat.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Grid */}
          {loading ? (
            <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-2 bg-white rounded-2xl border border-slate-200">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
              <span className="text-xs font-medium">Loading active marketplace listings...</span>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-2 bg-white rounded-2xl border border-slate-200">
              <ShoppingBag className="w-9 h-9 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="font-bold text-slate-600 text-xs">No active carbon credit listings found.</p>
              <p className="text-[11px] text-slate-400">NGO credit holders can list their verified credits for sale from the Credits dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((l) => (
                <div key={l.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] rounded-full uppercase tracking-wider">
                        {l.ecosystemType}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {l.tokenId || "KBCC-AMOY"}
                      </span>
                    </div>

                    <h3 className="font-heading text-sm font-extrabold text-slate-900 leading-snug">
                      {l.projectName}
                    </h3>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{l.location}</span>
                    </div>
                  </div>

                  {/* Satellite Telemetry & Price Card */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">GEE Sentinel-2 NDVI:</span>
                      <strong className="text-emerald-700 font-mono font-bold">{l.meanNdvi}</strong>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Project Area:</span>
                      <strong className="text-slate-800 font-mono font-bold">{l.areaHectares} Ha</strong>
                    </div>

                    <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Price per ton</span>
                        <span className="font-heading text-base font-extrabold text-slate-900">${l.pricePerCredit.toFixed(2)} USD</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Available</span>
                        <span className="font-heading text-sm font-extrabold text-emerald-700 font-mono">{l.quantityAvailable.toLocaleString()} tCO₂e</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openPurchaseModal(l)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" /> Purchase Carbon Credits
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MY ESG CERTIFICATES TAB (CORPORATE BUYER PORTFOLIO) ── */}
      {activeTab === "certificates" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-sm font-extrabold text-slate-900">
                Official ESG Carbon Offset Certificates &amp; Trade History
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Corporate compliance certificates with Polygon Amoy verification</p>
            </div>
            <span className="text-xs text-slate-500 font-mono font-bold">Total Purchases: {myCertificates.length}</span>
          </div>

          {myCertificates.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-2">
              <Award className="w-9 h-9 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="font-bold text-slate-600 text-xs">No ESG certificates purchased yet.</p>
              <p className="text-[11px] text-slate-400">Explore the marketplace above to purchase verified Blue Carbon credits.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                  <tr>
                    <th className="p-3.5 pl-5">Certificate Serial / Tx</th>
                    <th className="p-3.5">Restoration Project</th>
                    <th className="p-3.5">Offset Quantity</th>
                    <th className="p-3.5">Total Value</th>
                    <th className="p-3.5">Purchase Date</th>
                    <th className="p-3.5 pr-5 text-right">Official PDF Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {myCertificates.map((cert) => (
                    <tr key={cert.transactionId} className="hover:bg-slate-50/50 transition">
                      <td className="p-3.5 pl-5">
                        <span className="font-bold font-mono text-slate-900 block">KB-ESG-{cert.transactionId.substring(0, 8).toUpperCase()}</span>
                        {cert.ipfsHash && (
                          <span className="text-[10px] font-mono text-slate-400 block" title={cert.ipfsHash}>
                            IPFS: {cert.ipfsHash.substring(0, 18)}...
                          </span>
                        )}
                        {cert.blockchainTx && (
                          <a
                            href={`https://amoy.polygonscan.com/tx/${cert.blockchainTx}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-mono text-emerald-600 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            Polygon Amoy Tx <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{cert.projectName}</span>
                        <span className="text-[10px] text-slate-500">{cert.location}</span>
                      </td>
                      <td className="p-3.5 font-extrabold text-emerald-700 font-mono text-sm">
                        {cert.quantity.toLocaleString()} tCO₂e
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 font-mono">
                        ${cert.totalPrice.toFixed(2)} USD
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono">
                        {new Date(cert.purchasedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        {cert.downloadUrl ? (
                          <a
                            href={cert.downloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5" /> Download PDF ESG Certificate
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
      )}

      {/* ── PURCHASE CREDIT CHECKOUT MODAL ── */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" /> Carbon Credit Trade Execution
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Verified Blue Carbon Offset Settlement</p>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            {purchaseError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold">
                {purchaseError}
              </div>
            )}

            {purchaseResult ? (
              <div className="space-y-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-3 text-slate-800">
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Trade Executed &amp; ESG Certificate Issued!
                </div>

                <p className="text-xs text-slate-600">
                  You have successfully purchased <strong>{buyQuantity} tCO₂e</strong> carbon credits from project <strong>{selectedListing.projectName}</strong>.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href={purchaseResult.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-4 h-4" /> Download PDF ESG Certificate
                  </a>
                  <button
                    onClick={() => setSelectedListing(null)}
                    className="w-full sm:w-auto px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Close Modal
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleExecutePurchase} className="space-y-4">
                {/* Project Brief */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Project Name:</span>
                    <strong className="text-slate-900 font-bold">{selectedListing.projectName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Ecosystem Type:</span>
                    <span className="font-bold text-emerald-700">{selectedListing.ecosystemType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Price per Credit:</span>
                    <strong className="text-slate-900 font-bold">${selectedListing.pricePerCredit.toFixed(2)} USD / tCO₂e</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Available Inventory:</span>
                    <strong className="text-emerald-700 font-mono font-bold">{selectedListing.quantityAvailable.toLocaleString()} tCO₂e</strong>
                  </div>
                </div>

                {/* Quantity Input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    Select Carbon Credits to Purchase (tCO₂e)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max={selectedListing.quantityAvailable}
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(parseFloat(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-emerald-600 font-mono"
                    required
                  />
                </div>

                {/* Cost Calculation */}
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Total Purchase Cost:</span>
                  <span className="font-heading text-lg font-extrabold text-emerald-800">
                    ${(buyQuantity * selectedListing.pricePerCredit).toFixed(2)} USD
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedListing(null)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={purchasing || buyQuantity <= 0}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {purchasing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Settlement...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Confirm Trade &amp; Issue Certificate</span>
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
