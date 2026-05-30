import React, {
  useReducer,
} from "react";

import { AuthContext }
from "./authContext";

import {
  authReducer,
  initialState,
} from "./authReducer";

export default function AuthProvider({
  children,
}: any) {
  const [state, dispatch] =
    useReducer(
      authReducer,
      initialState
    );

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