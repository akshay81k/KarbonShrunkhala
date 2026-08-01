import { Link } from "react-router-dom";
import { Leaf, ShieldCheck, ExternalLink, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-logo font-bold text-lg text-white tracking-tight">
                Karbon<span className="text-emerald-400">Shrunkhala</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Blockchain-Powered Blue Carbon Registry and MRV System for transparent mangrove and coastal ecosystem restoration in India.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/#how-it-works" className="hover:text-emerald-400 transition">How It Works</Link></li>
              <li><Link to="/#marketplace" className="hover:text-emerald-400 transition">Carbon Marketplace</Link></li>
              <li><Link to="/#projects" className="hover:text-emerald-400 transition">Restoration Projects</Link></li>
              <li><Link to="/#analytics" className="hover:text-emerald-400 transition">NDVI Monitoring</Link></li>
            </ul>
          </div>

          {/* Stakeholders */}
          <div>
            <h4 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Stakeholders
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/register" className="hover:text-emerald-400 transition">NGO Registration</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition">Verifier Portal (NCCR)</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition">Corporate Buyers</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition">Government Admin (MoES)</Link></li>
            </ul>
          </div>

          {/* Trust & Tech */}
          <div>
            <h4 className="font-heading text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Built With
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Google Earth Engine + Sentinel-2
              </p>
              <p className="flex items-center gap-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Polygon Amoy Blockchain
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 KarbonShrunkhala. All rights reserved.</p>
          <p>Ministry of Earth Sciences (MoES) &amp; NCCR Blue Carbon MRV Initiative</p>
        </div>
      </div>
    </footer>
  );
}
