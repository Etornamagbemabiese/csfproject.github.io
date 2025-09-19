import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  Star,
  Users,
  Zap,
  Compass,
  Wand2,
  Filter
} from 'lucide-react';

interface WaitTimeData {
  id: string;
  name: string;
  park: string;
  location: string;
  currentWait: number;
  previousWait: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  status: 'operating' | 'down' | 'closed';
  lightningLane: boolean;
  rating: number;
  type: 'ride' | 'show' | 'meet-greet';
}

const WaitTimeTracker: React.FC = () => {
  const [waitTimes, setWaitTimes] = useState<WaitTimeData[]>([
    {
      id: '1',
      name: 'Avatar Flight of Passage',
      park: 'Disney\'s Animal Kingdom',
      location: 'Pandora',
      currentWait: 75,
      previousWait: 90,
      trend: 'down',
      lastUpdated: '2 minutes ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.9,
      type: 'ride'
    },
    {
      id: '2',
      name: 'Star Wars: Rise of the Resistance',
      park: 'Disney\'s Hollywood Studios',
      location: 'Galaxy\'s Edge',
      currentWait: 120,
      previousWait: 110,
      trend: 'up',
      lastUpdated: '1 minute ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.9,
      type: 'ride'
    },
    {
      id: '3',
      name: 'Guardians of the Galaxy: Cosmic Rewind',
      park: 'EPCOT',
      location: 'World Discovery',
      currentWait: 45,
      previousWait: 45,
      trend: 'stable',
      lastUpdated: '3 minutes ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.8,
      type: 'ride'
    },
    {
      id: '4',
      name: 'Space Mountain',
      park: 'Magic Kingdom',
      location: 'Tomorrowland',
      currentWait: 30,
      previousWait: 35,
      trend: 'down',
      lastUpdated: '1 minute ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.8,
      type: 'ride'
    },
    {
      id: '5',
      name: 'Pirates of the Caribbean',
      park: 'Magic Kingdom',
      location: 'Adventureland',
      currentWait: 15,
      previousWait: 20,
      trend: 'down',
      lastUpdated: '2 minutes ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.9,
      type: 'ride'
    },
    {
      id: '6',
      name: 'Haunted Mansion',
      park: 'Magic Kingdom',
      location: 'Liberty Square',
      currentWait: 25,
      previousWait: 30,
      trend: 'down',
      lastUpdated: '1 minute ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.7,
      type: 'ride'
    },
    {
      id: '7',
      name: 'Seven Dwarfs Mine Train',
      park: 'Magic Kingdom',
      location: 'Fantasyland',
      currentWait: 60,
      previousWait: 55,
      trend: 'up',
      lastUpdated: '2 minutes ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.6,
      type: 'ride'
    },
    {
      id: '8',
      name: 'Big Thunder Mountain Railroad',
      park: 'Magic Kingdom',
      location: 'Frontierland',
      currentWait: 20,
      previousWait: 25,
      trend: 'down',
      lastUpdated: '1 minute ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.7,
      type: 'ride'
    },
    {
      id: '9',
      name: 'Splash Mountain',
      park: 'Magic Kingdom',
      location: 'Frontierland',
      currentWait: 0,
      previousWait: 40,
      trend: 'down',
      lastUpdated: '5 minutes ago',
      status: 'down',
      lightningLane: true,
      rating: 4.6,
      type: 'ride'
    },
    {
      id: '10',
      name: 'Jungle Cruise',
      park: 'Magic Kingdom',
      location: 'Adventureland',
      currentWait: 35,
      previousWait: 30,
      trend: 'up',
      lastUpdated: '2 minutes ago',
      status: 'operating',
      lightningLane: true,
      rating: 4.5,
      type: 'ride'
    }
  ]);

  const [selectedPark, setSelectedPark] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'wait' | 'name' | 'rating'>('wait');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const parks = ['all', 'Magic Kingdom', 'EPCOT', 'Disney\'s Hollywood Studios', 'Disney\'s Animal Kingdom'];

  const filteredWaitTimes = waitTimes
    .filter(item => selectedPark === 'all' || item.park === selectedPark)
    .sort((a, b) => {
      switch (sortBy) {
        case 'wait':
          return a.currentWait - b.currentWait;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const refreshWaitTimes = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update wait times with random changes
    setWaitTimes(prev => prev.map(item => ({
      ...item,
      previousWait: item.currentWait,
      currentWait: Math.max(0, item.currentWait + Math.floor(Math.random() * 20) - 10),
      lastUpdated: 'Just now',
      trend: Math.random() > 0.5 ? 'up' : 'down'
    })));
    
    setIsRefreshing(false);
  };

  const getWaitTimeColor = (waitTime: number, status: string) => {
    if (status !== 'operating') return 'text-red-400';
    if (waitTime <= 15) return 'text-green-400';
    if (waitTime <= 30) return 'text-yellow-400';
    if (waitTime <= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getWaitTimeBg = (waitTime: number, status: string) => {
    if (status !== 'operating') return 'bg-red-500/20 border-red-500/30';
    if (waitTime <= 15) return 'bg-green-500/20 border-green-500/30';
    if (waitTime <= 30) return 'bg-yellow-500/20 border-yellow-500/30';
    if (waitTime <= 60) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operating': return '🟢';
      case 'down': return '🔴';
      case 'closed': return '⚫';
      default: return '🟡';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-400" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshWaitTimes();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

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
              Wait Times
            </h1>
            <Wand2 className="w-12 h-12 text-magic-pink animate-wand-sparkle ml-4" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Real-time wait times for all Disney attractions
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 mb-8 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Park Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-disney-gold" />
              <select
                value={selectedPark}
                onChange={(e) => setSelectedPark(e.target.value)}
                className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
              >
                {parks.map(park => (
                  <option key={park} value={park} className="bg-neutral-black">
                    {park === 'all' ? 'All Parks' : park}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Sort by:</span>
              <div className="flex space-x-2">
                {[
                  { value: 'wait', label: 'Wait Time', icon: Clock },
                  { value: 'name', label: 'Name', icon: Users },
                  { value: 'rating', label: 'Rating', icon: Star }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSortBy(value as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      sortBy === value
                        ? 'bg-gradient-compass text-white'
                        : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Refresh Button */}
            <motion.button
              onClick={refreshWaitTimes}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm">Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Wait Times Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWaitTimes.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white p-6 rounded-2xl border border-gray-200 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md ${getWaitTimeBg(item.currentWait, item.status)}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {item.type === 'ride' ? '🎢' : item.type === 'show' ? '🎭' : '🤝'}
                  </span>
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-4 h-4 text-disney-gold fill-current" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <div className="text-xs text-gray-600">{item.lastUpdated}</div>
                </div>
              </div>

              {/* Wait Time */}
              <div className="text-center mb-4">
                <div className={`text-4xl font-bold mb-2 ${getWaitTimeColor(item.currentWait, item.status)}`}>
                  {item.status === 'operating' ? `${item.currentWait} min` : 
                   item.status === 'down' ? 'DOWN' : 'CLOSED'}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {getTrendIcon(item.trend)}
                  <span className="text-sm text-gray-600">
                    {item.status === 'operating' && item.previousWait !== item.currentWait && 
                     `was ${item.previousWait} min`}
                  </span>
                </div>
              </div>

              {/* Status & Features */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(item.status)}</span>
                  <span className="text-sm text-gray-600 capitalize">{item.status}</span>
                </div>
                {item.lightningLane && (
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-disney-gold" />
                    <span className="text-xs text-disney-gold">Lightning Lane</span>
                  </div>
                )}
              </div>

              {/* Park Badge */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full inline-block">
                  {item.park}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 mt-8 shadow-sm"
        >
          <h3 className="luxury-text text-lg font-semibold text-gray-900 mb-4">Wait Time Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">0-15 min (Great!)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">16-30 min (Good)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">31-60 min (Moderate)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">60+ min (Long)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaitTimeTracker;
