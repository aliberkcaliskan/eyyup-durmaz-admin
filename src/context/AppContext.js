/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo, useState } from "react";
import { useStateStorage } from "../hooks/use-state-storage";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  // const [store, setStore] = useState({
  //   mode: "light",
  // });
  const [theme, setTheme] = useStateStorage("theme");

  const [actions, setActions] = useState({
    changeTheme: (mode) => setTheme(mode),
  });

  const context = useMemo(() => ({ actions, setActions, theme, setTheme }), [actions, setActions, theme, setTheme]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
