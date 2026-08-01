import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/Sidebar";

/**
 * DashboardLayout
 * AppShell wrapper for authenticated dashboard pages (Top Navbar + Sidebar + Content Viewport)
 */
export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-body text-slate-900">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
