import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ListingsProvider } from "./context/ListingsContext";
import { AdminAuthProvider } from "./admin/AdminAuthContext";

import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import AboutPage from "./pages/AboutPage";
import EnquiryPage from "./pages/EnquiryPage";
import NotFoundPage from "./pages/NotFoundPage";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/routes/AdminDashboard";
import AdminListings from "./admin/routes/AdminListings";
import AdminListingForm from "./admin/routes/AdminListingForm";

export default function App() {
  return (
    <ListingsProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public site */}
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/listings/:id" element={<ListingDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/sell" element={<EnquiryPage mode="sell" />} />
              <Route path="/buy" element={<EnquiryPage mode="buy" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin portal */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="listings" element={<AdminListings />} />
              <Route path="listings/new" element={<AdminListingForm />} />
              <Route path="listings/:id/edit" element={<AdminListingForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </ListingsProvider>
  );
}
