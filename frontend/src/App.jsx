import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Layouts
import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { VerifierLayout } from "./layouts/VerifierLayout";

// Auth guard & Callbacks
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthCallback } from "./pages/AuthCallback";

// Public pages
import Landing from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import {
  HowItWorksPage,
  MarketplacePage,
  PublicProjectsPage,
  AboutPage,
  ResourcesPage,
  ForgotPasswordPage,
} from "./pages/Placeholders";

// NGO Dashboard pages
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { ProjectsPage } from "./pages/dashboard/ProjectsPage";
import { ProjectDetailPage } from "./pages/dashboard/ProjectDetailPage";
import { CreditsPage } from "./pages/dashboard/CreditsPage";
import { ReportsPage } from "./pages/dashboard/ReportsPage";
import { MonitoringPage } from "./pages/dashboard/MonitoringPage";
import { DocumentsPage } from "./pages/dashboard/DocumentsPage";
import { NotificationsPage } from "./pages/dashboard/NotificationsPage";
import { SettingsPage } from "./pages/dashboard/SettingsPage";
import { HelpPage } from "./pages/dashboard/HelpPage";

// Verifier Dashboard pages
import { VerifierDashboard } from "./pages/verifier/VerifierDashboard";
import { VerifierProjectsPage } from "./pages/verifier/VerifierProjectsPage";
import { ProjectReviewPage } from "./pages/verifier/ProjectReviewPage";
import {
  VerifierProfilePage,
  VerifierReportsPage,
  VerifierCreditsPage,
  VerifierDocumentsPage,
  VerifierSettingsPage,
  VerifierOrganizationsPage,
  VerifierUsersPage,
} from "./pages/verifier/VerifierPlaceholders";

// Admin Dashboard pages
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminNGOsPage } from "./pages/admin/AdminNGOsPage";
import { AdminVerifiersPage } from "./pages/admin/AdminVerifiersPage";
import { AdminProjectsPage } from "./pages/admin/AdminProjectsPage";
import {
  AdminCreditsPage,
  AdminReportsPage,
  AdminAnalyticsPage,
  AdminSettingsPage,
  AdminNotificationsPage
} from "./pages/admin/AdminPlaceholders";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ══════════ PUBLIC ROUTES ══════════ */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/projects" element={<PublicProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* ══════════ NGO / CORPORATE DASHBOARD ══════════ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["NGO", "CORPORATE"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="reports" element={<MonitoringPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* ══════════ VERIFIER DASHBOARD ══════════ */}
        <Route
          path="/verifier"
          element={
            <ProtectedRoute allowedRoles={["VERIFIER"]}>
              <VerifierLayout />
            </ProtectedRoute>
          }
        >
          {/* Main */}
          <Route path="dashboard" element={<VerifierDashboard />} />
          <Route path="projects" element={<VerifierProjectsPage />} />
          <Route path="projects/:id" element={<ProjectReviewPage />} />
          
          {/* Sub-pages */}
          <Route path="satellite" element={<Navigate to="reports" replace />} />
          <Route path="profile" element={<VerifierProfilePage />} />
          <Route path="reports" element={<VerifierReportsPage />} />
          <Route path="credits" element={<VerifierCreditsPage />} />
          <Route path="documents" element={<VerifierDocumentsPage />} />
          <Route path="settings" element={<VerifierSettingsPage />} />
          <Route path="organizations" element={<VerifierOrganizationsPage />} />
          <Route path="users" element={<VerifierUsersPage />} />
          <Route path="notifications" element={<Navigate to="dashboard" replace />} />
          <Route path="help" element={<Navigate to="dashboard" replace />} />

          <Route path="*" element={<Navigate to="/verifier/dashboard" replace />} />
        </Route>

        {/* ══════════ ADMIN DASHBOARD ══════════ */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["GOVERNMENT"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="ngos" element={<AdminNGOsPage />} />
          <Route path="verifiers" element={<AdminVerifiersPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="credits" element={<AdminCreditsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* ══════════ 404 FALLBACK ══════════ */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}