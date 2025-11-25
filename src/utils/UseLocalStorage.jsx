// src/utils/useLocalStorage.js
import { useState } from "react";
export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  const setValue = (val) => { setState(val); localStorage.setItem(key, JSON.stringify(val)); };
  return [state, setValue];
}
