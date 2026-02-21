import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AppShell } from "./layout/AppShell";
import { LoginPage } from "./pages/LoginPage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { VerificationPage } from "./pages/VerificationPage";
import "./index.css";
import { AuthenticatedFlagProvider } from "./auth/AuthContext";
import { RequireAuth } from "./routes/RequireAuth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthenticatedFlagProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route >
            <Route element={<AppShell />}>
              <Route path="/verify" element={<RequireAuth>
                <VerificationPage/>
              </RequireAuth>} />
            </Route>
          </Route>


          <Route path="*" element={<Navigate to="/verify" replace />} />
        </Routes>
      </Router>
    </AuthenticatedFlagProvider>
  </React.StrictMode>,
);
