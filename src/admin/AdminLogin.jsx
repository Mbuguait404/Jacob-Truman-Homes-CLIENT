import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Seal from "../components/common/Seal";
import { useAdminAuth } from "./AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(e.target.elements.name.value);
    navigate("/admin/dashboard");
  };

  return (
    <div className="jth-admin-login">
      <Seal size={70} />
      <h2>Admin portal</h2>
      <p>This is a prototype — no password required. Enter any name to continue.</p>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" required />
        <button className="jth-btn jth-btn--primary jth-btn--block" type="submit">
          Enter dashboard
        </button>
      </form>
      <Link className="jth-link jth-admin-login__exit" to="/">
        ← Back to site
      </Link>
    </div>
  );
}
