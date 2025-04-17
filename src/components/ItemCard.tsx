import React, { useState } from 'react';
import { Star, TrendingUp, Brain, MapPin, Clock } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onRent: (item: Item) => void;
  viewMode: 'grid' | 'list';
}

export function ItemCard({ item, onRent, viewMode }: ItemCardProps) {
  const [showAIInsights, setShowAIInsights] = useState(false);
  const dailyRatePercentage = ((item.dailyRate / item.price) * 100).toFixed(1);
  const platformFee = item.dailyRate * 0.2; // 20% platform fee

  const aiSuggestion = item.aiRecommendation || {
    suggestedPrice: item.dailyRate,
    confidence: 0.85,
    reasoning: "Based on market demand and similar items in the category"
  };

  const priceComparison = ((aiSuggestion.suggestedPrice - item.dailyRate) / item.dailyRate * 100).toFixed(1);
  const isPriceOptimal = Math.abs(Number(priceComparison)) <= 5;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-48 h-48 object-cover"
          />
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm">{item.owner.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="ml-1 text-sm">2.5 km away</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="ml-1 text-sm">Available now</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="AI Insights"
              >
                <Brain className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            {showAIInsights && (
              <div className="mt-4 p-3 bg-purple-50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">AI Price Analysis</span>
                </div>
                <p className="text-sm text-purple-800">
                  {isPriceOptimal 
                    ? "Current price is optimal for the market" 
                    : `Suggested daily rate: ₹${aiSuggestion.suggestedPrice.toLocaleString()} (${priceComparison}% ${Number(priceComparison) > 0 ? 'higher' : 'lower'})`}
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  {aiSuggestion.reasoning}
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Rate ({dailyRatePercentage}%)</p>
                <p className="text-xl font-bold text-gray-900">₹{item.dailyRate.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Item value: ₹{item.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => onRent(item)}
                className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
                  item.available
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!item.available}
              >
                {item.available ? 'Rent Now' : 'Not Available'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-sm"
            title="AI Insights"
          >
            <Brain className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        
        {showAIInsights && (
          <div className="mt-3 p-3 bg-purple-50 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">AI Price Analysis</span>
            </div>
            <p className="text-sm text-purple-800">
              {isPriceOptimal 
                ? "Current price is optimal for the market" 
                : `Suggested daily rate: ₹${aiSuggestion.suggestedPrice.toLocaleString()} (${priceComparison}% ${Number(priceComparison) > 0 ? 'higher' : 'lower'})`}
            </p>
            <p className="text-xs text-purple-600 mt-1">
              {aiSuggestion.reasoning}
            </p>
            <div className="mt-2 bg-purple-100 rounded px-2 py-1">
              <p className="text-xs text-purple-700">
                Confidence: {(aiSuggestion.confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Daily Rate ({dailyRatePercentage}%)</p>
              <p className="text-xl font-bold text-gray-900">₹{item.dailyRate.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Item Value</p>
              <p className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="ml-1">{item.owner.rating}</span>
            </div>
            <span>Platform fee: ₹{platformFee.toLocaleString()}</span>
          </div>

          <button
            onClick={() => onRent(item)}
            className={`w-full py-2 rounded-md text-white font-medium transition-colors ${
              item.available
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!item.available}
          >
            {item.available ? 'Rent Now' : 'Not Available'}
          </button>
        </div>
      </div>
    </div>
  );
}