import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";
import { Country } from "../types/country";

export async function getCountries(): Promise<
  Country[]
> {
  const response =
    await api.get(
      ENDPOINTS.COUNTRIES
    );

  return response.data.data;
}