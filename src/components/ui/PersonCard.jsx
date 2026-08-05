import Link from 'next/link';
import Image from 'next/image';
import { GitFork, Users, Zap, ChevronRight } from 'lucide-react';
import { formatDegreeLabel } from '@/lib/utils.js';

export default function PersonCard({ person }) {
  const { id, name, title, avatar, degree, mutualCount, maxStrength } = person;

  const badgeClass =
    degree === 1 ? 'badge-degree-1' : degree === 2 ? 'badge-degree-2' : 'badge-degree-3';

  return (
    <div className="glass-card p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between group transition-all">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cyan-500/30 bg-slate-800 shrink-0">
              <Image
                src={avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`}
                alt={name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
                {name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1">{title}</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full shrink-0 ${badgeClass}`}>
            {formatDegreeLabel(degree)}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2 text-xs">
            <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-300 truncate">
              <strong>{mutualCount || 0}</strong> mutuals
            </span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2 text-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-300 truncate">
              <strong>{maxStrength || 5}</strong>/10 strength
            </span>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <Link
          href={`/path?to=${id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/20 transition-all"
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>Warm Path</span>
        </Link>

        <Link
          href={`/person/${id}`}
          className="flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/5 transition-colors"
          title="View Profile"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
