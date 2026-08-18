/** Фиксированный край оверлея: широкая впадина слева, гребень справа под портретом. */
export default function WavyEdge() {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none relative block h-28 w-full md:h-40 lg:h-48"
    >
      <path
        className="fill-bg"
        d="M0 96
           C 220 128, 380 168, 540 176
           C 700 184, 860 92, 1080 34
           C 1220 8, 1340 44, 1440 58
           L 1440 200 L 0 200 Z"
      />
    </svg>
  );
}
