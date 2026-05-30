export interface AuthState {
  token: string | null;
  otp: string;
  phone: string;
  email: string;
  loginMethod: "phone" | "email";
}