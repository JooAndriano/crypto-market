export interface AuthState {
  token: string | null;
  tempToken: string | null;
  otp: string;
  phone: string;
  email: string;
  loginMethod: "phone" | "email";
  isLoading: boolean;
}