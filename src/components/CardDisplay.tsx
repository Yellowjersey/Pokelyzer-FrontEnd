import React from 'react';
import { CurrentPrices } from '../types/pokemon';
import { TrendingUp, Clock, Star } from 'lucide-react';

interface CardDisplayProps {
  cardId: string;
  imageUrl: string;
  currentPrices: CurrentPrices;
  freshness: string;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  cardId,
  imageUrl,
  currentPrices,
  freshness,
}) => {
  const gradeColors = {
    'Ungraded': 'bg-gray-100 text-gray-800',
    'Grade 7': 'bg-yellow-100 text-yellow-800',
    'Grade 8': 'bg-orange-100 text-orange-800',
    'Grade 9': 'bg-green-100 text-green-800',
    'Grade 9.5': 'bg-blue-100 text-blue-800',
    'PSA 10': 'bg-purple-100 text-purple-800',
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'N/A';
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-full">
          <Star className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Card Details</h2>
          <p className="text-gray-600">Card ID: {cardId}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            freshness === 'fresh' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {freshness === 'fresh' ? 'Fresh Data' : 'Recently Scraped'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={imageUrl}
              alt={`Pokemon Card ${cardId}`}
              className="w-full max-w-sm rounded-lg shadow-lg border border-gray-200"
            />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {cardId}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Current Market Prices
          </h3>
          <div className="space-y-3">
            {Object.entries(currentPrices).map(([grade, price]) => (
              <div
                key={grade}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    gradeColors[grade as keyof typeof gradeColors]
                  }`}>
                    {grade}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(price)}
                  </span>
                  {price > 0 && (
                    <div className="text-sm text-gray-500">Current Market</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;