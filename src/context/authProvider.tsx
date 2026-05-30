import React, {
  useReducer,
  useEffect,
} from "react";

import { AuthContext }
from "./authContext";

import {
  authReducer,
  initialState,
} from "./authReducer";

import { getToken } from "../utils/storage";

export default function AuthProvider({
  children,
}: any) {
  const [state, dispatch] =
    useReducer(
      authReducer,
      initialState
    );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;

      try {
        userToken = await getToken();
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}