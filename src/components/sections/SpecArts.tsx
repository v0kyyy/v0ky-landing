import type { ReactNode } from "react";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="size-full"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden
    >
      <rect width="400" height="400" fill="#121014" />
      <g stroke="#f2f1ef" strokeOpacity="0.045" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>
      {children}
    </svg>
  );
}

function SpeedArt() {
  return (
    <Frame>
      <circle cx="318" cy="78" r="92" fill="none" stroke="#4a0e0e" strokeWidth="18" />
      <circle cx="318" cy="78" r="58" fill="none" stroke="#e8332a" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="318" cy="78" r="28" fill="#e8332a" fillOpacity="0.18" />
      <path
        d="M168 210 L248 92 L236 92 L292 28 L248 148 L262 148 Z"
        fill="#e8332a"
        fillOpacity="0.9"
      />
      <g fill="none" stroke="#e8332a" strokeWidth="2" strokeLinecap="round">
        <path d="M40 300 H170" strokeOpacity="0.25" />
        <path d="M40 322 H130" strokeOpacity="0.15" />
        <path d="M210 58 H360" strokeOpacity="0.4" />
      </g>
    </Frame>
  );
}

function ParsingArt() {
  return (
    <Frame>
      {[
        [250, 46],
        [318, 38],
        [372, 72],
        [236, 108],
        [300, 96],
        [358, 128],
        [268, 162],
        [332, 170],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 9 : 5} fill={i === 4 ? "#e8332a" : "#8a8783"} fillOpacity={i === 4 ? 1 : 0.45} />
      ))}
      <g stroke="#e8332a" strokeOpacity="0.35" strokeWidth="1.2">
        <path d="M250 46 L300 96 L318 38 M300 96 L372 72 M300 96 L358 128 M300 96 L236 108 M300 96 L268 162 M300 96 L332 170" fill="none" />
      </g>
      <rect x="48" y="248" width="132" height="88" rx="8" fill="#1a181c" stroke="#2a2626" />
      <rect x="62" y="266" width="104" height="6" rx="3" fill="#e8332a" fillOpacity="0.7" />
      <rect x="62" y="282" width="78" height="6" rx="3" fill="#6e6b67" fillOpacity="0.5" />
      <rect x="62" y="298" width="92" height="6" rx="3" fill="#6e6b67" fillOpacity="0.35" />
    </Frame>
  );
}

function SmmArt() {
  return (
    <Frame>
      <g fill="none" stroke="#e8332a" strokeOpacity="0.4" strokeWidth="1.4">
        <path d="M220 70 L286 48 L348 86 L310 142 L248 128 Z" />
        <path d="M286 48 L310 142" />
        <path d="M220 70 L248 128" />
      </g>
      {[
        [220, 70, 16],
        [286, 48, 22],
        [348, 86, 14],
        [310, 142, 18],
        [248, 128, 12],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i === 1 ? "#e8332a" : "#1c191d"} stroke="#e8332a" strokeWidth="1.5" />
      ))}
      <g fill="#6e6b67" fillOpacity="0.55">
        <rect x="52" y="250" width="44" height="56" rx="6" />
        <rect x="104" y="232" width="44" height="74" rx="6" />
        <rect x="156" y="262" width="44" height="44" rx="6" />
      </g>
    </Frame>
  );
}

function TradingArt() {
  const candles = [
    [220, 120, 70, true],
    [248, 90, 88, false],
    [276, 70, 64, true],
    [304, 48, 96, true],
    [332, 86, 72, false],
    [360, 40, 80, true],
  ] as const;
  return (
    <Frame>
      <path
        d="M40 280 C 90 250, 130 300, 180 240 S 250 160, 320 90 S 360 70, 390 40"
        fill="none"
        stroke="#e8332a"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      {candles.map(([x, y, h, up], i) => (
        <g key={i}>
          <line x1={x + 6} y1={y - 14} x2={x + 6} y2={y + h + 10} stroke="#e8332a" strokeOpacity="0.5" strokeWidth="1.5" />
          <rect x={x} y={y} width="12" height={h} fill={up ? "#e8332a" : "#4a0e0e"} />
        </g>
      ))}
    </Frame>
  );
}

function DashboardsArt() {
  const bars = [48, 72, 40, 96, 64, 120, 88];
  return (
    <Frame>
      <rect x="200" y="28" width="176" height="112" rx="10" fill="#1a181c" stroke="#2a2626" />
      <path d="M216 112 L248 88 L280 96 L312 58 L352 70 L360 48" fill="none" stroke="#e8332a" strokeWidth="2" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={48 + i * 22}
          y={320 - h}
          width="14"
          height={h}
          rx="2"
          fill={i === 5 ? "#e8332a" : "#3a3333"}
        />
      ))}
      <circle cx="352" cy="70" r="4" fill="#e8332a" />
    </Frame>
  );
}

function SalesArt() {
  return (
    <Frame>
      <path d="M210 36 H380 L348 96 H242 Z" fill="#e8332a" fillOpacity="0.22" stroke="#e8332a" strokeWidth="1.5" />
      <path d="M242 108 H348 L328 168 H262 Z" fill="#e8332a" fillOpacity="0.4" stroke="#e8332a" strokeWidth="1.5" />
      <path d="M262 180 H328 L312 248 H278 Z" fill="#e8332a" fillOpacity="0.75" />
      <g fill="#e8332a">
        <circle cx="72" cy="86" r="5" />
        <circle cx="108" cy="86" r="5" opacity="0.5" />
        <circle cx="144" cy="86" r="5" opacity="0.25" />
      </g>
      <path d="M80 86 H210" stroke="#e8332a" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
    </Frame>
  );
}

function SupportArt() {
  return (
    <Frame>
      <circle cx="300" cy="92" r="86" fill="none" stroke="#4a0e0e" strokeWidth="14" />
      <circle cx="300" cy="92" r="58" fill="none" stroke="#e8332a" strokeOpacity="0.45" strokeWidth="2" />
      <path
        d="M268 70 C268 52 332 52 332 70 V92 C348 92 348 118 330 124 V136 H270 V124 C252 118 252 92 268 92 Z"
        fill="none"
        stroke="#e8332a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="48" y="236" width="120" height="36" rx="14" fill="#1c191d" stroke="#2a2626" />
      <rect x="88" y="284" width="150" height="36" rx="14" fill="#e8332a" fillOpacity="0.2" stroke="#e8332a" strokeOpacity="0.5" />
    </Frame>
  );
}

function SystemsArt() {
  const boxes = [
    [214, 36],
    [318, 36],
    [214, 132],
    [318, 132],
  ];
  return (
    <Frame>
      {boxes.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="68" height="52" rx="8" fill="#1a181c" stroke={i === 3 ? "#e8332a" : "#2a2626"} strokeWidth="1.5" />
      ))}
      <g stroke="#e8332a" strokeWidth="1.6" fill="none">
        <path d="M248 88 V132" />
        <path d="M352 88 V132" />
        <path d="M282 62 H318" />
        <path d="M282 158 H318" />
      </g>
      <circle cx="300" cy="110" r="8" fill="#e8332a" />
      <path d="M48 280 H160" stroke="#6e6b67" strokeOpacity="0.4" strokeWidth="2" />
      <circle cx="160" cy="280" r="4" fill="#e8332a" />
    </Frame>
  );
}

function DocsArt() {
  return (
    <Frame>
      <rect x="236" y="52" width="110" height="142" rx="6" fill="#1a181c" stroke="#2a2626" transform="rotate(-8 291 123)" />
      <rect x="250" y="40" width="110" height="142" rx="6" fill="#161418" stroke="#e8332a" strokeOpacity="0.55" />
      <rect x="268" y="62" width="74" height="6" rx="3" fill="#e8332a" fillOpacity="0.8" />
      <rect x="268" y="80" width="58" height="5" rx="2" fill="#6e6b67" fillOpacity="0.45" />
      <rect x="268" y="94" width="66" height="5" rx="2" fill="#6e6b67" fillOpacity="0.3" />
      <circle cx="330" cy="156" r="16" fill="#e8332a" />
      <path d="M323 156 L328 161 L339 148" fill="none" stroke="#f2f1ef" strokeWidth="2.2" strokeLinecap="round" />
      <g fill="none" stroke="#e8332a" strokeOpacity="0.4" strokeWidth="1.5">
        <path d="M72 250 H150" />
        <path d="M150 250 L150 310 L220 310" />
      </g>
    </Frame>
  );
}

const arts: Record<string, () => ReactNode> = {
  speed: SpeedArt,
  parsing: ParsingArt,
  smm: SmmArt,
  trading: TradingArt,
  dashboards: DashboardsArt,
  sales: SalesArt,
  support: SupportArt,
  systems: SystemsArt,
  docs: DocsArt,
};

export function SpecArt({ id }: { id: string }) {
  const Art = arts[id];
  return Art ? <Art /> : null;
}
