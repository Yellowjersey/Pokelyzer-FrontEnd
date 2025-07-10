import React from 'react';
import { Prediction } from '../types/pokemon';
import { TrendingUp, TrendingDown, Minus, Target, Calendar, DollarSign } from 'lucide-react';

interface TradingRecommendationsProps {
  predictions: Prediction[];
}

const TradingRecommendations: React.FC<TradingRecommendationsProps> = ({ predictions }) => {
  const generateRecommendations = () => {
    const recommendations = [];

    for (const prediction of predictions) {
      if (prediction.predictions.length < 2) continue;

      const firstPrice = prediction.predictions[0].predicted_price;
      const lastPrice = prediction.predictions[prediction.predictions.length - 1].predicted_price;
      const priceChange = lastPrice - firstPrice;
      const percentageChange = (priceChange / firstPrice) * 100;

      let action: 'buy' | 'sell' | 'hold';
      let reasoning = '';
      let icon = <Minus className="w-5 h-5" />;
      let colorClass = 'text-gray-600 bg-gray-100';

      if (percentageChange > 5) {
        action = 'buy';
        reasoning = `Strong upward trend predicted. Expected to rise from $${firstPrice.toFixed(2)} to $${lastPrice.toFixed(2)} (+${percentageChange.toFixed(1)}%)`;
        icon = <TrendingUp className="w-5 h-5" />;
        colorClass = 'text-green-600 bg-green-100';
      } else if (percentageChange < -5) {
        action = 'sell';
        reasoning = `Downward trend predicted. Expected to decline from $${firstPrice.toFixed(2)} to $${lastPrice.toFixed(2)} (${percentageChange.toFixed(1)}%)`;
        icon = <TrendingDown className="w-5 h-5" />;
        colorClass = 'text-red-600 bg-red-100';
      } else {
        action = 'hold';
        reasoning = `Price expected to remain stable. Minor change from $${firstPrice.toFixed(2)} to $${lastPrice.toFixed(2)} (${percentageChange.toFixed(1)}%)`;
        icon = <Minus className="w-5 h-5" />;
        colorClass = 'text-yellow-600 bg-yellow-100';
      }

      // Find optimal timing
      let optimalDate = '';
      let expectedPrice = 0;

      if (action === 'buy') {
        // Best time to buy is now (earliest prediction)
        optimalDate = prediction.predictions[0].date;
        expectedPrice = firstPrice;
      } else if (action === 'sell') {
        // Best time to sell is now (before decline)
        optimalDate = 'Now';
        expectedPrice = firstPrice;
      } else {
        // Hold - show mid-point
        const midIndex = Math.floor(prediction.predictions.length / 2);
        optimalDate = prediction.predictions[midIndex].date;
        expectedPrice = prediction.predictions[midIndex].predicted_price;
      }

      recommendations.push({
        condition: prediction.condition,
        action,
        reasoning,
        optimalDate,
        expectedPrice,
        icon,
        colorClass,
        percentageChange,
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const getActionText = (action: string) => {
    switch (action) {
      case 'buy':
        return 'BUY';
      case 'sell':
        return 'SELL';
      case 'hold':
        return 'HOLD';
      default:
        return 'HOLD';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 rounded-full">
          <Target className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Trading Recommendations</h2>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${rec.colorClass}`}>
                  {rec.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{rec.condition}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${rec.colorClass}`}>
                    {getActionText(rec.action)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  rec.percentageChange > 0 ? 'text-green-600' : 
                  rec.percentageChange < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {rec.percentageChange > 0 ? '+' : ''}{rec.percentageChange.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">6-month outlook</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{rec.reasoning}</p>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  Optimal Timing: <span className="font-semibold">{rec.optimalDate}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  Target Price: <span className="font-semibold">${rec.expectedPrice.toFixed(2)}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Disclaimer:</strong> These recommendations are based on historical data and predictive models. 
          Pokemon card prices can be volatile and influenced by many factors. Always do your own research and 
          consider your risk tolerance before making trading decisions.
        </p>
      </div>
    </div>
  );
};

export default TradingRecommendations;