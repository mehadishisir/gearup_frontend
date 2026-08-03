import Link from "next/link";
import { Users } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Overview</h1>
      <Link
        href="/dashboard/admin/users"
        className="flex items-center gap-3 rounded-xl border bg-white p-6 shadow-sm hover:border-orange-300 max-w-sm"
      >
        <Users className="h-8 w-8 text-orange-500" />
        <div>
          <p className="font-semibold text-slate-900">Manage Users</p>
          <p className="text-sm text-slate-500">View and moderate all users</p>
        </div>
      </Link>
    </div>
  );
}