"use client";

import { ReactQueryProvider } from "./providers";

export function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
