import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function linkClass(pathname: string, href: string): string {
  return `rounded-lg px-3 py-2 text-sm font-medium transition ${
    pathname.startsWith(href) ? "bg-blue-100 text-blue-800" : "text-slate-600 hover:bg-slate-100"
  }`;
}

export function Sidebar() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <p className="mb-1 px-3 text-xs uppercase tracking-wider text-slate-500">Navigation</p>
      <Link to="/verify" className={linkClass(pathname, "/verify")}>
        Verification
      </Link>
      {user?.role === "SUPER_ADMIN" && (
        <Link to="/manage-admins" className={linkClass(pathname, "/manage-admins")}>
          Manage Admins
        </Link>
      )}
    </nav>
  );
}
