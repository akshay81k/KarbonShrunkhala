import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

/**
 * PublicLayout
 * Shell wrapper for public pages (Landing Page, Login, Register)
 */
export function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#F8FBFC] flex flex-col font-body text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
