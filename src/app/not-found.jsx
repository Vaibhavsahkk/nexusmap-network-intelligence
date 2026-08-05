import Link from 'next/link';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="glass-card p-12 rounded-3xl border border-white/10 text-center max-w-md mx-auto my-12 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
        <Search className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-100">404 — Node Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested graph node or page does not exist in your CognoDB dataset.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
