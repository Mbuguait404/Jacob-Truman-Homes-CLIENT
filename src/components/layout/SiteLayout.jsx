import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function SiteLayout() {
  return (
    <div className="jth-root">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Link to="/admin" className="jth-admin-fab" title="Admin portal">
        <ShieldCheck size={16} /> Admin
      </Link>
    </div>
  );
}
