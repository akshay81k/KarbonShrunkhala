import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";
import { ProjectsPage } from "./pages/dashboard/ProjectsPage";
import { MonitoringPage } from "./pages/dashboard/MonitoringPage";
import { DocumentsPage } from "./pages/dashboard/DocumentsPage";
import { ReportsPage } from "./pages/dashboard/ReportsPage";
import { CreditsPage } from "./pages/dashboard/CreditsPage";
import { MessagesPage } from "./pages/dashboard/MessagesPage";
import { SupportPage } from "./pages/dashboard/SupportPage";
import { UsersPage } from "./pages/dashboard/UsersPage";
import { AnalyticsPage } from "./pages/dashboard/AnalyticsPage";
import { MarketplacePage } from "./pages/dashboard/MarketplacePage";

/**
 * App.jsx — Application Router & Layout Architecture
 *
 * Configured in Phase 4:
 * - Public Layout routes: / (Landing Page), /login, /register
 * - Protected Dashboard Layout routes: /dashboard, /dashboard/*, /profile
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Layout Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Layout Routes (Sidebar remains fixed for all sub-routes) */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/projects" element={<ProjectsPage />} />
            <Route path="/dashboard/all-projects" element={<ProjectsPage />} />
            <Route path="/dashboard/monitoring" element={<MonitoringPage />} />
            <Route path="/dashboard/satellite" element={<MonitoringPage />} />
            <Route path="/dashboard/documents" element={<DocumentsPage />} />
            <Route path="/dashboard/reports" element={<ReportsPage />} />
            <Route path="/dashboard/credits" element={<CreditsPage />} />
            <Route path="/dashboard/my-credits" element={<CreditsPage />} />
            <Route path="/dashboard/messages" element={<MessagesPage />} />
            <Route path="/dashboard/support" element={<SupportPage />} />
            <Route path="/dashboard/users" element={<UsersPage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/marketplace" element={<MarketplacePage />} />
            <Route path="/dashboard/pending" element={<ProjectsPage />} />
            <Route path="/dashboard/history" element={<ReportsPage />} />
            <Route path="/dashboard/audit" element={<ReportsPage />} />
            <Route path="/dashboard/certificates" element={<CreditsPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all redirect to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
