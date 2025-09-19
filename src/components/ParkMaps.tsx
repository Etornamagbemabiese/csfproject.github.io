import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  Star,
  Filter,
  Search,
  Compass,
  Wand2,
  Info,
  ArrowRight,
  Zap,
  Heart,
  Camera,
  Utensils,
  ShoppingBag,
  Wifi,
  Car,
  Bus,
  Train
} from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'attraction' | 'dining' | 'restroom' | 'shop' | 'service' | 'transport';
  x: number;
  y: number;
  waitTime?: number;
  status: 'open' | 'closed' | 'down';
  rating?: number;
  description?: string;
  lightningLane?: boolean;
  heightRequirement?: string;
  duration?: string;
  capacity?: number;
  features?: string[];
  operatingHours?: string;
  phoneNumber?: string;
  website?: string;
}

interface ParkMap {
  id: string;
  name: string;
  image: string;
  locations: MapLocation[];
}

const ParkMaps: React.FC = () => {
  const [selectedPark, setSelectedPark] = useState<string>('magic-kingdom');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    search: ''
  });
  const [route, setRoute] = useState<{from: MapLocation | null, to: MapLocation | null}>({from: null, to: null});
  const [showRoute, setShowRoute] = useState(false);
  const [userLocation, setUserLocation] = useState<{x: number, y: number} | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentLocations, setRecentLocations] = useState<string[]>([]);

  const parkMaps: ParkMap[] = [
    {
      id: 'magic-kingdom',
      name: 'Magic Kingdom',
      image: '🏰',
      locations: [
        { 
          id: '1', 
          name: 'Space Mountain', 
          type: 'attraction', 
          x: 20, y: 30, 
          waitTime: 30, 
          status: 'open', 
          rating: 4.8,
          lightningLane: true,
          heightRequirement: '44"',
          duration: '3 minutes',
          capacity: 6,
          features: ['Indoor Coaster', 'Thrill Ride', 'Dark'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Blast off on a thrilling journey through space in this iconic indoor roller coaster.'
        },
        { 
          id: '2', 
          name: 'Pirates of the Caribbean', 
          type: 'attraction', 
          x: 15, y: 60, 
          waitTime: 15, 
          status: 'open', 
          rating: 4.9,
          lightningLane: true,
          heightRequirement: 'All Ages',
          duration: '8 minutes',
          capacity: 8,
          features: ['Boat Ride', 'Classic Disney', 'Animatronics'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Sail through a pirate adventure with animatronic characters and special effects.'
        },
        { 
          id: '3', 
          name: 'Haunted Mansion', 
          type: 'attraction', 
          x: 25, y: 70, 
          waitTime: 25, 
          status: 'open', 
          rating: 4.7,
          lightningLane: true,
          heightRequirement: 'All Ages',
          duration: '10 minutes',
          capacity: 6,
          features: ['Dark Ride', 'Classic Disney', '999 Happy Haunts'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Enter the mysterious mansion for a spooky but family-friendly adventure.'
        },
        { 
          id: '4', 
          name: 'Big Thunder Mountain', 
          type: 'attraction', 
          x: 10, y: 80, 
          waitTime: 20, 
          status: 'open', 
          rating: 4.7,
          lightningLane: true,
          heightRequirement: '40"',
          duration: '3 minutes',
          capacity: 6,
          features: ['Mine Train', 'Wild West Theme', 'Thrill Ride'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Race through the gold rush on this runaway mine train through the Wild West.'
        },
        { 
          id: '5', 
          name: 'Splash Mountain', 
          type: 'attraction', 
          x: 12, y: 85, 
          waitTime: 0, 
          status: 'down', 
          rating: 4.6,
          lightningLane: true,
          heightRequirement: '40"',
          duration: '11 minutes',
          capacity: 6,
          features: ['Water Ride', '52-foot Drop', 'Musical Journey'],
          operatingHours: 'Temporarily Closed',
          description: 'Join Br\'er Rabbit on a musical journey that ends with a thrilling drop.'
        },
        { 
          id: '6', 
          name: 'Jungle Cruise', 
          type: 'attraction', 
          x: 18, y: 55, 
          waitTime: 35, 
          status: 'open', 
          rating: 4.5,
          lightningLane: true,
          heightRequirement: 'All Ages',
          duration: '10 minutes',
          capacity: 8,
          features: ['Boat Ride', 'Comedy', 'Skipper Jokes'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Take a hilarious riverboat cruise through exotic jungles with witty skippers.'
        },
        { 
          id: '7', 
          name: 'Peter Pan\'s Flight', 
          type: 'attraction', 
          x: 40, y: 40, 
          waitTime: 45, 
          status: 'open', 
          rating: 4.6,
          lightningLane: true,
          heightRequirement: 'All Ages',
          duration: '3 minutes',
          capacity: 4,
          features: ['Dark Ride', 'Flying Effect', 'Classic Disney'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Fly over London and Neverland in this magical dark ride adventure.'
        },
        { 
          id: '8', 
          name: 'Seven Dwarfs Mine Train', 
          type: 'attraction', 
          x: 45, y: 35, 
          waitTime: 60, 
          status: 'open', 
          rating: 4.6,
          lightningLane: true,
          heightRequirement: '38"',
          duration: '3 minutes',
          capacity: 4,
          features: ['Family Coaster', 'Mine Cars', 'Diamond Mine'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Journey through the diamond mine with the Seven Dwarfs in this family-friendly coaster.'
        },
        { 
          id: '9', 
          name: 'It\'s a Small World', 
          type: 'attraction', 
          x: 50, y: 45, 
          waitTime: 10, 
          status: 'open', 
          rating: 4.4,
          lightningLane: true,
          heightRequirement: 'All Ages',
          duration: '11 minutes',
          capacity: 8,
          features: ['Boat Ride', 'World Cultures', 'Classic Song'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Take a gentle boat ride through scenes representing countries around the world.'
        },
        { 
          id: '10', 
          name: 'Be Our Guest Restaurant', 
          type: 'dining', 
          x: 42, y: 38, 
          status: 'open', 
          rating: 4.7,
          features: ['Beauty & Beast Theme', 'Three Dining Rooms', 'Wine Available'],
          operatingHours: '11:30 AM - 9:00 PM',
          phoneNumber: '(407) 939-3463',
          description: 'Dine in the Beast\'s enchanted castle with three unique dining rooms.'
        },
        { 
          id: '11', 
          name: 'Cinderella\'s Royal Table', 
          type: 'dining', 
          x: 48, y: 42, 
          status: 'open', 
          rating: 4.8,
          features: ['Princess Characters', 'Castle Views', 'Photo Package'],
          operatingHours: '8:00 AM - 2:00 PM',
          phoneNumber: '(407) 939-3463',
          description: 'Dine inside Cinderella Castle with princess character interactions.'
        },
        { 
          id: '12', 
          name: 'Casey\'s Corner', 
          type: 'dining', 
          x: 35, y: 25, 
          status: 'open', 
          rating: 4.2,
          features: ['Hot Dogs', 'Baseball Theme', 'Quick Service'],
          operatingHours: '10:00 AM - 10:00 PM',
          description: 'Enjoy classic American hot dogs in a baseball-themed setting.'
        },
        { 
          id: '13', 
          name: 'Main Street Confectionery', 
          type: 'shop', 
          x: 30, y: 20, 
          status: 'open',
          features: ['Candy', 'Souvenirs', 'Mickey Ears'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Sweet treats and Disney merchandise on Main Street.'
        },
        { 
          id: '14', 
          name: 'Emporium', 
          type: 'shop', 
          x: 32, y: 18, 
          status: 'open',
          features: ['Disney Merchandise', 'Apparel', 'Toys'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'The largest Disney merchandise store on Main Street.'
        },
        { 
          id: '15', 
          name: 'First Aid', 
          type: 'service', 
          x: 25, y: 15, 
          status: 'open',
          features: ['Medical Assistance', 'Nursing Station', 'Emergency Care'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Medical assistance and first aid services.'
        },
        { 
          id: '16', 
          name: 'Guest Relations', 
          type: 'service', 
          x: 28, y: 12, 
          status: 'open',
          features: ['Park Information', 'Lost & Found', 'Guest Services'],
          operatingHours: '9:00 AM - 10:00 PM',
          description: 'Guest services, park information, and assistance.'
        },
        { 
          id: '17', 
          name: 'Monorail Station', 
          type: 'transport', 
          x: 5, y: 10, 
          status: 'open',
          features: ['Resort Transportation', 'EPCOT Connection', 'Scenic Views'],
          operatingHours: '7:00 AM - 11:00 PM',
          description: 'Transportation to Disney resorts and EPCOT.'
        },
        { 
          id: '18', 
          name: 'Ferry Dock', 
          type: 'transport', 
          x: 8, y: 5, 
          status: 'open',
          features: ['Parking Lot Connection', 'Scenic Boat Ride', 'Large Capacity'],
          operatingHours: '7:00 AM - 11:00 PM',
          description: 'Boat transportation from the parking lot to Magic Kingdom.'
        }
      ]
    },
    {
      id: 'epcot',
      name: 'EPCOT',
      image: '🌍',
      locations: [
        { id: '1', name: 'Guardians of the Galaxy', type: 'attraction', x: 20, y: 20, waitTime: 45, status: 'open', rating: 4.8 },
        { id: '2', name: 'Test Track', type: 'attraction', x: 25, y: 25, waitTime: 40, status: 'open', rating: 4.6 },
        { id: '3', name: 'Soarin\' Around the World', type: 'attraction', x: 30, y: 30, waitTime: 35, status: 'open', rating: 4.7 },
        { id: '4', name: 'Frozen Ever After', type: 'attraction', x: 60, y: 40, waitTime: 50, status: 'open', rating: 4.5 },
        { id: '5', name: 'Remy\'s Ratatouille Adventure', type: 'attraction', x: 55, y: 35, waitTime: 30, status: 'open', rating: 4.6 },
        { id: '6', name: 'Mission: SPACE', type: 'attraction', x: 35, y: 35, waitTime: 20, status: 'open', rating: 4.3 },
        { id: '7', name: 'Spaceship Earth', type: 'attraction', x: 50, y: 50, waitTime: 15, status: 'open', rating: 4.4 },
        { id: '8', name: 'Space 220 Restaurant', type: 'dining', x: 22, y: 22, status: 'open', rating: 4.6 },
        { id: '9', name: 'Le Cellier Steakhouse', type: 'dining', x: 65, y: 45, status: 'open', rating: 4.8 },
        { id: '10', name: 'Via Napoli', type: 'dining', x: 70, y: 50, status: 'open', rating: 4.5 },
        { id: '11', name: 'Mouse Gear', type: 'shop', x: 45, y: 45, status: 'open' },
        { id: '12', name: 'World Showcase Plaza', type: 'service', x: 55, y: 55, status: 'open' }
      ]
    },
    {
      id: 'hollywood-studios',
      name: 'Disney\'s Hollywood Studios',
      image: '🎬',
      locations: [
        { id: '1', name: 'Star Wars: Rise of the Resistance', type: 'attraction', x: 20, y: 30, waitTime: 120, status: 'open', rating: 4.9 },
        { id: '2', name: 'Millennium Falcon: Smugglers Run', type: 'attraction', x: 25, y: 35, waitTime: 45, status: 'open', rating: 4.5 },
        { id: '3', name: 'Tower of Terror', type: 'attraction', x: 60, y: 40, waitTime: 35, status: 'open', rating: 4.7 },
        { id: '4', name: 'Rock \'n\' Roller Coaster', type: 'attraction', x: 65, y: 45, waitTime: 40, status: 'open', rating: 4.8 },
        { id: '5', name: 'Mickey & Minnie\'s Runaway Railway', type: 'attraction', x: 40, y: 20, waitTime: 30, status: 'open', rating: 4.6 },
        { id: '6', name: 'Slinky Dog Dash', type: 'attraction', x: 30, y: 60, waitTime: 50, status: 'open', rating: 4.5 },
        { id: '7', name: 'Toy Story Mania', type: 'attraction', x: 35, y: 65, waitTime: 25, status: 'open', rating: 4.4 },
        { id: '8', name: 'Oga\'s Cantina', type: 'dining', x: 22, y: 32, status: 'open', rating: 4.5 },
        { id: '9', name: 'Sci-Fi Dine-In Theater', type: 'dining', x: 50, y: 30, status: 'open', rating: 4.3 },
        { id: '10', name: 'Mickey & Minnie\'s Runaway Railway Shop', type: 'shop', x: 42, y: 22, status: 'open' },
        { id: '11', name: 'Guest Relations', type: 'service', x: 35, y: 15, status: 'open' }
      ]
    },
    {
      id: 'animal-kingdom',
      name: 'Disney\'s Animal Kingdom',
      image: '🦁',
      locations: [
        { id: '1', name: 'Avatar Flight of Passage', type: 'attraction', x: 20, y: 20, waitTime: 75, status: 'open', rating: 4.9 },
        { id: '2', name: 'Na\'vi River Journey', type: 'attraction', x: 25, y: 25, waitTime: 30, status: 'open', rating: 4.4 },
        { id: '3', name: 'Expedition Everest', type: 'attraction', x: 60, y: 40, waitTime: 25, status: 'open', rating: 4.8 },
        { id: '4', name: 'Kilimanjaro Safaris', type: 'attraction', x: 40, y: 60, waitTime: 20, status: 'open', rating: 4.8 },
        { id: '5', name: 'Dinosaur', type: 'attraction', x: 70, y: 30, waitTime: 15, status: 'open', rating: 4.2 },
        { id: '6', name: 'It\'s Tough to be a Bug', type: 'attraction', x: 50, y: 50, waitTime: 10, status: 'open', rating: 4.1 },
        { id: '7', name: 'Tusker House Restaurant', type: 'dining', x: 42, y: 62, status: 'open', rating: 4.3 },
        { id: '8', name: 'Nomad Lounge', type: 'dining', x: 45, y: 45, status: 'open', rating: 4.8 },
        { id: '9', name: 'Windtraders', type: 'shop', x: 22, y: 22, status: 'open' },
        { id: '10', name: 'Discovery Trading Company', type: 'shop', x: 48, y: 48, status: 'open' }
      ]
    }
  ];

  const currentMap = parkMaps.find(map => map.id === selectedPark);
  const filteredLocations = currentMap?.locations.filter(location => {
    const matchesType = filters.type === 'all' || location.type === filters.type;
    const matchesStatus = filters.status === 'all' || location.status === filters.status;
    const matchesSearch = filters.search === '' || 
      location.name.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  }) || [];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'attraction': return '🎢';
      case 'dining': return '🍽️';
      case 'shop': return '🛍️';
      case 'service': return 'ℹ️';
      case 'transport': return '🚌';
      case 'restroom': return '🚻';
      default: return '📍';
    }
  };

  const getLocationColor = (location: MapLocation) => {
    if (location.status === 'down') return 'bg-red-500';
    if (location.status === 'closed') return 'bg-gray-500';
    if (location.waitTime && location.waitTime > 60) return 'bg-red-400';
    if (location.waitTime && location.waitTime > 30) return 'bg-orange-400';
    if (location.waitTime && location.waitTime > 15) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  const getLocationSize = (location: MapLocation) => {
    if (location.type === 'attraction' && location.waitTime && location.waitTime > 60) return 'w-6 h-6';
    if (location.type === 'attraction') return 'w-5 h-5';
    return 'w-4 h-4';
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
              Park Maps
            </h1>
            <Wand2 className="w-12 h-12 text-magic-pink animate-wand-sparkle ml-4" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Interactive maps with real-time wait times and location information
          </p>
        </motion.div>

        {/* Park Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          {parkMaps.map((park) => (
            <motion.button
              key={park.id}
              onClick={() => setSelectedPark(park.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedPark === park.id
                  ? 'bg-gradient-compass text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{park.image}</span>
              <span>{park.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search locations..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
            >
              <option value="all" className="bg-white text-gray-900">All Types</option>
              <option value="attraction" className="bg-white text-gray-900">Attractions</option>
              <option value="dining" className="bg-white text-gray-900">Dining</option>
              <option value="shop" className="bg-white text-gray-900">Shops</option>
              <option value="service" className="bg-white text-gray-900">Services</option>
              <option value="transport" className="bg-white text-gray-900">Transportation</option>
            </select>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
            >
              <option value="all" className="bg-white text-gray-900">All Status</option>
              <option value="open" className="bg-white text-gray-900">Open</option>
              <option value="closed" className="bg-white text-gray-900">Closed</option>
              <option value="down" className="bg-white text-gray-900">Down</option>
            </select>

            {/* Legend */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm font-medium">Legend:</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white p-8 rounded-2xl border border-gray-200 mb-8 shadow-sm"
        >
          <div className="text-center mb-6">
            <h2 className="luxury-text text-2xl font-semibold text-gray-900 mb-2">
              {currentMap?.name}
            </h2>
            <p className="text-gray-800 font-medium">
              Click on any location for more information
            </p>
          </div>

          {/* Interactive Map */}
          <div className="relative bg-white rounded-xl p-8 min-h-[500px] border border-gray-200 shadow-lg">
            <div className="relative w-full h-full">
              {filteredLocations.map((location) => (
                <motion.button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`absolute ${getLocationColor(location)} ${getLocationSize(location)} rounded-full border-2 border-white shadow-lg hover:scale-125 transition-all duration-300 flex items-center justify-center text-white text-xs font-bold`}
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  title={location.name}
                >
                  {location.waitTime && location.waitTime > 0 ? (
                    <span className="text-xs">{location.waitTime}</span>
                  ) : (
                    <span className="text-xs">{getLocationIcon(location.type)}</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Location List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getLocationIcon(location.type)}</span>
                <div className="flex-1">
                  <h3 className="luxury-text text-lg font-semibold text-gray-900">
                    {location.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {location.waitTime && location.waitTime > 0 && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{location.waitTime} min</span>
                      </div>
                    )}
                    {location.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-disney-gold fill-current" />
                        <span>{location.rating}</span>
                      </div>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      location.status === 'open' ? 'bg-green-500/20 text-green-400' :
                      location.status === 'closed' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {location.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Location Detail Modal */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedLocation(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{getLocationIcon(selectedLocation.type)}</span>
                    <div>
                      <h2 className="luxury-text text-2xl font-semibold text-white">
                        {selectedLocation.name}
                      </h2>
                      <div className="flex items-center space-x-2 text-castle-silver">
                        <span className="capitalize">{selectedLocation.type}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedLocation.status === 'open' ? 'bg-green-500/20 text-green-400' :
                          selectedLocation.status === 'closed' ? 'bg-gray-500/20 text-gray-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {selectedLocation.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-castle-silver hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedLocation.waitTime && selectedLocation.waitTime > 0 && (
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-disney-gold" />
                        <span className="text-white font-semibold">Current Wait Time</span>
                      </div>
                      <span className="text-2xl font-bold text-disney-gold">
                        {selectedLocation.waitTime} min
                      </span>
                    </div>
                  )}

                  {selectedLocation.rating && (
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-disney-gold fill-current" />
                        <span className="text-white font-semibold">Guest Rating</span>
                      </div>
                      <span className="text-2xl font-bold text-disney-gold">
                        {selectedLocation.rating}
                      </span>
                    </div>
                  )}

                  {selectedLocation.description && (
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h3 className="text-white font-semibold mb-2">Description</h3>
                      <p className="text-slate-light">{selectedLocation.description}</p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="flex-1 py-3 px-6 rounded-xl border border-white/20 text-slate-light hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      Close
                    </button>
                    <button
                      className="flex-1 btn-primary py-3 px-6 rounded-xl"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Navigation size={18} />
                        <span>Get Directions</span>
                      </div>
                    </button>
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

export default ParkMaps;
