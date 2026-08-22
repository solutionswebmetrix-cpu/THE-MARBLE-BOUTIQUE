const WORDS = [
  'Italian Marble',
  'Statuario',
  'Onyx',
  'Granite',
  'Custom Carving',
  'Quartz',
  'Calacatta',
  'Sandstone',
  'Temples',
  'Fireplaces',
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-[#c8a646]/15 bg-[#111111] py-5">
      <div className="flex w-max animate-marquee">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-heading text-xl italic text-white/70 md:text-2xl">{w}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8a646]" />
          </span>
        ))}
      </div>
    </div>
  );
}
