import { Card } from "../../components/Card";
import { HelpCircle, Mail, Phone, ExternalLink } from "lucide-react";

export function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Support &amp; Technical Assistance
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Help center and technical guidance for Blue Carbon MRV procedures
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="space-y-2">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <h3 className="font-heading text-sm font-bold text-slate-900">MRV Methodology Documentation</h3>
          <p className="text-xs text-slate-500">Learn how GeoJSON boundary files are processed with Sentinel-2 NDVI spectral formulas.</p>
        </Card>
        <Card className="space-y-2">
          <Mail className="w-6 h-6 text-blue-600" />
          <h3 className="font-heading text-sm font-bold text-slate-900">Contact MoES MRV Helpdesk</h3>
          <p className="text-xs text-slate-500">Email: support@karbonshrunkhala.gov.in — Toll Free: 1800-11-8822</p>
        </Card>
      </div>
    </div>
  );
}
