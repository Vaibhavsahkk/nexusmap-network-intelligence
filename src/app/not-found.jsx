import Link from 'next/link';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="glass-card p-12 rounded-3xl border border-[#D4AF37]/30 text-center max-w-md mx-auto my-12 space-y-6 bg-white/90 shadow-xl">
      <div className="w-16 h-16 rounded-2xl bg-[#1A1815] border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] mx-auto shadow-sm">
        <Search className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#1A1815]">404 — Graph Node Not Found</h2>
        <p className="text-xs font-medium text-[#8C847A]">
          The requested graph node or page does not exist in your CognoDB dataset.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1815] hover:bg-[#2A2621] text-[#E5C158] text-xs font-bold border border-[#D4AF37]/40 transition-all shadow-md shadow-[#1A1815]/10"
        >
          <Home className="w-4 h-4 text-[#E5C158]" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
