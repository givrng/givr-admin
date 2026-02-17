import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Sidebar } from "./Sidebar";

export function AppShell() {
  const { user, logout } = useAuth();

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-700">Verification Console</p>
          <h1 className="text-2xl font-semibold text-slate-900">GIVR Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Signed in as {user?.email}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Logout
        </button>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <Outlet />
      </section>
    </main>
  );
}
