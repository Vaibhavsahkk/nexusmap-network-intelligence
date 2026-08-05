import { SearchX, Sparkles } from 'lucide-react';

export default function EmptyState({
  title = 'No network matches found',
  description = 'Try adjusting your search keywords or explore people by skills and title.',
  onReset,
}) {
  return (
    <div className="glass-card p-10 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium border border-cyan-500/30 transition-all shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="w-4 h-4" />
          <span>Reset Search</span>
        </button>
      )}
    </div>
  );
}
