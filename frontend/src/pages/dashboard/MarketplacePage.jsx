import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { ShoppingBag, Award, CheckCircle2 } from "lucide-react";

export function MarketplacePage() {
  const listings = [
    { project: "Sundarbans Delta Mangrove Restoration", price: "₹1,250 / credit", available: "4,500 tCO₂e", ecosystem: "Mangrove", seller: "GreenCoast Foundation" },
    { project: "Pichavaram Coastal Wetland Preservation", price: "₹1,400 / credit", available: "6,700 tCO₂e", ecosystem: "Salt Marsh", seller: "Tamil Nadu Restoration Trust" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Blue Carbon Credit Marketplace
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Purchase Verified Blue Carbon Credits directly from Indian Coastal Restoration Projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((l, i) => (
          <Card key={i} className="space-y-4 p-6 hover:border-emerald-300 transition">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{l.ecosystem}</span>
                <h3 className="font-heading text-base font-bold text-slate-900 mt-0.5">{l.project}</h3>
                <p className="text-xs text-slate-500 mt-1">Seller: <strong>{l.seller}</strong></p>
              </div>
              <Badge variant="credits issued">Verified</Badge>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Price</span>
                <span className="font-heading text-sm font-extrabold text-slate-900">{l.price}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Available</span>
                <span className="font-heading text-sm font-extrabold text-emerald-700">{l.available}</span>
              </div>
            </div>

            <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
              <ShoppingBag className="w-4 h-4" /> Buy Carbon Credits
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
