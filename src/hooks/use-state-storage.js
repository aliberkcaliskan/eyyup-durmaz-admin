import { useState, useEffect, useCallback } from "react";

export const useStateStorage = (key, defaultValue) => {
  const [value, setState] = useState(defaultValue);

  useEffect(() => {
    const store = localStorage.getItem(key);
    if (store !== null) {
      try {
        setState(JSON.parse(store));
      } catch (error) {
        localStorage.removeItem(key);
      }
    }
  }, [key]);

  const setValue = useCallback(
    (newValue) => {
      setState(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  const removeValue = useCallback((Key) => {
    setState(null)
    localStorage.removeItem(Key);
  },[])

  return [value, setValue, removeValue];
};
