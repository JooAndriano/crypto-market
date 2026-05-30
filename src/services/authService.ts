import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function loginByEmail(
  email: string,
  password: string
) {
  const response =
    await api.post(
      ENDPOINTS.LOGIN,
      {
        email,
        password,
      }
    );

  return response.data;
}

export async function loginByPhone(
  phone: string,
  password: string
) {
  const response =
    await api.post(
      ENDPOINTS.LOGIN,
      {
        phone,
        password,
      }
    );

  return response.data;
}

export async function verifyOtp(
  otp: string,
  phone: string,
  token: string
) {
    console.log("VERIFY BODY", {
      otp,
      phone,
    });

    console.log("VERIFY TOKEN", token);
  const response =
    await api.post(
      ENDPOINTS.VERIFY_OTP,
      {
        otp,
        phone,
      },
      {
        headers: {
          Authorization:
            token,
        },
      }
    );

  return response.data;
}