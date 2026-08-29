import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupModal from './components/SignupModal';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import StartupPage from './pages/StartupPage';
import InvestorPage from './pages/InvestorPage';
import ProductsPage from './pages/ProductsPage';
import CFOModelPage from './pages/CFOModelPage';
import CustomEventsPage from './pages/CustomEventsPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import StartupIntakePage from './pages/StartupIntakePage';
import MembershipPlansPage from './pages/MembershipPlansPage';
import BlogPostPage from './pages/BlogPostPage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import EventsPage from './pages/EventsPage';
import BlogListPage from './pages/BlogListPage';
import PodcastPage from './pages/PodcastPage';
import FaqsPage from './pages/FaqsPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';

// Auth Pages
import { LoginPage, ResetPasswordPage, UpdatePasswordPage } from './pages/AuthPages';

// Dashboard Pages
import {
  DashboardOverview,
  DashboardResources,
  DashboardGetFeatured,
  DashboardAdvisory,
  DashboardEvents,
} from './pages/DashboardPages';

export function App() {
  const location = useLocation();

  // Auto-open Sign Up Modal when the site loads
  const [isSignupOpen, setIsSignupOpen] = useState(true);

  useEffect(() => {
    // If user explicitly navigates to /signup, let the full page handle it or open modal
    const handleOpenModal = () => setIsSignupOpen(true);
    window.addEventListener('openSignupModal', handleOpenModal);
    return () => window.removeEventListener('openSignupModal', handleOpenModal);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-canvas)' }}>
      <ScrollToTop />
      <Navbar onOpenSignup={() => setIsSignupOpen(true)} />

      {/* Auto-Open Sign Up Intake Modal (suppressed on /admin) */}
      <SignupModal isOpen={isSignupOpen && !location.pathname.startsWith('/admin')} onClose={() => setIsSignupOpen(false)} />

      <div style={{ flex: 1 }}>
        <Routes>
          {/* Main Nav Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/faqs" element={<FaqsPage />} />

          {/* Sub-pages */}
          <Route path="/startup" element={<StartupPage />} />
          <Route path="/investor" element={<InvestorPage />} />
          <Route path="/i-am-a-startup" element={<StartupPage />} />
          <Route path="/i-am-an-investor" element={<InvestorPage />} />
          <Route path="/the-5-minute-cfo-model" element={<CFOModelPage />} />
          <Route path="/custom-events" element={<CustomEventsPage />} />
          <Route path="/the-founder-knowledge-hub" element={<KnowledgeHubPage />} />
          <Route path="/startup-intake" element={<StartupIntakePage />} />
          <Route path="/membership-plans" element={<MembershipPlansPage />} />

          {/* Auth & Signup Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />

          {/* Admin Management Portal */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/portal" element={<AdminPage />} />

          {/* Member Portal */}
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/resources" element={<DashboardResources />} />
          <Route path="/dashboard/get-featured" element={<DashboardGetFeatured />} />
          <Route path="/dashboard/advisory" element={<DashboardAdvisory />} />
          <Route path="/dashboard/events" element={<DashboardEvents />} />
          <Route path="/dashboard-resources" element={<DashboardResources />} />
          <Route path="/dashboard-get-featured" element={<DashboardGetFeatured />} />
          <Route path="/dashboard-advisory" element={<DashboardAdvisory />} />
          <Route path="/dashboard-events" element={<DashboardEvents />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
