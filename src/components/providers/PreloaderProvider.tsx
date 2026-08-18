"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PreloaderContextValue = {
  /** true, когда прелоадер завершил exit-анимацию (или был пропущен) — сигнал для intro-анимаций hero */
  done: boolean;
  finish: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue>({
  done: false,
  finish: () => {},
});

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  const value = useMemo(() => ({ done, finish }), [done, finish]);
  return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>;
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
