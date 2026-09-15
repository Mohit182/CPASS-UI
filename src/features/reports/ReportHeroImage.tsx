/** Warm "analyst at a tablet" hero stand-in: gradient panel with chart glyphs. */
export function ReportHeroImage() {
  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-hero bg-[linear-gradient(135deg,#F9E1C2_0%,#F4B27A_45%,#B8613D_100%)] shadow-card">
      <div className="absolute inset-x-10 bottom-8 top-24 rounded-xl bg-white/85 p-4 shadow-card backdrop-blur-sm">
        <div className="flex h-full items-end gap-1.5">
          {[38, 52, 30, 64, 48, 72, 40, 58, 66, 34, 60, 46, 70, 52, 44, 62].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i % 3 === 0 ? '#F58A1F' : i % 3 === 1 ? '#EF4444' : '#FBBF24' }} />
          ))}
        </div>
        <svg viewBox="0 0 200 60" className="absolute left-4 top-4 h-14 w-40" aria-hidden>
          <path d="M0 45 C 30 20, 50 50, 80 30 S 130 10, 200 25" fill="none" stroke="#EF4444" strokeWidth="2" />
          <path d="M0 50 C 40 35, 60 55, 100 40 S 160 20, 200 35" fill="none" stroke="#F58A1F" strokeWidth="2" />
        </svg>
        <span className="absolute right-6 top-4 h-16 w-16 rounded-full bg-[conic-gradient(#F58A1F_0_40%,#EF4444_40%_70%,#FBBF24_70%_100%)]" />
      </div>
      <div className="absolute -left-10 top-6 h-40 w-64 -rotate-[25deg] rounded-full bg-[#F6C9A5]/80 blur-sm" />
    </div>
  );
}
