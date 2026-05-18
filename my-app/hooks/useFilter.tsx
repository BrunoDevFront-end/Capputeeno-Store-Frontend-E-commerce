"use client";

import { FilterContext } from "../components/contexts/filterContext";
import { useContext } from "react";

export function useFilter() {
  return useContext(FilterContext);
}
