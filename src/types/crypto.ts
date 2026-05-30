export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price_idr: string;
  change_percent: string;
  isPositive: boolean;
  isFavorite: boolean;
  type?: string;
}