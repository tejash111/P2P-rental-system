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
    image: 'https://images.unsplash.com/photo-1728225956964-d728341aadb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNjaW50aWZpYyUyMGNhbGN1bGF0b3J8ZW58MHx8MHx8fDA%3D',
    owner: { id: '1', name: 'Rahul Kumar', rating: 4.8 },
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
    image: 'https://images.unsplash.com/photo-1646172794471-e1d3ba18339f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB3ZXJlJTIwZHJpbGx8ZW58MHx8MHx8fDA%3D',
    owner: { id: '2', name: 'Priya Singh', rating: 4.5 },
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
    image: 'https://images.unsplash.com/photo-1625545013865-80da35181abf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHNscnxlbnwwfHwwfHx8MA%3D%3D',
    owner: { id: '3', name: 'Amit Patel', rating: 4.9 },
    available: false,
    aiRecommendation: {
      suggestedPrice: 1500,
      confidence: 0.88,
      reasoning: "Premium pricing justified by high demand in wedding season"
    }
  },
  {
    id: '4',
    name: 'Camping Tent',
    description: 'Spacious 4-person camping tent with waterproof cover',
    category: 'Outdoor',
    price: 7000,
    dailyRate: 200,
    image: 'https://images.unsplash.com/photo-1633805159007-8e198bbcc931?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhbXBpbmclMjB0ZW50fGVufDB8fDB8fHww',
    owner: { id: '4', name: 'Neha Verma', rating: 4.6 },
    available: true,
    aiRecommendation: {
      suggestedPrice: 220,
      confidence: 0.9,
      reasoning: "Seasonal camping trend suggests room for a slight price increase"
    }
  },
  {
    id: '5',
    name: 'Electric Guitar',
    description: 'Classic electric guitar with amp, perfect for gigs and practice',
    category: 'Musical Instruments',
    price: 15000,
    dailyRate: 400,
    image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjBndWl0YXJ8ZW58MHx8MHx8fDA%3D',
    owner: { id: '5', name: 'Rohit Das', rating: 4.7 },
    available: true,
    aiRecommendation: {
      suggestedPrice: 450,
      confidence: 0.87,
      reasoning: "Music festivals and events drive demand for instruments"
    }
  },
  {
    id: '6',
    name: 'Projector',
    description: 'Full HD portable projector with HDMI and wireless support',
    category: 'Electronics',
    price: 12000,
    dailyRate: 300,
    image: 'https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdG9yfGVufDB8fDB8fHww',
    owner: { id: '6', name: 'Anjali Rao', rating: 4.9 },
    available: true,
    aiRecommendation: {
      suggestedPrice: 350,
      confidence: 0.91,
      reasoning: "High demand for movie nights and office presentations"
    }
  },
  {
    id: '7',
    name: 'GoPro Hero 10',
    description: 'Waterproof action camera with 5.3K video and stabilization',
    category: 'Electronics',
    price: 38000,
    dailyRate: 900,
    image: 'https://images.unsplash.com/photo-1690099613427-1a3412175445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdvcHJvJTIwaGVybyUyMDEwfGVufDB8fDB8fHww',
    owner: { id: '7', name: 'Kabir Shah', rating: 4.8 },
    available: false,
    aiRecommendation: {
      suggestedPrice: 1000,
      confidence: 0.89,
      reasoning: "Adventure tourism season increases rental demand"
    }
  },
  {
    id: '8',
    name: 'DJ Controller',
    description: 'Professional DJ controller with performance pads and jog wheels',
    category: 'Musical Instruments',
    price: 25000,
    dailyRate: 750,
    image: 'https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGolMjBjb250cm9sbGVyfGVufDB8fDB8fHww',
    owner: { id: '8', name: 'Simran Kaur', rating: 4.7 },
    available: true,
    aiRecommendation: {
      suggestedPrice: 800,
      confidence: 0.86,
      reasoning: "Increased bookings for weddings and parties"
    }
  },
  {
    id: '9',
    name: 'Mountain Bike',
    description: 'All-terrain mountain bike with 21-speed gear and disc brakes',
    category: 'Outdoor',
    price: 20000,
    dailyRate: 500,
    image: 'https://images.unsplash.com/photo-1534150034764-046bf225d3fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vdW50YWluJTIwYmlrZXxlbnwwfHwwfHx8MA%3D%3D',
    owner: { id: '9', name: 'Arjun Mehra', rating: 4.6 },
    available: true,
    aiRecommendation: {
      suggestedPrice: 550,
      confidence: 0.84,
      reasoning: "Weekend adventure bookings increase during holidays"
    }
  },
  {
    id: '10',
    name: 'VR Headset',
    description: 'Next-gen VR headset with immersive 3D experience',
    category: 'Electronics',
    price: 25000,
    dailyRate: 700,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dnIlMjBoZWFkc2V0fGVufDB8fDB8fHww',
    owner: { id: '10', name: 'Sanya Kapoor', rating: 4.8 },
    available: false,
    aiRecommendation: {
      suggestedPrice: 750,
      confidence: 0.88,
      reasoning: "Growing gaming and VR event demand"
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
              <h1
                onClick={() => setShowProducts(false)} // Navigates to the home page
                className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
              >
                DERES
              </h1>
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
                {/* Added new heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                  <span className=''>P2P</span> <span className='text-blue-600'>De</span>centralised <span className='text-blue-600'>Re</span>ntal <span className='text-blue-600'>S</span>ystem
                </h1>
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
              DERES
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