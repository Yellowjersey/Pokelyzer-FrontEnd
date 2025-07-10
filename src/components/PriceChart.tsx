import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { HistoricalPrice, Prediction } from '../types/pokemon';
import { BarChart3, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface PriceChartProps {
  historicalPrices: HistoricalPrice[];
  predictions: Prediction[];
}

const PriceChart: React.FC<PriceChartProps> = ({ historicalPrices, predictions }) => {
  const createChartData = (condition: string) => {
    const historical = historicalPrices.find(h => h.condition === condition);
    const prediction = predictions.find(p => p.condition === condition);

    if (!historical || !prediction) return null;

    const historicalData = historical.prices.map(p => ({
      x: p.date,
      y: p.price,
    }));

    const predictionData = prediction.predictions.map(p => ({
      x: p.date,
      y: p.predicted_price,
    }));

    return {
      datasets: [
        {
          label: 'Historical Prices',
          data: historicalData,
          borderColor: condition === 'Ungraded' ? '#3B82F6' : '#8B5CF6',
          backgroundColor: condition === 'Ungraded' ? '#3B82F6' : '#8B5CF6',
          pointBackgroundColor: condition === 'Ungraded' ? '#3B82F6' : '#8B5CF6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Predicted Prices',
          data: predictionData,
          borderColor: condition === 'Ungraded' ? '#10B981' : '#F59E0B',
          backgroundColor: condition === 'Ungraded' ? '#10B981' : '#F59E0B',
          pointBackgroundColor: condition === 'Ungraded' ? '#10B981' : '#F59E0B',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 3,
          borderDash: [5, 5],
          fill: false,
          tension: 0.1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'point' as const,
        intersect: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          parser: 'yyyy-MM-dd',
          tooltipFormat: 'MMM dd, yyyy',
          displayFormats: {
            month: 'MMM yy',
          },
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: (value: any) => `$${value}`,
        },
      },
    },
    interaction: {
      intersect: true,
      mode: 'point' as const,
    },
  };

  const ungradedData = createChartData('Ungraded');
  const psa10Data = createChartData('PSA 10');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-full">
          <BarChart3 className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Price Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {ungradedData && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Ungraded Condition
            </h3>
            <div className="h-80">
              <Line 
                key="ungraded-chart" 
                data={ungradedData} 
                options={options} 
              />
            </div>
          </div>
        )}

        {psa10Data && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              PSA 10 Condition
            </h3>
            <div className="h-80">
              <Line 
                key="psa10-chart" 
                data={psa10Data} 
                options={options} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceChart;