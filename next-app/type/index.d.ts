export type CurrencyType = 'INR' | 'USD';

export type CoinType = {
  name: string;
  id: string;
  price_change_percentage_24h: number;
  image: string;
  current_price: number;
  market_cap: number;
  symbol: string;
};
