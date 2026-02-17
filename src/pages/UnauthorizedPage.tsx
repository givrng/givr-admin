import { Link } from "react-router-dom";

export function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center px-5 py-10">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Unauthorized</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your account does not have permission to access this page.
        </p>
        <Link to="/verify" className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          Go to verification
        </Link>
      </section>
    </main>
  );
}
