"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(item: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const loadValue = () => {
      const storedValue = localStorage.getItem(item);

      if (storedValue) {
        setValue(JSON.parse(storedValue));
      }
    };

    loadValue();

    window.addEventListener("storage", loadValue);
    window.addEventListener("local-storage", loadValue);

    return () => {
      window.removeEventListener("storage", loadValue);
      window.removeEventListener("local-storage", loadValue);
    };
  }, [item]);

  const updateLocalStorage = (newValue: T) => {
    setValue(newValue);

    localStorage.setItem(item, JSON.stringify(newValue));

    window.dispatchEvent(new Event("local-storage"));
  };

  return {
    value,
    updateLocalStorage,
  };
}
