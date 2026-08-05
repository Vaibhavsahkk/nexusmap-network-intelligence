'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Database Connection Issue',
  message = 'Unable to reach CognoDB Cloud graph engine. Please check network connectivity or retry.',
  onRetry,
}) {
  return (
    <div className="glass-card p-8 rounded-2xl border border-rose-500/30 bg-rose-950/20 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-300 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-sm font-semibold border border-rose-500/40 transition-all"
        >
          <RefreshCw className="w-4 h-4 animate-spin-once" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}
