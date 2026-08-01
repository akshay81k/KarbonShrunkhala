import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Users, UserPlus } from "lucide-react";

export function UsersPage() {
  const users = [
    { name: "Dr. AP Sharma", email: "admin@moes.gov.in", role: "GOVERNMENT", org: "Ministry of Earth Sciences" },
    { name: "Rajesh Kumar", email: "ngo@greencoast.org", role: "NGO", org: "GreenCoast Coastal Foundation" },
    { name: "Ananya Roy", email: "corporate@tata.com", role: "CORPORATE", org: "Tata ESG Division" },
    { name: "Dr. Vikram Seth", email: "verifier1@nccr.gov.in", role: "VERIFIER", org: "NCCR India" },
    { name: "Dr. Sunita Rao", email: "verifier2@nccr.gov.in", role: "VERIFIER", org: "NCCR India" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            User Directory &amp; Access Governance
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Registered Platform Users across Government, NGO, Verifier, and Corporate Roles
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer w-fit">
          <UserPlus className="w-4 h-4" /> Provision Verifier Account
        </button>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Organization</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {users.map((u, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition">
                <td className="p-4 font-bold text-slate-900">{u.name}</td>
                <td className="p-4 text-slate-500">{u.email}</td>
                <td className="p-4"><Badge variant={u.role}>{u.role}</Badge></td>
                <td className="p-4 text-slate-600">{u.org}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
