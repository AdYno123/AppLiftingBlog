import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GET_HTTP_REQUEST } from "./api-service";
import { IAccessToken, IAuthContext, ITenant } from "./stored-interface";

const AuthContext = createContext<IAuthContext>({
  token: "",
  isLogged: false,
  userInfo: {
    tenantId: "",
    apiKey: "",
    name: "",
    password: "",
    createdAt: "",
    lastUsedAt: "",
  },
  login: (loginInfo: IAccessToken): string => {
    return "";
  },
  logout: () => {},
});

export const AuthContextProvider: React.FC<{ children: JSX.Element }> = (
  props
) => {
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<ITenant>({
    tenantId: "",
    apiKey: "",
    name: "",
    password: "",
    createdAt: "",
    lastUsedAt: "",
  });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("expirationTime");
      if (expirationTime !== null && token !== null) {
        setToken(token);
        let tokenInfo: IAccessToken = {
          access_token: token,
          expires_in: +expirationTime,
          token_type: "",
        };
        loginHandler(tokenInfo);
      }
    } catch (error) {
      let err = error as Error;
      toast.error(`Re-Login failed: ${err}`);
    }
  }, []);

  /** login user to app with Token */
  const loginHandler = (loggedUser: IAccessToken) => {
    try {
      if (!loggedUser.access_token) {
        return "Token is Empty";
      }
      localStorage.setItem("token", loggedUser.access_token);
      localStorage.setItem("expirationTime", loggedUser.expires_in.toString());
      setToken(loggedUser.access_token);
      getUserInfoFromToken(loggedUser.access_token);
      setUserIsLoggedIn(true);
      return "OK";
    } catch (error) {
      let e = error as Error;
      return `Error with login - ${e.message}`;
    }
  };

  /**ge user info from server from token */
  const getUserInfoFromToken = (token: string) => {
    try {
      const articlesResponse = GET_HTTP_REQUEST<ITenant>(
        `tenants/23660bff-6c28-44a1-be5a-873e22a29a58`
      );
      articlesResponse.then((repsonseData) => {
        if (repsonseData.success) {
          if (repsonseData.data !== null) {
            setUserInfo(repsonseData.data);
          }
        }
      });
      return "OK";
    } catch (error) {
      let e = error as Error;
      return `Error with login - ${e.message}`;
    }
  };
  /**remove user from localstorage and logout */
  const logoutHandler = (logout: boolean) => {
    if (logout) {
      setUserIsLoggedIn(false);
      localStorage.removeItem("token");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLogged: userIsLoggedIn,
        userInfo: userInfo,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
