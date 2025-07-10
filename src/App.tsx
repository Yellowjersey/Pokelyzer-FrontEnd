import React, { useState } from 'react';
import { AlertCircle, Activity } from 'lucide-react';
import SearchForm from './components/SearchForm';
import CardDisplay from './components/CardDisplay';
import PriceChart from './components/PriceChart';
import TradingRecommendations from './components/TradingRecommendations';
import { predictCard } from './services/api';
import { PokemonCardData } from './types/pokemon';

function App() {
  const [cardData, setCardData] = useState<PokemonCardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchData: {
    setSlug: string;
    cardName: string;
    cardNumber: string;
    setNumber: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await predictCard(
        searchData.setSlug,
        searchData.cardName,
        searchData.cardNumber,
        searchData.setNumber
      );
      setCardData(data);
    } catch (err) {
      setError('Failed to fetch card data. Please check your input and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pokelyzer
              </h1>
              <p className="text-gray-600">Pokemon Card Price Prediction & Analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchForm onSubmit={handleSearch} loading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {cardData && (
          <div className="space-y-8">
            <CardDisplay
              cardId={cardData.card_id}
              imageUrl={cardData.image_url}
              currentPrices={cardData.current_prices}
              freshness={cardData.freshness}
            />

            <PriceChart
              historicalPrices={cardData.historical_prices}
              predictions={cardData.predictions}
            />

            <TradingRecommendations predictions={cardData.predictions} />
          </div>
        )}

        {!cardData && !loading && !error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Analyze
              </h3>
              <p className="text-gray-600">
                Enter your Pokemon card details above to get detailed price predictions and trading recommendations.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 Pokelyzer. Built with React, TypeScript, and Chart.js.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;