import { useState, useEffect } from "react";
import { Search, Plus, UserCheck, Building, Loader2 } from "lucide-react";
import Button from "../../components/common/Button";
import { supabase } from "../../config/supabase";

export function AdminVerifiersPage() {
  const [verifiers, setVerifiers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    password: "",
    phoneNumber: ""
  });

  const getAuthHeader = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return token ? `Bearer ${token}` : "";
  };

  const fetchVerifiers = async () => {
    setFetching(true);
    try {
      const authHeader = await getAuthHeader();
      const res = await fetch("http://localhost:5000/api/admin/verifiers", {
        headers: {
          "Authorization": authHeader
        }
      });
      if (res.ok) {
        const json = await res.json();
        setVerifiers(json.data || []);
      } else {
        setVerifiers([]);
      }
    } catch (err) {
      console.error("Fetch verifiers error:", err);
      setVerifiers([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchVerifiers();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreateVerifier = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const authHeader = await getAuthHeader();
      const res = await fetch("http://localhost:5000/api/admin/verifiers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to create verifier account");
      }

      setSuccess("Verifier account created successfully.");
      await fetchVerifiers();
      setTimeout(() => setModalOpen(false), 1500);
      setFormData({ fullName: "", organizationName: "", email: "", password: "", phoneNumber: "" });
    } catch (err) {
      setError(err.message || "Failed to create verifier account.");
    } finally {
      setLoading(false);
    }
  };

  const filteredVerifiers = verifiers.filter((v) =>
    (v.fullName || v.name || v.organizationName || v.email || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">Verifier Management</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Manage corporate verifier credentials and authorization roles</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Provision Verifier Account
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search verifiers by name, org, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">Total Verifiers: {verifiers.length}</span>
        </div>

        {fetching ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading verifiers from database...</span>
          </div>
        ) : filteredVerifiers.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <UserCheck className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
            <p className="font-bold text-slate-600">No verifier accounts found.</p>
            <p className="text-[11px]">Click 'Provision Verifier Account' above to register a corporate verifier.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Verifier / Organization</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Phone</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5 pr-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredVerifiers.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5">
                      <span className="font-bold text-slate-900 block">{v.fullName || v.name || "Corporate Verifier"}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" /> {v.organizationName || v.org || "National Verifier Organization"}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{v.email}</td>
                    <td className="p-3.5 font-mono text-slate-500">{v.phoneNumber || v.phone || "—"}</td>
                    <td className="p-3.5 font-bold text-emerald-700">VERIFIER</td>
                    <td className="p-3.5 pr-5 text-right">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading text-lg font-extrabold text-slate-900">Provision Verifier Account</h3>
            
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-bold">{error}</div>}
            {success && <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-bold">{success}</div>}

            <form onSubmit={handleCreateVerifier} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Full Name</label>
                <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Organization Name</label>
                <input name="organizationName" type="text" value={formData.organizationName} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Email Address</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition">{loading ? "Creating..." : "Create Account"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
