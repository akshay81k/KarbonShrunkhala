import {
  Leaf,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, getRoleDashboard } from "../context/AuthContext";
import "../styles/auth.css";
import Logo from "../assets/images/logo.png";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      // Role-aware redirect: VERIFIER → /verifier/dashboard, GOVERNMENT → /admin/dashboard, else → /dashboard
      const role = data?.user?.user_metadata?.role || "NGO";
      const destination = getRoleDashboard(role);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-blob blob-left"></div>
      <div className="auth-blob blob-right"></div>

      <Link to="/" className="auth-back">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">

            <div className="auth-card">

              {/* Logo */}

              <div className="text-center mb-4">
                <div className="auth-logo">
                  <img src={Logo} alt="Logo" className="auth-logo-icon" />

                  <div className="auth-logo-text">
                    <h2>
                      Karbon<span>Shrunkhala</span>
                    </h2>
                    <p>Blue Carbon MRV System</p>
                  </div>
                </div>


                <h2 className="auth-title">
                  Welcome Back
                </h2>

                <p className="auth-subtitle">
                  Sign in to continue
                </p>

              </div>

              {/* Error */}

              {error && (
                <div className="auth-alert">

                  <AlertCircle size={18} />

                  <span>{error}</span>

                </div>
              )}

              {/* Form */}

              <form onSubmit={handleSubmit}>

                {/* Email */}

                <div className="auth-group">

                  <label>Email Address</label>

                  <div className="auth-input">

                    <Mail size={18} />

                    <input
                      type="email"
                      required
                      placeholder="admin@moes.gov.in"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />

                  </div>

                </div>

                {/* Password */}

                <div className="auth-group">

                  <label>Password</label>

                  <div className="auth-input">

                    <Lock size={18} />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      required
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                <div className="auth-forgot">

                  <Link to="/forgot-password">
                    Forgot Password?
                  </Link>

                </div>

                {/* Login */}

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-btn"
                >

                  <LogIn size={18} />

                  {loading
                    ? "Signing In..."
                    : "Login"}

                </button>

              </form>

              {/* Divider */}

              <div className="auth-divider">

                <span>or</span>

              </div>

              {/* Google */}

              <button
                className="google-btn"
                type="button"
              >

                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>

                Continue with Google

              </button>

              {/* Footer */}

              <div className="auth-footer">

                Don't have an account?

                <Link
                  to="/register"
                  className="ms-2"
                >
                  Sign Up
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}