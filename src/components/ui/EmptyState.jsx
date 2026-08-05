import { SearchX, Sparkles } from 'lucide-react';

export default function EmptyState({
  title = 'No network matches found',
  description = 'Try adjusting your search keywords or explore people by skills and title.',
  onReset,
}) {
  return (
    <div className="glass-card p-10 rounded-3xl border border-[#D4AF37]/20 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8 bg-white/90 shadow-lg">
      <div className="w-16 h-16 rounded-2xl bg-[#1A1815] border border-[#D4AF37]/40 flex items-center justify-center mb-4 text-[#E5C158] shadow-sm">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-[#1A1815] mb-2">{title}</h3>
      <p className="text-sm font-medium text-[#5A544A] mb-6 leading-relaxed">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1815] hover:bg-[#2A2621] text-[#E5C158] text-xs font-bold border border-[#D4AF37]/40 transition-all shadow-md shadow-[#1A1815]/10"
        >
          <Sparkles className="w-4 h-4 text-[#E5C158]" />
          <span>Reset Search</span>
        </button>
      )}
    </div>
  );
}
