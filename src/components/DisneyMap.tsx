import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Search, 
  Filter, 
  Navigation, 
  Clock, 
  Star, 
  Heart,
  X,
  ChevronDown,
  Map,
  Compass,
  Wand2
} from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  type: 'attraction' | 'dining' | 'shop' | 'show' | 'character';
  location: { x: number; y: number };
  waitTime?: number;
  rating: number;
  isFavorite: boolean;
  description: string;
}

const DisneyMap: React.FC = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const attractions: Attraction[] = [
    {
      id: '1',
      name: 'Space Mountain',
      type: 'attraction',
      location: { x: 20, y: 30 },
      waitTime: 25,
      rating: 4.8,
      isFavorite: true,
      description: 'Thrilling indoor roller coaster through space'
    },
    {
      id: '2',
      name: 'Pirates of the Caribbean',
      type: 'attraction',
      location: { x: 35, y: 45 },
      waitTime: 15,
      rating: 4.6,
      isFavorite: false,
      description: 'Classic boat ride through pirate adventures'
    },
    {
      id: '3',
      name: 'Be Our Guest Restaurant',
      type: 'dining',
      location: { x: 50, y: 25 },
      waitTime: 0,
      rating: 4.7,
      isFavorite: true,
      description: 'Fine dining in the Beast\'s castle'
    },
    {
      id: '4',
      name: 'Haunted Mansion',
      type: 'attraction',
      location: { x: 40, y: 60 },
      waitTime: 20,
      rating: 4.5,
      isFavorite: false,
      description: 'Spooky tour through the haunted estate'
    },
    {
      id: '5',
      name: 'Mickey Mouse Meet & Greet',
      type: 'character',
      location: { x: 15, y: 70 },
      waitTime: 30,
      rating: 4.9,
      isFavorite: true,
      description: 'Meet the one and only Mickey Mouse!'
    },
    {
      id: '6',
      name: 'Emporium',
      type: 'shop',
      location: { x: 10, y: 80 },
      waitTime: 0,
      rating: 4.3,
      isFavorite: false,
      description: 'Main Street\'s largest merchandise store'
    },
    {
      id: '7',
      name: 'Festival of Fantasy Parade',
      type: 'show',
      location: { x: 30, y: 50 },
      waitTime: 0,
      rating: 4.8,
      isFavorite: true,
      description: 'Magical parade through the park'
    },
    {
      id: '8',
      name: 'Big Thunder Mountain',
      type: 'attraction',
      location: { x: 60, y: 40 },
      waitTime: 35,
      rating: 4.4,
      isFavorite: false,
      description: 'Wild mine train adventure'
    }
  ];

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || attraction.type === selectedType;
    const matchesFavorites = !favoritesOnly || attraction.isFavorite;
    return matchesSearch && matchesType && matchesFavorites;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attraction': return 'bg-blue-500';
      case 'dining': return 'bg-green-500';
      case 'shop': return 'bg-purple-500';
      case 'show': return 'bg-yellow-500';
      case 'character': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'attraction': return '🎢';
      case 'dining': return '🍽️';
      case 'shop': return '🛍️';
      case 'show': return '🎭';
      case 'character': return '🎭';
      default: return '📍';
    }
  };

  return (
    <div className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Map className="w-12 h-12 text-disney-gold mr-4" />
            <h1 className="font-disney text-4xl md:text-5xl text-white">Disney Park Map</h1>
            <Compass className="w-12 h-12 text-disney-gold ml-4" />
          </div>
          <p className="text-lg text-gray-400 font-quicksand max-w-2xl mx-auto">
            Explore Magic Kingdom with real-time wait times, dining options, and magical experiences
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search attractions, dining, shops..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300"
              />
            </div>

            {/* Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300"
            >
              <option value="all">All Types</option>
              <option value="attraction">Attractions</option>
              <option value="dining">Dining</option>
              <option value="shop">Shopping</option>
              <option value="show">Shows</option>
              <option value="character">Characters</option>
            </select>

            {/* Favorites Toggle */}
            <motion.button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                favoritesOnly 
                  ? 'bg-disney-gold text-black' 
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={20} className={favoritesOnly ? 'fill-current' : ''} />
              <span>Favorites</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="glass-effect p-8 rounded-2xl border border-white/10 relative overflow-hidden">
            {/* Map Background */}
            <div className="relative w-full h-96 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-xl overflow-hidden">
              {/* Map Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-10 grid-rows-10 h-full">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border border-white/10"></div>
                  ))}
                </div>
              </div>

              {/* Attractions */}
              {filteredAttractions.map((attraction) => (
                <motion.div
                  key={attraction.id}
                  className={`absolute w-8 h-8 rounded-full ${getTypeColor(attraction.type)} cursor-pointer flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-white/30 hover:scale-110 transition-all duration-300`}
                  style={{
                    left: `${attraction.location.x}%`,
                    top: `${attraction.location.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedAttraction(attraction)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {getTypeIcon(attraction.type)}
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
                <h4 className="font-semibold mb-2">Legend</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Attractions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>Dining</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span>Shopping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Shows</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                    <span>Characters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attractions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            {filteredAttractions.length} Locations Found
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAttractions.map((attraction) => (
              <motion.div
                key={attraction.id}
                className="glass-effect p-4 rounded-xl border border-white/10 hover:border-disney-gold/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedAttraction(attraction)}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${getTypeColor(attraction.type)} flex items-center justify-center text-white text-sm`}>
                      {getTypeIcon(attraction.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{attraction.name}</h4>
                      <p className="text-sm text-gray-400 capitalize">{attraction.type}</p>
                    </div>
                  </div>
                  <Heart 
                    size={20} 
                    className={`cursor-pointer transition-colors ${
                      attraction.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-300 mb-3">{attraction.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {attraction.waitTime !== undefined && attraction.waitTime > 0 && (
                      <div className="flex items-center space-x-1">
                        <Clock size={16} className="text-yellow-400" />
                        <span className="text-sm text-white">{attraction.waitTime} min</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-white">{attraction.rating}</span>
                    </div>
                  </div>
                  <Navigation size={16} className="text-disney-gold" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Attraction Detail Modal */}
        <AnimatePresence>
          {selectedAttraction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAttraction(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-effect p-8 rounded-2xl border border-white/20 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full ${getTypeColor(selectedAttraction.type)} flex items-center justify-center text-white text-lg`}>
                      {getTypeIcon(selectedAttraction.type)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{selectedAttraction.name}</h3>
                      <p className="text-gray-400 capitalize">{selectedAttraction.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>

                <p className="text-gray-300 mb-6">{selectedAttraction.description}</p>

                <div className="space-y-4">
                  {selectedAttraction.waitTime !== undefined && selectedAttraction.waitTime > 0 && (
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock size={20} className="text-yellow-400" />
                        <span className="text-white">Wait Time</span>
                      </div>
                      <span className="text-white font-semibold">{selectedAttraction.waitTime} minutes</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star size={20} className="text-yellow-400 fill-current" />
                      <span className="text-white">Rating</span>
                    </div>
                    <span className="text-white font-semibold">{selectedAttraction.rating}/5.0</span>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 py-3 bg-gradient-to-r from-sky-300 to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Navigation size={18} />
                      <span>Get Directions</span>
                    </motion.button>
                    <motion.button
                      className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={18} className={selectedAttraction.isFavorite ? 'fill-current text-red-500' : ''} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DisneyMap;
