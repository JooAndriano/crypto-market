import { AuthState } from "./authTypes";

export type AuthAction =
  | {
      type: "RESTORE_TOKEN";
      token: string | null;
    }
  | {
      type: "LOGIN_SUCCESS";
      payload: {
        token: string;
        otp: string;
        phone: string;
        email: string;
        loginMethod: "phone" | "email";
      };
    }
  | {
      type: "SET_PENDING_AUTH";
      payload: {
        token: string;
        otp: string;
        phone: string;
        email: string;
        loginMethod: "phone" | "email";
      };
    }
  | {
      type: "LOGOUT";
    };

export const initialState: AuthState = {
  token: null,
  tempToken: null,
  otp: "",
  phone: "",
  email: "",
  loginMethod: "phone",
  isLoading: true,
};

export function authReducer(
  state: AuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        token: action.token,
        isLoading: false,
      };
    case "SET_PENDING_AUTH":
      return {
        ...state,
        tempToken: action.payload.token,
        otp: action.payload.otp,
        phone: action.payload.phone,
        email: action.payload.email,
        loginMethod: action.payload.loginMethod,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        tempToken: null,
        otp: action.payload.otp,
        phone: action.payload.phone,
        email: action.payload.email,
        loginMethod:
          action.payload.loginMethod,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };

    default:
      return state;
  }
}