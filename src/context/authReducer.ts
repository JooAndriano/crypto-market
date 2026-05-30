import { AuthState } from "./authTypes";

export type AuthAction =
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
      type: "LOGOUT";
    };

export const initialState: AuthState = {
  token: null,
  otp: "",
  phone: "",
  email: "",
  loginMethod: "phone",
};

export function authReducer(
  state: AuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
        otp: action.payload.otp,
        phone: action.payload.phone,
        email: action.payload.email,
        loginMethod:
          action.payload.loginMethod,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
}