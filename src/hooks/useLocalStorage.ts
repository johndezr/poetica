export const getStorageValue = (key: string) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
};

export const setStorageValue = (key: string, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
