export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  price_idr: string;
  change_percent: string;
  isPositive: boolean;
  isFavorite: boolean;
  hot: boolean;
  type: string;
}