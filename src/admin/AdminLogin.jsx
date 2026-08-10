import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Seal from "../components/common/Seal";
import { useAdminAuth } from "./AdminAuthContext";
import { loginAdmin } from "../api/client";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const data = await loginAdmin({ email, password });
      login(data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="jth-admin-login">
      <Seal size={70} />
      <h2>Admin portal</h2>
      <p>Sign in with your admin credentials.</p>
      <form onSubmit={handleSubmit}>
        {error && <div className="jth-admin-login__error">{error}</div>}

        <div className="jth-admin-login__field">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            name="email"
            placeholder="admin@jacobtrumanhomes.co.ke"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="jth-admin-login__field">
          <label htmlFor="admin-password">Password</label>
          <div className="jth-admin-login__password-wrap">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="jth-admin-login__toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          className="jth-btn jth-btn--primary jth-btn--block"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <Link className="jth-link jth-admin-login__exit" to="/">
        ← Back to site
      </Link>
    </div>
  );
}
