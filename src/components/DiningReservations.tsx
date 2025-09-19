import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowRight,
  Compass,
  Wand2,
  Filter,
  Search
} from 'lucide-react';

interface DiningReservation {
  id: string;
  name: string;
  park: string;
  location: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  description: string;
  image: string;
  availableSlots: string[];
  features: string[];
  partySize: number;
  duration: string;
  type: 'table-service' | 'quick-service' | 'character-dining' | 'fine-dining';
}

const DiningReservations: React.FC = () => {
  const [reservations, setReservations] = useState<DiningReservation[]>([
    {
      id: '1',
      name: 'Be Our Guest Restaurant',
      park: 'Magic Kingdom',
      location: 'Fantasyland',
      cuisine: 'French',
      priceRange: '$$$',
      rating: 4.7,
      description: 'Dine in the Beast\'s enchanted castle with three unique dining rooms.',
      image: '🏰',
      availableSlots: ['11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'],
      features: ['Character Dining', 'Beauty & Beast Theme', 'Three Dining Rooms', 'Wine Available'],
      partySize: 8,
      duration: '90 minutes',
      type: 'character-dining'
    },
    {
      id: '2',
      name: 'Cinderella\'s Royal Table',
      park: 'Magic Kingdom',
      location: 'Fantasyland',
      cuisine: 'American',
      priceRange: '$$$$',
      rating: 4.8,
      description: 'Dine inside Cinderella Castle with princess character interactions.',
      image: '👑',
      availableSlots: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'],
      features: ['Princess Characters', 'Castle Views', 'Photo Package', 'Premium Experience'],
      partySize: 6,
      duration: '90 minutes',
      type: 'character-dining'
    },
    {
      id: '3',
      name: 'Space 220 Restaurant',
      park: 'EPCOT',
      location: 'World Discovery',
      cuisine: 'Contemporary',
      priceRange: '$$$$',
      rating: 4.6,
      description: 'Dine 220 miles above Earth with stunning space views and cosmic cuisine.',
      image: '🚀',
      availableSlots: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'],
      features: ['Space Theme', 'Stunning Views', 'Premium Cocktails', 'Unique Experience'],
      partySize: 6,
      duration: '2 hours',
      type: 'fine-dining'
    },
    {
      id: '4',
      name: 'Oga\'s Cantina',
      park: 'Disney\'s Hollywood Studios',
      location: 'Galaxy\'s Edge',
      cuisine: 'Intergalactic',
      priceRange: '$$',
      rating: 4.5,
      description: 'Experience the cantina from Star Wars with themed drinks and atmosphere.',
      image: '🛸',
      availableSlots: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
      features: ['Star Wars Theme', 'Themed Drinks', 'DJ R-3X', '45-min Limit'],
      partySize: 8,
      duration: '45 minutes',
      type: 'quick-service'
    },
    {
      id: '5',
      name: 'Le Cellier Steakhouse',
      park: 'EPCOT',
      location: 'World Showcase - Canada',
      cuisine: 'Steakhouse',
      priceRange: '$$$$',
      rating: 4.8,
      description: 'Premium Canadian steakhouse featuring world-class steaks and wines.',
      image: '🥩',
      availableSlots: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'],
      features: ['Premium Steaks', 'Wine Cellar', 'Canadian Cuisine', 'Romantic Setting'],
      partySize: 6,
      duration: '2 hours',
      type: 'fine-dining'
    },
    {
      id: '6',
      name: 'Chef Mickey\'s',
      park: 'Disney\'s Contemporary Resort',
      location: 'Resort',
      cuisine: 'American',
      priceRange: '$$$',
      rating: 4.4,
      description: 'Buffet dining with Mickey Mouse and friends in a fun, family atmosphere.',
      image: '🐭',
      availableSlots: ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM'],
      features: ['Mickey & Friends', 'All-You-Can-Eat', 'Character Interactions', 'Family Friendly'],
      partySize: 10,
      duration: '90 minutes',
      type: 'character-dining'
    },
    {
      id: '7',
      name: 'Tusker House Restaurant',
      park: 'Disney\'s Animal Kingdom',
      location: 'Africa',
      cuisine: 'African',
      priceRange: '$$$',
      rating: 4.3,
      description: 'African-inspired buffet with Donald Duck and friends in safari gear.',
      image: '🦁',
      availableSlots: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM'],
      features: ['Donald & Friends', 'African Cuisine', 'Safari Theme', 'Buffet Style'],
      partySize: 8,
      duration: '90 minutes',
      type: 'character-dining'
    },
    {
      id: '8',
      name: 'California Grill',
      park: 'Disney\'s Contemporary Resort',
      location: 'Resort',
      cuisine: 'Contemporary',
      priceRange: '$$$$',
      rating: 4.9,
      description: 'Fine dining with panoramic views of Magic Kingdom and fireworks.',
      image: '🌆',
      availableSlots: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'],
      features: ['Fireworks Views', 'Fine Dining', 'Wine Selection', 'Romantic'],
      partySize: 6,
      duration: '2 hours',
      type: 'fine-dining'
    }
  ]);

  const [selectedReservation, setSelectedReservation] = useState<DiningReservation | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filters, setFilters] = useState({
    park: 'all',
    type: 'all',
    priceRange: 'all',
    search: ''
  });

  const parks = ['all', 'Magic Kingdom', 'EPCOT', 'Disney\'s Hollywood Studios', 'Disney\'s Animal Kingdom', 'Resort'];
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'character-dining', label: 'Character Dining' },
    { value: 'fine-dining', label: 'Fine Dining' },
    { value: 'table-service', label: 'Table Service' },
    { value: 'quick-service', label: 'Quick Service' }
  ];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '$', label: '$ (Under $15)' },
    { value: '$$', label: '$$ ($15-35)' },
    { value: '$$$', label: '$$$ ($35-60)' },
    { value: '$$$$', label: '$$$$ ($60+)' }
  ];

  const filteredReservations = reservations.filter(reservation => {
    const matchesPark = filters.park === 'all' || reservation.park === filters.park;
    const matchesType = filters.type === 'all' || reservation.type === filters.type;
    const matchesPrice = filters.priceRange === 'all' || reservation.priceRange === filters.priceRange;
    const matchesSearch = filters.search === '' || 
      reservation.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      reservation.cuisine.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesPark && matchesType && matchesPrice && matchesSearch;
  });

  const handleReservation = () => {
    if (selectedReservation && selectedSlot) {
      setShowConfirmation(true);
    }
  };

  const confirmReservation = () => {
    alert(`Reservation confirmed! ${selectedReservation?.name} at ${selectedSlot} for ${partySize} guest(s).`);
    setShowConfirmation(false);
    setSelectedReservation(null);
    setSelectedSlot('');
    setPartySize(2);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'character-dining': return '👑';
      case 'fine-dining': return '🍽️';
      case 'table-service': return '🍴';
      case 'quick-service': return '🥤';
      default: return '🍽️';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'character-dining': return 'from-purple-500 to-pink-600';
      case 'fine-dining': return 'from-gold-500 to-yellow-600';
      case 'table-service': return 'from-blue-500 to-indigo-600';
      case 'quick-service': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Compass className="w-12 h-12 text-disney-gold animate-compass-spin mr-4" />
            <h1 className="font-disney text-4xl md:text-6xl magical-text">
              Dining Reservations
            </h1>
            <Wand2 className="w-12 h-12 text-magic-pink animate-wand-sparkle ml-4" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Reserve your table at the most magical restaurants in Disney
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
              />
            </div>

            {/* Park Filter */}
            <select
              value={filters.park}
              onChange={(e) => setFilters({ ...filters, park: e.target.value })}
              className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
            >
              {parks.map(park => (
                <option key={park} value={park} className="bg-white text-gray-900">
                  {park === 'all' ? 'All Parks' : park}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
            >
              {types.map(type => (
                <option key={type.value} value={type.value} className="bg-white text-gray-900">
                  {type.label}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value} className="bg-white text-gray-900">
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Restaurants Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredReservations.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedReservation(restaurant)}
            >
              <div className="text-6xl mb-4 text-center">{restaurant.image}</div>
              
              <div className="flex items-center justify-between mb-2">
                <h3 className="luxury-text text-xl font-semibold text-gray-900">
                  {restaurant.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-disney-gold fill-current" />
                  <span className="text-sm text-gray-600">{restaurant.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {restaurant.location}
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-700">{restaurant.cuisine}</span>
                <span className="text-disney-gold font-semibold">{restaurant.priceRange}</span>
              </div>

              <p className="text-gray-800 text-sm mb-4 line-clamp-2">
                {restaurant.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                  <Users className="w-4 h-4 mr-1" />
                  Up to {restaurant.partySize}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(restaurant.type)} text-white`}>
                  {getTypeIcon(restaurant.type)} {types.find(t => t.value === restaurant.type)?.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reservation Modal */}
        <AnimatePresence>
          {selectedReservation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedReservation(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{selectedReservation.image}</div>
                    <div>
                      <h2 className="luxury-text text-2xl font-semibold text-white">
                        {selectedReservation.name}
                      </h2>
                      <div className="flex items-center text-castle-silver">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedReservation.location}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReservation(null)}
                    className="text-castle-silver hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-2">
                      About This Restaurant
                    </h3>
                    <p className="text-slate-light">{selectedReservation.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-3">
                      Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedReservation.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-disney-gold/20 text-disney-gold rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Party Size */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-3">
                      Party Size
                    </h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-white min-w-[2rem] text-center">
                        {partySize}
                      </span>
                      <button
                        onClick={() => setPartySize(Math.min(selectedReservation.partySize, partySize + 1))}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-castle-silver mt-2">
                      Maximum party size: {selectedReservation.partySize} guests
                    </p>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-3">
                      Available Times
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedReservation.availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            selectedSlot === slot
                              ? 'border-disney-gold bg-disney-gold/20 text-disney-gold'
                              : 'border-white/20 hover:border-white/40 text-slate-light hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    onClick={handleReservation}
                    disabled={!selectedSlot}
                    className="w-full btn-primary py-4 text-lg font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: selectedSlot ? 1.02 : 1 }}
                    whileTap={{ scale: selectedSlot ? 0.98 : 1 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar size={20} />
                      <span>Make Reservation</span>
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl text-center"
              >
                <div className="text-6xl mb-4">🍽️</div>
                <h2 className="luxury-text text-2xl font-semibold text-white mb-4">
                  Reservation Confirmed!
                </h2>
                <div className="space-y-3 mb-6 text-left">
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Restaurant:</span>
                    <span className="text-white font-medium">{selectedReservation?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Time:</span>
                    <span className="text-white font-medium">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Party Size:</span>
                    <span className="text-white font-medium">{partySize} guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Duration:</span>
                    <span className="text-white font-medium">{selectedReservation?.duration}</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 py-3 px-6 rounded-xl border border-white/20 text-slate-light hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={confirmReservation}
                    className="flex-1 btn-primary py-3 px-6 rounded-xl"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={20} />
                      <span>Confirm</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiningReservations;
