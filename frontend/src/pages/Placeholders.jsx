import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";

function Placeholder({ title, description, emoji }) {
  return (
    <div style={{
      minHeight: "60vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center",
    }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>{emoji}</div>
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <Wrench size={16} color="#22A06B" />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#22A06B", textTransform: "uppercase", letterSpacing: ".1em" }}>
          Coming Soon
        </span>
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", margin: "0 0 12px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
        {title}
      </h1>
      <p style={{ fontSize: 16, color: "#64748b", maxWidth: 480, margin: "0 0 32px", lineHeight: 1.6 }}>
        {description}
      </p>
      <Link
        to="/"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "11px 22px", background: "#22A06B", color: "white",
          borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none",
          transition: "background .18s",
        }}
      >
        <ArrowLeft size={15} /> Back to Home
      </Link>
    </div>
  );
}

export function HowItWorksPage() {
  return (
    <Placeholder
      title="How It Works"
      description="Learn how KarbonShrunkhala enables NGOs, verifiers, and corporate buyers to participate in blue carbon markets transparently."
      emoji="🔍"
    />
  );
}

export function MarketplacePage() {
  return (
    <Placeholder
      title="Carbon Marketplace"
      description="Browse and purchase verified blue carbon credits from mangrove, seagrass, and coastal wetland restoration projects across India."
      emoji="🌿"
    />
  );
}

export function PublicProjectsPage() {
  return (
    <Placeholder
      title="Projects Directory"
      description="Explore all registered blue carbon restoration projects submitted through the KarbonShrunkhala MRV platform."
      emoji="🗺️"
    />
  );
}

export function AboutPage() {
  return (
    <Placeholder
      title="About KarbonShrunkhala"
      description="KarbonShrunkhala is a blockchain-powered Blue Carbon Registry and MRV platform developed to enable transparent and verifiable coastal ecosystem carbon markets."
      emoji="🌊"
    />
  );
}

export function ResourcesPage() {
  return (
    <Placeholder
      title="Resources & Documentation"
      description="Access guides, methodology documents, API references, and educational resources about blue carbon ecosystems and MRV."
      emoji="📚"
    />
  );
}

export function ForgotPasswordPage() {
  return (
    <Placeholder
      title="Forgot Password"
      description="Password reset functionality is coming soon. Please contact support at support@karbonshrunkhala.in for assistance."
      emoji="🔑"
    />
  );
}
