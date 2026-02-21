import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppShell() {

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-700">Verification Console</p>
          <h1 className="text-2xl font-semibold text-slate-900">GIVR Admin Dashboard</h1>
        </div>
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Logout
        </button>
      </header>

      <section className="grid grid-cols-1 gap-4 ">
        <Sidebar />
        <Outlet />
      </section>
    </main>
  );
}
