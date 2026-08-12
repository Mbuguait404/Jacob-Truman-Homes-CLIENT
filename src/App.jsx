import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ListingsProvider } from "./context/ListingsContext";
import { AdminAuthProvider } from "./admin/AdminAuthContext";

import ScrollToTop from "./components/common/ScrollToTop";
import SiteLayout from "./components/layout/SiteLayout";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import EnquiryPage from "./pages/EnquiryPage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/routes/AdminDashboard";
import AdminListings from "./admin/routes/AdminListings";
import AdminListingForm from "./admin/routes/AdminListingForm";
import AdminEnquiries from "./admin/routes/AdminEnquiries";

export default function App() {
  return (
    <ListingsProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public site */}
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/listings/:id" element={<ListingDetailPage />} />
              <Route path="/listings/:id/enquire" element={<EnquiryPage mode="buy" />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/sell" element={<EnquiryPage mode="sell" />} />
              <Route path="/buy" element={<EnquiryPage mode="buy" />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin portal */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="listings" element={<AdminListings />} />
              <Route path="listings/new" element={<AdminListingForm />} />
              <Route path="listings/:id/edit" element={<AdminListingForm />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </ListingsProvider>
  );
}
