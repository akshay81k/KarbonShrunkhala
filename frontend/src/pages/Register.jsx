import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, getRoleDashboard } from "../context/AuthContext";
import {
  ArrowLeft,
  AlertCircle,
  Building,
  Leaf,
  Lock,
  Mail,
  Phone,
  ShieldAlert,
  User,
  UserPlus,
} from "lucide-react";
import "../styles/auth.css";

export function Register() {
  const { register, loginWithGoogle } = useAuth();
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

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      // Only NGO and CORPORATE can self-register — both go to /dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
            <div className="auth-card register-card">
              <div className="text-center mb-4">
                <div className="auth-logo">
                  <Leaf size={30} />
                </div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-emerald-600 mb-3">
                  Create account
                </p>
                <h2 className="auth-title">Register for KarbonShrunkhala</h2>
                <p className="auth-subtitle">
                  Set up your organisation profile to start project registration and access the platform dashboard.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium flex items-center gap-2 mb-5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="auth-grid">

                  <div className="auth-group">
                    <label>Full Name</label>
                    <div className="auth-input">
                      <User size={18} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="auth-group">
                    <label>Email Address</label>
                    <div className="auth-input">
                      <Mail size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="auth-group">
                    <label>Organization</label>
                    <div className="auth-input">
                      <Building size={18} />
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        placeholder="Organization"
                      />
                    </div>
                  </div>

                  <div className="auth-group">
                    <label>Phone Number</label>
                    <div className="auth-input">
                      <Phone size={18} />
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div className="auth-group">
                    <label>Password</label>
                    <div className="auth-input">
                      <Lock size={18} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="auth-group">
                    <label>Account Type</label>

                    <select
                      className="auth-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >

                      <option value="NGO">
                        NGO / Restoration Partner
                      </option>

                      <option value="CORPORATE">
                        Corporate Carbon Buyer
                      </option>

                    </select>

                  </div>

                </div>

                <button
                  type="submit"
                  className="auth-btn"
                  disabled={loading}
                >

                  <UserPlus size={18} />

                  {loading ? "Creating Account..." : "Create Account"}

                </button>

                <div className="auth-divider">
                  <span>or</span>
                </div>

                <button
                  type="button"
                  className="google-btn"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >

                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    width="20"
                    alt=""
                  />

                  Continue with Google

                </button>

                <div className="auth-footer">

                  Already have an account?

                  <Link to="/login">

                    Sign In

                  </Link>

                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
