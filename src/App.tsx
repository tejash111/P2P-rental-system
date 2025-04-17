import React, { useState, useEffect } from 'react';
import { Search, Filter, Brain, LayoutGrid, List, Star, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { ItemGrid } from './components/ItemGrid';
import { Item } from './types';

// Sample data with AI recommendations
const sampleItems: Item[] = [
  {
    id: '1',
    name: 'Scientific Calculator',
    description: 'Advanced scientific calculator perfect for engineering students',
    category: 'Electronics',
    price: 1000,
    dailyRate: 25,
    image: 'https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=2000',
    owner: {
      id: '1',
      name: 'Rahul Kumar',
      rating: 4.8
    },
    available: true,
    aiRecommendation: {
      suggestedPrice: 30,
      confidence: 0.92,
      reasoning: "High demand during exam season suggests potential for higher pricing"
    }
  },
  {
    id: '2',
    name: 'Power Drill',
    description: 'Professional-grade power drill with multiple attachments',
    category: 'Tools',
    price: 3000,
    dailyRate: 75,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=2000',
    owner: {
      id: '2',
      name: 'Priya Singh',
      rating: 4.5
    },
    available: true,
    aiRecommendation: {
      suggestedPrice: 70,
      confidence: 0.85,
      reasoning: "Current market rates for similar tools suggest slight price adjustment"
    }
  },
  {
    id: '3',
    name: 'DSLR Camera',
    description: 'High-quality DSLR camera for professional photography',
    category: 'Electronics',
    price: 50000,
    dailyRate: 1250,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=2000',
    owner: {
      id: '3',
      name: 'Amit Patel',
      rating: 4.9
    },
    available: false,
    aiRecommendation: {
      suggestedPrice: 1500,
      confidence: 0.88,
      reasoning: "Premium pricing justified by high demand in wedding season"
    }
  }
];

const categories = ['All', 'Electronics', 'Tools', 'Sports', 'Books', 'Music'];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<Item[]>(sampleItems);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(currentItems => 
        currentItems.map(item => ({
          ...item,
          aiRecommendation: {
            ...item.aiRecommendation!,
            confidence: Math.min(0.95, (item.aiRecommendation?.confidence || 0.8) + Math.random() * 0.01)
          }
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRentItem = (item: Item) => {
    console.log('Renting item:', item);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPrice = item.dailyRate >= priceRange[0] && item.dailyRate <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (!showProducts) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">P2P Rental System</h1>
              <button
                onClick={() => setShowProducts(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Items
              </button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Rent Anything, <span className="text-blue-600">Anytime</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Access thousands of items at a fraction of their cost. Our AI-powered platform helps you find the perfect rental at the best price.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowProducts(true)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                  >
                    Start Renting
                  </button>
                  <button
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium border-2 border-blue-600"
                  >
                    List Your Items
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Platform?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Pricing</h3>
                  <p className="text-gray-600">Get the best market rates with our intelligent pricing system</p>
                </div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                  <p className="text-gray-600">Verified users and secure payment processing</p>
                </div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Duration</h3>
                  <p className="text-gray-600">Rent for hours, days, or weeks - you decide</p>
                </div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                  <p className="text-gray-600">Join thousands of users sharing resources</p>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Items Preview */}
          <div className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.slice(0, 3).map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Daily Rate</p>
                          <p className="text-xl font-bold text-gray-900">₹{item.dailyRate}</p>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-sm">{item.owner.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowProducts(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  View All Items
                </button>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Trusted by Thousands</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Join our growing community of users who are saving money and resources through peer-to-peer rentals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-bold text-blue-600">10,000+</p>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-600">5,000+</p>
                  <p className="text-gray-600">Items Listed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-600">15,000+</p>
                  <p className="text-gray-600">Successful Rentals</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">Making rentals accessible and affordable for everyone.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">List Your Items</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Browse Items</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2025 P2P Rental System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1
              onClick={() => setShowProducts(false)} // Navigates to the home page
className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
            >
P2P Rental System
</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode(mode => mode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                title="Toggle view mode"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              >
                <Brain className="w-5 h-5" />
                <span>AI Insights</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showAIInsights && (
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 shadow-sm">
            <h2 className="text-lg font-semibold text-purple-900 mb-4">AI Market Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-purple-900 mb-2">Popular Categories</h3>
                <p className="text-2xl font-bold text-purple-700">Electronics</p>
                <p className="text-sm text-purple-600">42% of all rentals</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-purple-900 mb-2">Peak Rental Period</h3>
                <p className="text-2xl font-bold text-purple-700">Weekends</p>
                <p className="text-sm text-purple-600">2.3x higher demand</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-purple-900 mb-2">Pricing Guide</h3>
                <p className="text-2xl font-bold text-purple-700">2-3%</p>
                <p className="text-sm text-purple-600">of item value for daily rentals</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily Rate Range (₹{priceRange[0]} - ₹{priceRange[1]})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredItems.length} items
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ItemGrid items={filteredItems} onRentItem={handleRentItem} viewMode={viewMode} />
        </div>
      </main>
    </div>
  );
}

export default App;