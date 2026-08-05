import { findShortestPath } from '@/lib/db/queries/path.js';
import PathDisplay from '@/components/path/PathDisplay.jsx';
import { GitFork, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PathPage({ searchParams }) {
  const { to, from } = await searchParams;
  const targetId = to || 'person-10';
  const fromId = from || null;

  let pathData = { found: false };
  try {
    pathData = await findShortestPath(targetId, fromId);
  } catch (err) {
    console.error('Path page error:', err);
  }

  const sampleTargets = [
    { id: 'person-10', name: 'VP of Eng' },
    { id: 'person-25', name: 'CTO at Stripe' },
    { id: 'person-50', name: 'Senior AI Lead' },
    { id: 'person-85', name: 'Product Director' },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-card px-10 py-16 sm:px-14 sm:py-20 rounded-3xl border border-[#D4AF37]/30 text-center bg-gradient-to-b from-white to-[#F8F5EE] shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#1A1815] border border-[#D4AF37]/40 text-[#E5C158] text-[13px] font-bold shadow-md tracking-wide">
          <GitFork className="w-4 h-4 text-[#E5C158]" />
          <span>openCypher shortestPath Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1815] max-w-3xl mx-auto leading-tight">
          Warm Introduction Path Finder <span className="font-serif-title text-[#C59B27] font-normal italic">⭐</span>
        </h1>
        <p className="text-sm sm:text-base font-medium text-[#5A544A] max-w-xl mx-auto leading-relaxed tracking-wide">
          Discover the shortest, highest-strength warm introduction path between you and any target executive node (bounded strictly to 5 hops).
        </p>

        {/* Demo Target Shortcut Chips */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-bold text-[#8C847A] mr-1 flex items-center gap-1.5 uppercase font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            Sample Evaluation Targets:
          </span>
          {sampleTargets.map((target) => (
            <Link
              key={target.id}
              href={`/path?to=${target.id}`}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 tracking-wide ${
                targetId === target.id
                  ? 'bg-[#1A1815] text-[#E5C158] border-[#D4AF37]/50 shadow-md shadow-[#1A1815]/15'
                  : 'bg-white text-[#5A544A] border-[#D4AF37]/25 hover:text-[#1A1815] hover:border-[#C59B27] shadow-xs'
              }`}
            >
              {target.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Path Display */}
      <PathDisplay pathData={pathData} />
    </div>
  );
}
