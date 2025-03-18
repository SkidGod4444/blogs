import { useEffect, useState, useCallback } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const parseStoredValue = useCallback((stored: string | null): T => {
    if (stored === null) return initialValue;
    try {
      return JSON.parse(stored);
    } catch {
      return stored as T; // Fallback for non-JSON values
    }
  }, [initialValue]);

  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const storedValue = localStorage.getItem(key);
    return parseStoredValue(storedValue);
  });

  const setLocalStorageValue = (newValue: T | ((prev: T) => T)) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setValue(parseStoredValue(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, parseStoredValue]);

  return [value, setLocalStorageValue] as const;
};

export default useLocalStorage;