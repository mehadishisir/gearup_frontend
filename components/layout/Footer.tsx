import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold text-slate-900">GearUp</span>
            </div>
            <p className="text-sm text-slate-500">
              Rent premium sports and outdoor gear for your next adventure.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Company</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-orange-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Support</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/help" className="hover:text-orange-600">Help Center</Link></li>
              <li><Link href="/terms" className="hover:text-orange-600">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Newsletter</h3>
            <p className="text-sm text-slate-500">Get updates on new gear and offers.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
          © 2026 GearUp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
