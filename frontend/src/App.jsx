import { Leaf, Server, Database, Link2 } from "lucide-react";

/**
 * App.jsx — Root Component
 *
 * Phase 1: Health-check landing screen confirming the frontend is running.
 * This will be replaced with proper routing and layouts in Phase 4.
 */
function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-logo text-3xl font-bold text-primary mb-2">
            KarbonShrunkhala
          </h1>
          <p className="text-text-secondary text-lg">
            Blockchain-Based Blue Carbon Registry &amp; MRV System
          </p>
        </div>

        {/* Health Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <HealthCard
            icon={<Server className="w-5 h-5" />}
            title="Frontend"
            status="Running"
            detail="React + Vite on port 5173"
            color="text-success"
          />
          <HealthCard
            icon={<Server className="w-5 h-5" />}
            title="Backend"
            status="Check"
            detail="Express on port 5000"
            color="text-warning"
            href="http://localhost:5000/api/health"
          />
          <HealthCard
            icon={<Database className="w-5 h-5" />}
            title="Python Service"
            status="Check"
            detail="FastAPI on port 8000"
            color="text-warning"
            href="http://localhost:8000/health"
          />
          <HealthCard
            icon={<Link2 className="w-5 h-5" />}
            title="Blockchain"
            status="Check"
            detail="Hardhat (Polygon Amoy)"
            color="text-warning"
          />
        </div>

        {/* Phase Info */}
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Phase 1 — Project Setup Complete
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * HealthCard — Displays service health status.
 * Reusable component used only in this Phase 1 health-check page.
 */
function HealthCard({ icon, title, status, detail, color, href }) {
  const content = (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-text-secondary">{icon}</div>
        <h3 className="font-heading font-semibold text-text-primary">{title}</h3>
      </div>
      <p className={`text-sm font-semibold ${color} mb-1`}>● {status}</p>
      <p className="text-xs text-text-secondary">{detail}</p>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

export default App;
