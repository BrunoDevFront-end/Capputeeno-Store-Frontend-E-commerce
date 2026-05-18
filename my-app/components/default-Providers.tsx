"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterContextProvider } from "./contexts/filterContext";
import { ThemeProvider } from "styled-components";
import { ReactNode } from "react";

interface DefaultProvidersProps {
  children: ReactNode;
}

const theme = {
  desktopBreakpoint: "968px",
  tableBreakpoint: "768px",
  MobileBreakpoint: "575px",
  smallMobileBreakpoint: "440px",
};

export function DefaultProviders({ children }: DefaultProvidersProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <FilterContextProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </FilterContextProvider>
    </QueryClientProvider>
  );
}
