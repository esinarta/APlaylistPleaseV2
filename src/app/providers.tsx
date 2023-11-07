"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};

export default Providers;
