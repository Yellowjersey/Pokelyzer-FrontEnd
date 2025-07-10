import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchFormProps {
  onSubmit: (data: {
    setSlug: string;
    cardName: string;
    cardNumber: string;
    setNumber: string;
  }) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    setSlug: '',
    cardName: '',
    cardNumber: '',
    setNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <Search className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Card Search</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="setSlug" className="block text-sm font-semibold text-gray-700 mb-2">
              Set Slug
            </label>
            <input
              type="text"
              id="setSlug"
              name="setSlug"
              value={formData.setSlug}
              onChange={handleChange}
              placeholder="e.g., base-set"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="cardName" className="block text-sm font-semibold text-gray-700 mb-2">
              Card Name
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="e.g., Charizard"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="e.g., 4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="setNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Set Number
            </label>
            <input
              type="text"
              id="setNumber"
              name="setNumber"
              value={formData.setNumber}
              onChange={handleChange}
              placeholder="e.g., 102"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Card...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Get Price Prediction
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;