"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/scroll";
import { useI18n } from "@/components/providers/LocaleProvider";

const ACCENT = "232, 51, 42";
const MUTED = "138, 135, 131";

/** Ряды упорядоченных частиц на выходе (смещения от центра по Y). */
const LANE_OFFSETS = [-26, 0, 26];
const ORDER_SPEED = 44; // px/s
const EMIT_INTERVAL = 0.85; // s — шаг между "тактами" процессора

type ChaosParticle = {
  x: number;
  y: number;
  speed: number;
  freq: number;
  phase: number;
  amp: number;
  r: number;
  a: number;
};

/**
 * Декоративная визуализация "из хаоса — к порядку": слева хаотично блуждающие
 * частицы затягиваются в узел automate(), справа выходят ровными рядами.
 */
export default function ChaosToOrder() {
  const { t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    let last = 0;
    let time = 0;
    let emitTimer = 0;
    let glow = 0;

    const chaos: ChaosParticle[] = [];
    const columns: number[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    const geom = () => {
      const cx = W * 0.5;
      const cy = H * 0.5;
      const bw = Math.min(122, Math.max(92, W * 0.17));
      const bh = 84;
      return { cx, cy, bw, bh, boxL: cx - bw / 2, boxR: cx + bw / 2 };
    };

    const respawn = (p: ChaosParticle, initial = false) => {
      const { boxL } = geom();
      p.x = initial ? rand(-20, boxL) : rand(-30, -4);
      p.y = rand(10, H - 10);
      p.speed = rand(22, 46);
      p.freq = rand(0.6, 1.8);
      p.phase = rand(0, Math.PI * 2);
      p.amp = rand(26, 64);
      p.r = rand(1.2, 2.4);
      p.a = rand(0.35, 0.8);
    };

    const initParticles = () => {
      chaos.length = 0;
      const count = Math.round(Math.min(44, Math.max(18, W / 20)));
      for (let i = 0; i < count; i++) {
        const p = {} as ChaosParticle;
        respawn(p, true);
        chaos.push(p);
      }
      columns.length = 0;
      const { boxR } = geom();
      const spacing = ORDER_SPEED * EMIT_INTERVAL;
      for (let x = boxR; x < W; x += spacing) columns.push(x);
      emitTimer = 0;
    };

    const updateChaos = (p: ChaosParticle, dt: number) => {
      const { cy, boxL } = geom();
      p.x += (p.speed + Math.sin(time * 0.7 * p.freq + p.phase * 2) * 14) * dt;
      const funnelStart = boxL - 80;
      const wobble =
        Math.sin(time * p.freq + p.phase) +
        0.6 * Math.sin(time * p.freq * 2.3 + p.phase * 3);
      if (p.x < funnelStart) {
        p.y += wobble * p.amp * dt;
      } else {
        // Воронка: чем ближе к узлу, тем сильнее притяжение к центру
        const k = clamp01((p.x - funnelStart) / (boxL - funnelStart));
        p.y += (cy - p.y) * Math.min(1, 8 * k * dt);
        p.y += wobble * p.amp * (1 - k) * dt;
      }
      if (p.y < 8) p.y = 8;
      else if (p.y > H - 8) p.y = H - 8;
      if (p.x >= boxL + 4) respawn(p);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { cy, bh, boxL, boxR } = geom();

      // Линии рядов на выходе
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${ACCENT}, 0.09)`;
      for (const off of LANE_OFFSETS) {
        ctx.beginPath();
        ctx.moveTo(boxR, cy + off);
        ctx.lineTo(W, cy + off);
        ctx.stroke();
      }

      // Упорядоченные колонны частиц
      for (const x of columns) {
        const a = clamp01((x - boxR) / 14) * clamp01((W - x) / 56);
        if (a <= 0) continue;
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.16 * a})`;
        ctx.beginPath();
        ctx.moveTo(x, cy + LANE_OFFSETS[0]);
        ctx.lineTo(x, cy + LANE_OFFSETS[LANE_OFFSETS.length - 1]);
        ctx.stroke();
        ctx.fillStyle = `rgba(${ACCENT}, ${0.9 * a})`;
        for (const off of LANE_OFFSETS) {
          ctx.beginPath();
          ctx.arc(x, cy + off, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Хаотичные частицы слева
      for (const p of chaos) {
        const a = p.a * clamp01(p.x / 36 + 0.15);
        if (a <= 0) continue;
        ctx.fillStyle = `rgba(${MUTED}, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Узел-процессор
      const by = cy - bh / 2;
      ctx.beginPath();
      ctx.roundRect(boxL, by, boxR - boxL, bh, 10);
      ctx.fillStyle = "#141214";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
      ctx.stroke();
      if (glow > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.55 * glow})`;
        ctx.shadowColor = `rgba(${ACCENT}, ${0.8 * glow})`;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.roundRect(boxL, by, boxR - boxL, bh, 10);
        ctx.stroke();
        ctx.restore();
      }

      // Насечки: вход слева, выходы рядов справа
      ctx.strokeStyle = `rgba(${MUTED}, 0.9)`;
      ctx.beginPath();
      ctx.moveTo(boxL, cy);
      ctx.lineTo(boxL + 5, cy);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${ACCENT}, 0.85)`;
      for (const off of LANE_OFFSETS) {
        ctx.beginPath();
        ctx.moveTo(boxR - 5, cy + off);
        ctx.lineTo(boxR, cy + off);
        ctx.stroke();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      time += dt;

      emitTimer += dt;
      if (emitTimer >= EMIT_INTERVAL) {
        emitTimer -= EMIT_INTERVAL;
        columns.push(geom().boxR);
        glow = 1;
      }
      glow = Math.max(0, glow - dt * 2.4);

      for (let i = columns.length - 1; i >= 0; i--) {
        columns[i] += ORDER_SPEED * dt;
        if (columns[i] > W + 4) columns.splice(i, 1);
      }
      for (const p of chaos) updateChaos(p, dt);

      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      draw();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: "80px" }
    );
    io.observe(wrap);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      data-chaos-flow
      className="relative mt-8 h-44 overflow-hidden rounded-xl border border-line bg-surface-deep/50"
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] tracking-wide text-fg/75">
        automate()
      </span>
      <span className="pointer-events-none absolute left-3 top-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
        {t.about.flow.input}
      </span>
      <span className="pointer-events-none absolute right-3 top-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent/80">
        {t.about.flow.output}
      </span>
    </div>
  );
}
