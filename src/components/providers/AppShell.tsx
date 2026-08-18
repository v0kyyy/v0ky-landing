"use client";

import type { ReactNode } from "react";
import SmoothScrollProvider from "./SmoothScrollProvider";
import { PreloaderProvider } from "./PreloaderProvider";
import { LocaleProvider } from "./LocaleProvider";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";

/** Клиентская обвязка: смус-скролл, прелоадер и кастомный курсор. */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <SmoothScrollProvider>
        <PreloaderProvider>
          <Preloader />
          <Cursor />
          {children}
        </PreloaderProvider>
      </SmoothScrollProvider>
    </LocaleProvider>
  );
}
