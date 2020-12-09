import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "./utils/cookieHelper";
import * as api from "./utils/api";

import { v4 } from "uuid";
import { arrayToMap } from "./utils/data.util";

const Context = React.createContext();

export function Provider(props) {
  const [auth, setAuth] = useState({ isAuth: null, user: null });

  useEffect(() => {
    const isLogin = getCookie("auth");
    if (isLogin) {
      refreshToken();
    } else setAuth({ isAuth: false, user: null });
  }, []);

  const __setUser = (data) => {
    const { user, refreshTTL } = data;
    api.setToken(user.token);
    setCookie("auth", v4(), refreshTTL);
    setAuth({
      isAuth: true,
      user,
    });
  };

  const signIn = async (req) => {
    try {
      const { data } = await api.requestLogin(req);
      if (data.status === "success") {
        __setUser(data.data);
      }
      return data;
    } catch (err) {
      setAuth({ isAuth: false, user: null });
      console.log(err);
      return err;
    }
  };

  const refreshToken = async () => {
    try {
      const {
        data: { data },
      } = await api.requestTokenRefresh();
      if (data) __setUser(data);
    } catch (err) {
      setAuth({ isAuth: false, user: null });
    }
  };

  return (
    <Context.Provider
      value={{
        auth,
        signIn,
        refreshToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
