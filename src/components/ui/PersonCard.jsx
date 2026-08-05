import Link from 'next/link';
import Image from 'next/image';
import { GitFork, Users, Zap, ChevronRight } from 'lucide-react';
import { formatDegreeLabel } from '@/lib/utils.js';

export default function PersonCard({ person }) {
  const { id, name, title, avatar, degree, mutualCount, maxStrength } = person;

  const badgeClass =
    degree === 1 ? 'badge-degree-1' : degree === 2 ? 'badge-degree-2' : 'badge-degree-3';

  return (
    <div className="glass-card p-6 rounded-2xl border border-[#D4AF37]/25 hover:border-[#C59B27] flex flex-col justify-between group transition-all bg-gradient-to-b from-white/95 to-[#F8F5EE]/90 shadow-md hover:shadow-xl hover:shadow-[#D4AF37]/10">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 bg-[#FAF7F2] shrink-0 shadow-sm">
              <Image
                src={avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`}
                alt={name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h3 className="font-bold text-[#1A1815] group-hover:text-[#C59B27] transition-colors line-clamp-1">
                {name}
              </h3>
              <p className="text-xs font-medium text-[#5A544A] line-clamp-1">{title}</p>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full shrink-0 shadow-xs ${badgeClass}`}>
            {formatDegreeLabel(degree)}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="px-3 py-2 rounded-xl bg-[#F3EFE6]/70 border border-[#D4AF37]/15 flex items-center gap-2 text-xs">
            <Users className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
            <span className="text-[#5A544A] truncate">
              <strong className="text-[#1A1815]">{mutualCount || 0}</strong> mutuals
            </span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-[#F3EFE6]/70 border border-[#D4AF37]/15 flex items-center gap-2 text-xs">
            <Zap className="w-3.5 h-3.5 text-[#B38612] shrink-0" />
            <span className="text-[#5A544A] truncate">
              <strong className="text-[#1A1815]">{maxStrength || 5}</strong>/10 strength
            </span>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-2 pt-3.5 border-t border-[#D4AF37]/15">
        <Link
          href={`/path?to=${id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1A1815] hover:bg-[#2A2621] text-[#E5C158] text-xs font-bold border border-[#D4AF37]/30 transition-all shadow-sm"
        >
          <GitFork className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Warm Intro Path</span>
        </Link>

        <Link
          href={`/person/${id}`}
          className="flex items-center justify-center p-2.5 rounded-xl bg-[#F3EFE6] hover:bg-[#EAE4D7] text-[#1A1815] border border-[#D4AF37]/20 transition-colors"
          title="View Node Profile"
        >
          <ChevronRight className="w-4 h-4 text-[#8C847A]" />
        </Link>
      </div>
    </div>
  );
}
