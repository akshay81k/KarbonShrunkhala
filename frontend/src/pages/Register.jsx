import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Leaf, Mail, Lock, User, Building, Phone, UserPlus, AlertCircle, ShieldAlert } from "lucide-react";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "NGO",
    organizationName: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#F8FBFC]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-5">
        
        {/* Top Logo Badge */}
        <div className="flex flex-col items-center text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-[#22A06B]" />
          </div>
          <h2 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
            Create your Account
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Join the KarbonShrunkhala Blue Carbon Registry
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs font-bold text-slate-700">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="uppercase tracking-wider text-[10px] text-slate-500">
              FULL NAME
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f4f9] border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white transition">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Dr. Rajesh Kumar"
                className="w-full bg-transparent border-none outline-none text-slate-900 text-xs font-normal"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="uppercase tracking-wider text-[10px] text-slate-500">
              EMAIL ADDRESS
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f4f9] border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white transition">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@moes.gov.in"
                className="w-full bg-transparent border-none outline-none text-slate-900 text-xs font-normal"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="uppercase tracking-wider text-[10px] text-slate-500">
              PASSWORD
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f4f9] border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white transition">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full bg-transparent border-none outline-none text-slate-900 text-xs font-normal"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1">
            <label className="uppercase tracking-wider text-[10px] text-slate-500">
              ACCOUNT TYPE / ROLE
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#f0f4f9] border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold outline-none focus:border-emerald-600 focus:bg-white transition cursor-pointer"
            >
              <option value="NGO">NGO / Restoration Partner</option>
              <option value="CORPORATE">Corporate Carbon Buyer</option>
            </select>
            <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-start gap-1 font-normal">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Note: Verifier &amp; Admin accounts are provisioned exclusively by MoES Government Admin.
            </p>
          </div>

          {/* Organization Name */}
          <div className="space-y-1">
            <label className="uppercase tracking-wider text-[10px] text-slate-500">
              ORGANIZATION NAME
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f4f9] border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white transition">
              <Building className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="organizationName"
                required
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="GreenCoast Coastal Foundation"
                className="w-full bg-transparent border-none outline-none text-slate-900 text-xs font-normal"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="uppercase tracking-wider text-[10px] text-slate-500">
              PHONE NUMBER
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f0f4f9] border border-slate-200 rounded-xl focus-within:border-emerald-600 focus-within:bg-white transition">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-transparent border-none outline-none text-slate-900 text-xs font-normal"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 font-bold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
