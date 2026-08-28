"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import { useI18n } from "@/components/providers/LocaleProvider";

function TypingDots() {
  return (
    <span className="flex h-7 items-center gap-1 px-1" aria-hidden>
      <i className="chat-dot size-1.5 rounded-full bg-current" />
      <i className="chat-dot size-1.5 rounded-full bg-current" />
      <i className="chat-dot size-1.5 rounded-full bg-current" />
    </span>
  );
}

export default function ContactChat() {
  const { locale, t, ready } = useI18n();
  const phoneRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const phone = phoneRef.current;
      const thread = threadRef.current;
      const typing = typingRef.current;
      const bubbles = thread?.querySelectorAll<HTMLElement>("[data-bubble]");
      if (!phone || !thread || !typing || !bubbles?.length) return;
      if (!ready) return;

      const scrollBottom = () => {
        thread.scrollTop = thread.scrollHeight;
      };

      const hideThread = () => {
        gsap.set(bubbles, { autoAlpha: 0, y: 12, display: "none" });
        gsap.set(typing, { autoAlpha: 0, display: "none" });
        thread.scrollTop = 0;
      };

      if (prefersReducedMotion()) {
        gsap.set(bubbles, { autoAlpha: 1, y: 0, display: "block" });
        gsap.set(typing, { autoAlpha: 0, display: "none" });
        scrollBottom();
        return;
      }

      hideThread();

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      bubbles.forEach((bubble, i) => {
        const fromMe = bubble.dataset.from === "me";
        tl.call(
          () => {
            typing.dataset.from = fromMe ? "me" : "client";
          },
          undefined,
          i === 0 ? "+=0.35" : "+=0.45"
        );
        tl.set(typing, { display: "block" });
        tl.to(typing, { autoAlpha: 1, duration: 0.18 });
        tl.call(scrollBottom);
        tl.to(typing, { autoAlpha: 0, duration: 0.14 }, "+=0.72");
        tl.set(typing, { display: "none" });
        tl.set(bubble, { display: "block" });
        tl.to(bubble, { autoAlpha: 1, y: 0, duration: 0.32 });
        tl.call(scrollBottom);
      });

      const playOnce = () => {
        if (tl.progress() < 1) tl.play();
      };
      const pauseIfRunning = () => {
        if (tl.progress() < 1) tl.pause();
      };

      const trigger = ScrollTrigger.create({
        trigger: phone,
        start: "top 82%",
        end: "bottom 12%",
        onEnter: playOnce,
        onEnterBack: playOnce,
        onLeave: pauseIfRunning,
        onLeaveBack: pauseIfRunning,
      });

      return () => {
        trigger.kill();
        tl.kill();
      };
    },
    { scope: phoneRef, dependencies: [locale, ready] }
  );

  return (
    <div
      ref={phoneRef}
      className="pointer-events-none relative mx-auto w-full max-w-[280px] shrink-0 select-none sm:max-w-[300px]"
      aria-hidden
    >
      <div className="relative overflow-hidden rounded-[2.35rem] border border-line-strong bg-[#0c0c0e] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 rounded-[2.35rem] ring-1 ring-inset ring-white/10" />
        <div className="mx-auto mt-2.5 h-[22px] w-[92px] rounded-full bg-black" />

        <header className="flex items-center gap-2.5 border-b border-line px-4 pb-3 pt-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-accent/15 font-mono text-[11px] font-semibold text-accent">
            {t.contact.chatPeer.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-fg">{t.contact.chatPeer}</p>
            <p className="flex items-center gap-1.5 font-mono text-[10px] text-online">
              <span className="size-1.5 rounded-full bg-online" />
              {t.contact.chatOnline}
            </p>
          </div>
          <span className="ml-auto font-mono text-[10px] text-dim">{t.contact.chatTime}</span>
        </header>

        <div
          ref={threadRef}
          className="flex h-[420px] flex-col gap-2 overflow-y-auto bg-[#111013] px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {t.contact.chatMessages.map((msg, i) => (
            <div
              key={`${locale}-${i}`}
              data-bubble
              data-from={msg.from}
              className={`max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug opacity-0 ${
                msg.from === "me"
                  ? "ml-auto rounded-br-md bg-accent/90 text-bg"
                  : "rounded-bl-md bg-surface text-fg"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div
            ref={typingRef}
            data-from="client"
            className="max-w-[42%] rounded-2xl rounded-bl-md bg-surface px-3 py-1.5 text-muted opacity-0 data-[from=me]:ml-auto data-[from=me]:rounded-br-md data-[from=me]:rounded-bl-2xl data-[from=me]:bg-accent/90 data-[from=me]:text-bg"
          >
            <TypingDots />
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-line px-3 py-3">
          <div className="h-9 flex-1 rounded-full border border-line bg-surface-deep px-3 font-mono text-[11px] leading-9 text-dim">
            …
          </div>
          <span className="flex size-9 items-center justify-center rounded-full bg-accent/90 text-[11px] font-semibold text-bg">
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}
