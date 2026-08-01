import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Leaf, Mail, Lock, User, Building, Phone, UserPlus, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";

export function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "NGO",
    organizationName: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#F8FBFC] via-[#F1F7F9] to-[#E6F0F4] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 mb-3 shadow-xs">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create your Account
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Join the KarbonShrunkhala Blue Carbon Registry
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-sm text-rose-700">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-600/10 transition">
              <User className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Dr. Rajesh Kumar"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-600/10 transition">
              <Mail className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="rajesh@greencoast.org"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-600/10 transition">
              <Lock className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Account Type / Role Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Account Type / Role
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-600/10 transition">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 cursor-pointer font-medium"
              >
                <option value="NGO">NGO / Restoration Partner</option>
                <option value="CORPORATE">Corporate Buyer</option>
              </select>
            </div>

            {/* Role Notice */}
            <div className="mt-2.5 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Verifier &amp; Admin accounts are provisioned exclusively by MoES Government Admin.
              </span>
            </div>
          </div>

          {/* Organization Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Organization Name
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-600/10 transition">
              <Building className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="GreenCoast Coastal Foundation"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white focus-within:ring-3 focus-within:ring-emerald-600/10 transition">
              <Phone className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 mt-6 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-slate-900 hover:text-emerald-600 underline transition">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
