import { useState, useEffect } from "react";

export const getStorageValue = (key: string) => {
  // getting stored value
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
};

export const setStorageValue = (key: string, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
