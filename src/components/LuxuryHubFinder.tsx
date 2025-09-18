import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  Utensils, 
  Coffee, 
  Wine, 
  Search,
  Navigation,
  Crown
} from 'lucide-react';

interface LuxuryHub {
  id: string;
  name: string;
  type: 'restaurant' | 'lounge' | 'cafe' | 'bar';
  rating: number;
  distance: string;
  waitTime: string;
  priceRange: string;
  description: string;
  features: string[];
  image: string;
}

const LuxuryHubFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showResults, setShowResults] = useState(false);

  const luxuryHubs: LuxuryHub[] = [
    {
      id: '1',
      name: 'Be Our Guest Restaurant',
      type: 'restaurant',
      rating: 4.8,
      distance: '0.2 miles',
      waitTime: '15 min',
      priceRange: '$$$$',
      description: 'Fine dining in the Beast\'s enchanted castle with French-inspired cuisine and magical ambiance.',
      features: ['Fine Dining', 'Character Dining', 'Wine Selection', 'Private Dining'],
      image: '🏰'
    },
    {
      id: '2',
      name: 'California Grill',
      type: 'restaurant',
      rating: 4.9,
      distance: '0.5 miles',
      waitTime: '30 min',
      priceRange: '$$$$',
      description: 'Upscale rooftop dining with panoramic views of Magic Kingdom and fireworks.',
      features: ['Rooftop Views', 'Fireworks Viewing', 'Wine Bar', 'Chef\'s Table'],
      image: '🌆'
    },
    {
      id: '3',
      name: 'Enchanted Rose Lounge',
      type: 'lounge',
      rating: 4.7,
      distance: '0.3 miles',
      waitTime: '5 min',
      priceRange: '$$$',
      description: 'Elegant cocktail lounge inspired by Beauty and the Beast with craft cocktails.',
      features: ['Craft Cocktails', 'Live Music', 'Outdoor Seating', 'Premium Spirits'],
      image: '🌹'
    },
    {
      id: '4',
      name: 'Joffrey\'s Coffee & Tea',
      type: 'cafe',
      rating: 4.5,
      distance: '0.1 miles',
      waitTime: '2 min',
      priceRange: '$$',
      description: 'Premium coffee and tea with artisanal pastries in a cozy atmosphere.',
      features: ['Artisan Coffee', 'Fresh Pastries', 'WiFi', 'Outdoor Seating'],
      image: '☕'
    },
    {
      id: '5',
      name: 'Top of the World Lounge',
      type: 'bar',
      rating: 4.6,
      distance: '0.4 miles',
      waitTime: '10 min',
      priceRange: '$$$',
      description: 'Exclusive rooftop bar with 360-degree views and premium cocktails.',
      features: ['360° Views', 'Premium Cocktails', 'Fireworks Viewing', 'VIP Access'],
      image: '🌍'
    },
    {
      id: '6',
      name: 'Victoria & Albert\'s',
      type: 'restaurant',
      rating: 5.0,
      distance: '0.6 miles',
      waitTime: '45 min',
      priceRange: '$$$$$',
      description: 'Award-winning fine dining with seven-course tasting menu and wine pairings.',
      features: ['7-Course Menu', 'Wine Pairings', 'Sommelier Service', 'Private Chef'],
      image: '👑'
    }
  ];

  const filteredHubs = luxuryHubs.filter(hub => {
    const matchesSearch = hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hub.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || hub.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSearch = () => {
    setShowResults(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return <Utensils size={20} />;
      case 'lounge': return <Wine size={20} />;
      case 'cafe': return <Coffee size={20} />;
      case 'bar': return <Wine size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'from-red-500 to-orange-500';
      case 'lounge': return 'from-blue-500 to-cyan-500';
      case 'cafe': return 'from-amber-500 to-yellow-500';
      case 'bar': return 'from-blue-600 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-luxury-gold mr-3" />
            <h1 className="luxury-text text-3xl font-bold bg-gradient-disney bg-clip-text text-transparent">Luxury Hub Finder</h1>
            <MapPin className="w-8 h-8 text-disney-blue ml-3" />
          </div>
          <p className="text-gray-400">Find the nearest luxury dining and relaxation spots</p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for restaurants, lounges, cafes..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
            >
              <option value="all">All Types</option>
              <option value="restaurant">Restaurants</option>
              <option value="lounge">Lounges</option>
              <option value="cafe">Cafes</option>
              <option value="bar">Bars</option>
            </select>

            <motion.button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-luxury-blue text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation size={20} />
              <span>Find Hubs</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="luxury-text text-2xl font-bold text-white">
                  Luxury Hubs Near You
                </h2>
                <span className="text-gray-400">{filteredHubs.length} results</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHubs.map((hub, index) => (
                  <motion.div
                    key={hub.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect p-6 rounded-xl border border-white/10 hover:border-luxury-gold/30 transition-all duration-300 group cursor-pointer"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(hub.type)} rounded-full flex items-center justify-center text-white text-2xl`}>
                          {hub.image}
                        </div>
                        <div>
                          <h3 className="luxury-text text-lg font-semibold text-white group-hover:text-luxury-gold transition-colors duration-300">
                            {hub.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            {getTypeIcon(hub.type)}
                            <span className="capitalize">{hub.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-luxury-gold fill-current" />
                        <span className="text-sm text-white font-medium">{hub.rating}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {hub.description}
                    </p>

                    {/* Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-disney-blue" />
                        <span className="text-gray-300">{hub.distance}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-disney-blue" />
                        <span className="text-gray-300">{hub.waitTime}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hub.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-disney-blue/20 text-disney-blue text-xs rounded-full border border-disney-blue/30"
                        >
                          {feature}
                        </span>
                      ))}
                      {hub.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                          +{hub.features.length - 3} more
                        </span>
                      )}
                    </div>

                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LuxuryHubFinder;
