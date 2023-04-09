/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useStateStorage } from "../hooks/use-state-storage";
import { ToasterContext } from "./ToasterContext";
import { loginUser } from "../service/auth";
import { useHistory } from "react-router-dom";
import { LoadingContext } from "./Loading";
import pageURL from "../utils/pageUrls";
import { tryCatch } from "@thalesrc/js-utils";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  let history = useHistory();
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const { openToaster } = useContext(ToasterContext);
  const [token, setToken, removeToken] = useStateStorage("token");
  const [user, setUser, removeUser] = useStateStorage("user");
  const [language, setLanguage] = useStateStorage("language");


  const loginRequest = async (payload) => {
    const [err, res] = await tryCatch(loginUser(payload));
    if (err) {
      openToaster("top-right", { severity: "error", summary: "Hatalı Giriş", detail: "Bilgilerinizi Kontrol Ediniz", life: 3000 });
      hideLoading();
      return;
    }
    if (res?.accessToken) {
      setToken(res?.accessToken);
      setUser(res);
      history.push(pageURL.home);
    }
    hideLoading();
  };

  const login = useCallback(
    (payload) => {
      loginRequest(payload);
      showLoading();
      return;
    },
    [hideLoading, history, setToken, showLoading]
  );

  const logout = useCallback(() => {
    removeToken("token");
    removeUser("user");
    history.push(pageURL.login);
  }, [history, removeToken]);

  const context = useMemo(() => ({ user, token, login, logout, language, setLanguage }), [user, token, login, logout, language, setLanguage]);

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
