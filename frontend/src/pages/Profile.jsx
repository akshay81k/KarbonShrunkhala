import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { profileService } from "../services/profileService";
import { User, Mail, Building, Phone, Shield, Save, CheckCircle2, AlertCircle, Camera, Image } from "lucide-react";

export function Profile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    organizationName: "",
    phoneNumber: "",
    avatarUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await profileService.getProfile();
        const data = response.data || {};
        setFormData({
          fullName: data.fullName || user?.fullName || "",
          organizationName: data.organizationName || user?.organizationName || "",
          phoneNumber: data.phoneNumber || user?.phoneNumber || "",
          avatarUrl: data.avatarUrl || user?.avatarUrl || "",
        });
      } catch (err) {
        console.warn("Using session profile fallback:", err);
        setFormData({
          fullName: user?.fullName || "",
          organizationName: user?.organizationName || "",
          phoneNumber: user?.phoneNumber || "",
          avatarUrl: user?.avatarUrl || "",
        });
      } finally {
        setFetching(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      await profileService.updateProfile(formData);
      setSuccess("Profile information updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#F8FBFC] flex items-center justify-center p-6">
        <p className="text-sm font-medium text-slate-500">Loading profile details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#F8FBFC] to-[#F1F7F9] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Page Title Header */}
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            User Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage your organization credentials and platform profile information
          </p>
        </div>

        {/* Profile Avatar Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <img
              src={
                formData.avatarUrl ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
              }
              alt="User avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-md"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-[#0F4C81] text-white rounded-full shadow-md">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          <div className="text-center sm:text-left flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="font-heading text-xl font-bold text-slate-900">
                {formData.fullName || user?.email}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 w-fit mx-auto sm:mx-0">
                <Shield className="w-3.5 h-3.5" />
                {user?.role || "NGO"}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium flex items-center gap-2 justify-center sm:justify-start">
              <Mail className="w-4 h-4 text-slate-400" />
              {user?.email}
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-sm text-emerald-800">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-sm text-rose-700">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0F4C81] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#0F4C81]/10 transition">
              <User className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Organization Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Organization Name
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0F4C81] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#0F4C81]/10 transition">
              <Building className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Organization Name"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0F4C81] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#0F4C81]/10 transition">
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

          {/* Avatar Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Avatar Image URL
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0F4C81] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#0F4C81]/10 transition">
              <Image className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="url"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 bg-[#0F4C81] hover:bg-[#1A6BB5] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#0F4C81]/20 active:scale-[0.99] flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
