import { Link } from "react-router-dom";
import {
  Leaf,
  ShieldCheck,
  Globe,
  Award,
  ArrowRight,
  TrendingUp,
  Building2,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

export function Landing() {
  return (
    <div className="space-y-16 pb-16 bg-[#F8FBFC]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B192C] via-[#0D223A] to-[#0A111F] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Subtle mesh background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0E7490_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              National Blue Carbon Registry &amp; MRV Platform
            </div>

            {/* Title */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Blue Future</span> with Trust &amp; Technology
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transparent satellite monitoring, verifier approval workflows, and Polygon blockchain carbon credit issuance for coastal mangrove restoration projects across India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto px-6 py-3 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-extrabold text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 group"
              >
                Register Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>

          {/* Right Column: Live Impact Card Widget */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A111F]/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5">
              
              {/* Widget Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs font-bold text-white">
                      Sundarbans Restoration Zone A
                    </h3>
                    <p className="text-[10px] text-slate-400">Sentinel-2 Vegetation Health Index</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  +18.7% NDVI
                </span>
              </div>

              {/* Chart Mockup Line */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>6-Month Trend</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> High Growth
                  </span>
                </div>
                <div className="h-24 flex items-end justify-between gap-2 pt-3 px-2 bg-slate-950/60 rounded-xl border border-slate-800">
                  {[35, 42, 50, 64, 78, 89].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-teal-600 to-emerald-400 rounded-t-sm transition-all hover:brightness-125"
                        style={{ height: `${val}%` }}
                      />
                      <span className="text-[9px] text-slate-400 font-mono">M{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Footer */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] font-bold uppercase">ESTIMATED CREDITS</span>
                  <span className="text-white font-extrabold text-xs">4,500 tCO₂e</span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] font-bold uppercase">VERIFICATION</span>
                  <span className="text-emerald-400 font-extrabold text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> NCCR Approved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Impact Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard number="120+" label="Restoration Projects" detail="Registered across India" icon={<Leaf className="w-4 h-4 text-emerald-600" />} />
          <StatCard number="45.6K" label="tCO₂ Credits Issued" detail="Polygon Blockchain Tokenized" icon={<Award className="w-4 h-4 text-blue-600" />} />
          <StatCard number="28" label="NGO Partners" detail="Restoration Executing Bodies" icon={<Building2 className="w-4 h-4 text-amber-600" />} />
          <StatCard number="15+" label="Coastal Districts" detail="State &amp; National Registry" icon={<Globe className="w-4 h-4 text-cyan-600" />} />
        </div>
      </section>

      {/* Built for Every Stakeholder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-heading text-2xl font-extrabold text-slate-900">
            Built for Every Stakeholder
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Role-tailored interfaces providing complete transparency from coastal planting to carbon offset retirement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <RoleCard
            title="NGO Partners"
            badge="Restoration"
            description="Submit GeoJSON mangrove boundaries, upload evidence files, and track growth analytics."
            linkText="Register NGO Account"
            linkTo="/register"
          />
          <RoleCard
            title="NCCR Verifiers"
            badge="Verification"
            description="Review ground truth submissions, verify GEE satellite vegetation trends, and approve credits."
            linkText="Verifier Portal"
            linkTo="/login"
          />
          <RoleCard
            title="Corporate Buyers"
            badge="Marketplace"
            description="Purchase verified Blue Carbon credits with complete lineage and instant ESG certificates."
            linkText="Buy Carbon Credits"
            linkTo="/register"
          />
          <RoleCard
            title="MoES Admin"
            badge="Governance"
            description="National platform oversight, verifier provisioning, audit trail monitoring, and policy reports."
            linkText="Admin Access"
            linkTo="/login"
          />
        </div>
      </section>

      {/* Core Technology Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A111F] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 space-y-8">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl font-extrabold text-white">
              Trust Engineered by Technology
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Eliminating greenwashing using double-blind verification, satellite index analysis, and smart contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              icon={<Lock className="w-5 h-5 text-emerald-400" />}
              title="Blockchain Secured"
              description="Polygon Amoy smart contracts ensure double-spending protection and permanent provenance."
            />
            <FeatureCard
              icon={<Globe className="w-5 h-5 text-cyan-400" />}
              title="Satellite Verified"
              description="Google Earth Engine Sentinel-2 NDVI spectral analysis tracks canopy density growth over time."
            />
            <FeatureCard
              icon={<Layers className="w-5 h-5 text-blue-400" />}
              title="GeoJSON Boundaries"
              description="Precise spatial mapping prevents overlap and ensures rigorous MRV standards."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-5 h-5 text-amber-400" />}
              title="Immutable Proof"
              description="Decentralized IPFS document storage guarantees evidence files cannot be modified."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ number, label, detail, icon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3.5 shadow-xs">
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">{icon}</div>
      <div>
        <span className="font-heading text-xl font-extrabold text-slate-900 block leading-tight">{number}</span>
        <span className="text-xs font-bold text-slate-700 block">{label}</span>
        <span className="text-[10px] text-slate-400 block">{detail}</span>
      </div>
    </div>
  );
}

function RoleCard({ title, badge, description, linkText, linkTo }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-3 hover:border-slate-300 transition shadow-xs">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold text-slate-900">{title}</h3>
          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-slate-100 text-slate-600">
            {badge}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      <Link
        to={linkTo}
        className="text-xs font-bold text-slate-900 hover:text-[#22A06B] inline-flex items-center gap-1 pt-2 border-t border-slate-100"
      >
        {linkText} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
      <div>{icon}</div>
      <h3 className="font-heading text-xs font-bold text-white">{title}</h3>
      <p className="text-[11px] text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
