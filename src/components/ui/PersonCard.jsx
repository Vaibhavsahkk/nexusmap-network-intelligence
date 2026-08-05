import Link from 'next/link';
import Image from 'next/image';
import { GitFork, Users, Zap, ChevronRight } from 'lucide-react';
import { formatDegreeLabel } from '@/lib/utils.js';

export default function PersonCard({ person }) {
  const { id, name, title, avatar, degree, mutualCount, maxStrength } = person;

  const badgeClass =
    degree === 1 ? 'badge-degree-1' : degree === 2 ? 'badge-degree-2' : 'badge-degree-3';

  return (
    <div className="glass-card p-7 rounded-3xl border border-[#D4AF37]/25 hover:border-[#C59B27] flex flex-col justify-between group transition-all duration-300 bg-gradient-to-b from-white/95 to-[#F8F5EE]/90 shadow-md hover:shadow-2xl hover:shadow-[#D4AF37]/15">
      <div>
        <div className="flex items-start justify-between gap-3.5 mb-5">
          <div className="flex items-center gap-4">
            <div className="relative w-13 h-13 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 bg-[#FAF7F2] shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Image
                src={avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`}
                alt={name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-base text-[#1A1815] group-hover:text-[#C59B27] transition-colors line-clamp-1 tracking-tight">
                {name}
              </h3>
              <p className="text-xs font-medium text-[#5A544A] line-clamp-1 tracking-wide">{title}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-[11px] font-bold tracking-wider rounded-full shrink-0 shadow-xs uppercase font-mono ${badgeClass}`}>
            {formatDegreeLabel(degree)}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="px-3.5 py-2.5 rounded-xl bg-[#F3EFE6]/80 border border-[#D4AF37]/20 flex items-center gap-2.5 text-xs">
            <Users className="w-4 h-4 text-[#C59B27] shrink-0" />
            <span className="text-[#5A544A] truncate font-medium">
              <strong className="text-[#1A1815] font-bold">{mutualCount || 0}</strong> mutuals
            </span>
          </div>
          <div className="px-3.5 py-2.5 rounded-xl bg-[#F3EFE6]/80 border border-[#D4AF37]/20 flex items-center gap-2.5 text-xs">
            <Zap className="w-4 h-4 text-[#B38612] shrink-0" />
            <span className="text-[#5A544A] truncate font-medium">
              <strong className="text-[#1A1815] font-bold">{maxStrength || 5}</strong>/10 strength
            </span>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-2.5 pt-4 border-t border-[#D4AF37]/20">
        <Link
          href={`/path?to=${id}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1A1815] hover:bg-[#2A2621] text-[#E5C158] text-xs font-bold tracking-wider uppercase border border-[#D4AF37]/40 transition-all shadow-md shadow-[#1A1815]/10"
        >
          <GitFork className="w-4 h-4 text-[#E5C158]" />
          <span>Warm Intro Path</span>
        </Link>

        <Link
          href={`/person/${id}`}
          className="flex items-center justify-center p-3 rounded-xl bg-[#F3EFE6] hover:bg-[#EAE4D7] text-[#1A1815] border border-[#D4AF37]/25 transition-colors shadow-xs"
          title="View Node Profile"
        >
          <ChevronRight className="w-4 h-4 text-[#8C847A]" />
        </Link>
      </div>
    </div>
  );
}
