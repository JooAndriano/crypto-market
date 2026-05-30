import api
from "../api/axios";

import {
  ENDPOINTS,
} from "../api/endpoints";

export async function getMarket() {
  const response =
    await api.get(
      ENDPOINTS.MARKET
    );

  return response.data.data;
}