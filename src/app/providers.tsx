"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
