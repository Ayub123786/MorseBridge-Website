import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-canvas)' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <Routes>
          {/* Main Nav Routes — matching real site */}
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

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />

          {/* Member Dashboard */}
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
