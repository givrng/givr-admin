import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { AppShell } from "./layout/AppShell";
import { LoginPage } from "./pages/LoginPage";
import { ManageAdminsPage } from "./pages/ManageAdminsPage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { VerificationPage } from "./pages/VerificationPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]} />}>
            <Route element={<AppShell />}>
              <Route path="/verify" element={<VerificationPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}>
            <Route element={<AppShell />}>
              <Route path="/manage-admins" element={<ManageAdminsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/verify" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
);
