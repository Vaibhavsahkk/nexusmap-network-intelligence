export default function StatCard({ label, value, icon: Icon, color = 'gold', subtitle }) {
  const colorMap = {
    gold: 'from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#C59B27] border-[#D4AF37]/30',
    purple: 'from-[#7C3AED]/15 to-[#7C3AED]/5 text-[#7C3AED] border-[#7C3AED]/30',
    emerald: 'from-[#0D8A58]/15 to-[#0D8A58]/5 text-[#0D8A58] border-[#0D8A58]/30',
  };

  const style = colorMap[color] || colorMap.gold;

  return (
    <div className="glass-card px-7 py-8 rounded-2xl border border-[#D4AF37]/20 relative overflow-hidden group bg-gradient-to-b from-white/90 to-[#F8F5EE]/80 shadow-lg shadow-[#3D3528]/5">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8C847A]">{label}</span>
        {Icon && (
          <div className={`p-3 rounded-xl bg-gradient-to-b border ${style}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="text-4xl font-extrabold text-[#1A1815] tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300 origin-left">
        {value}
      </div>
      {subtitle && <p className="text-[13px] font-medium text-[#5A544A] tracking-wide">{subtitle}</p>}
    </div>
  );
}
