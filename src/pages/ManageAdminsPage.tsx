const seededAdmins = [
  { email: "owner@givr.ng", role: "SUPER_ADMIN" },
  { email: "reviewer@givr.ng", role: "ADMIN" },
];

export function ManageAdminsPage() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Manage Admins</h2>
      <p className="mt-1 text-sm text-slate-500">
        Super admins can create/remove admin accounts. The first seeded account exists from setup.
      </p>

      <div className="mt-4 space-y-2">
        {seededAdmins.map((admin) => (
          <div key={admin.email} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <span className="text-sm text-slate-700">{admin.email}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {admin.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
