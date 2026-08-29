import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingSocials from "../common/FloatingSocials";
import SiteStructuredData from "./SiteStructuredData";

export default function SiteLayout() {
  return (
    <div className="jth-root">
      <SiteStructuredData />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Link to="/admin" className="jth-admin-fab" title="Admin portal">
        <ShieldCheck size={16} /> Admin
      </Link>
      <FloatingSocials />
    </div>
  );
}
