import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { PublicLayout } from "./layouts/PublicLayout";
import Landing from "./pages/Landing";

/**
 * App.jsx
 * Phase 1 - Landing Page Only
 *
 * Future routes (Login, Register, Dashboard, etc.)
 * will be added back after the landing page is complete.
 */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        {/* Redirect any unknown route to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}