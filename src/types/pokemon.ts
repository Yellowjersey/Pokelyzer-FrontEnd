export interface PriceData {
  date: string;
  price: number;
}

export interface HistoricalPrice {
  condition: string;
  prices: PriceData[];
}

export interface PredictionData {
  date: string;
  predicted_price: number;
}

export interface Prediction {
  condition: string;
  predictions: PredictionData[];
}

export interface CurrentPrices {
  Ungraded: number;
  'Grade 7': number;
  'Grade 8': number;
  'Grade 9': number;
  'Grade 9.5': number;
  'PSA 10': number;
}

export interface PokemonCardData {
  card_id: string;
  freshness: string;
  image_url: string;
  current_prices: CurrentPrices;
  historical_prices: HistoricalPrice[];
  predictions: Prediction[];
}

export interface TradingRecommendation {
  action: 'buy' | 'sell' | 'hold';
  condition: string;
  reasoning: string;
  optimalDate?: string;
  expectedPrice?: number;
}