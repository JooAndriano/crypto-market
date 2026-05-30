import api from "../api/axios";
import {
  ENDPOINTS,
} from "../api/endpoints";

export async function getMarket(
  token: string
) {
  const response =
    await api.get(
      ENDPOINTS.MARKET,
      {
        headers: {
          Authorization:
            token,
        },
      }
    );

  return response.data.data;
}