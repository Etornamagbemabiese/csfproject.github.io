import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Trash2, 
  Compass,
  Wand2
} from 'lucide-react';

interface ItineraryItem {
  id: string;
  time: string;
  name: string;
  type: 'ride' | 'dining' | 'show' | 'break' | 'transport';
  location: string;
  duration: string;
  notes?: string;
  completed: boolean;
}

interface ItineraryDay {
  id: string;
  date: string;
  park: string;
  items: ItineraryItem[];
}

const ItineraryBuilder: React.FC = () => {
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([
    {
      id: '1',
      date: '2024-01-15',
      park: 'Magic Kingdom',
      items: [
        {
          id: '1',
          time: '9:00 AM',
          name: 'Space Mountain',
          type: 'ride',
          location: 'Tomorrowland',
          duration: '30 min',
          notes: 'Get Lightning Lane pass',
          completed: false
        },
        {
          id: '2',
          time: '10:00 AM',
          name: 'Pirates of the Caribbean',
          type: 'ride',
          location: 'Adventureland',
          duration: '20 min',
          completed: false
        },
        {
          id: '3',
          time: '12:00 PM',
          name: 'Be Our Guest Restaurant',
          type: 'dining',
          location: 'Fantasyland',
          duration: '60 min',
          notes: 'Lunch reservation',
          completed: false
        }
      ]
    }
  ]);

  const [selectedDay, setSelectedDay] = useState<string>('1');
  const [showAddItem, setShowAddItem] = useState(false);

  const [newItem, setNewItem] = useState({
    time: '',
    name: '',
    type: 'ride' as const,
    location: '',
    duration: '',
    notes: ''
  });

  const itemTypes = [
    { value: 'ride', label: 'Ride/Attraction', icon: '🎢', color: 'from-blue-500 to-purple-600' },
    { value: 'dining', label: 'Dining', icon: '🍽️', color: 'from-orange-500 to-red-600' },
    { value: 'show', label: 'Show/Entertainment', icon: '🎭', color: 'from-pink-500 to-rose-600' },
    { value: 'break', label: 'Break/Rest', icon: '☕', color: 'from-green-500 to-emerald-600' },
    { value: 'transport', label: 'Transportation', icon: '🚌', color: 'from-gray-500 to-slate-600' }
  ];

  const addNewDay = () => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      park: 'Magic Kingdom',
      items: []
    };
    setItineraryDays([...itineraryDays, newDay]);
    setSelectedDay(newDay.id);
  };

  const addItem = () => {
    if (!newItem.time || !newItem.name) return;

    const item: ItineraryItem = {
      id: Date.now().toString(),
      ...newItem,
      completed: false
    };

    const updatedDays = itineraryDays.map(day => {
      if (day.id === selectedDay) {
        return { ...day, items: [...day.items, item] };
      }
      return day;
    });

    setItineraryDays(updatedDays);
    setNewItem({ time: '', name: '', type: 'ride', location: '', duration: '', notes: '' });
    setShowAddItem(false);
  };

  const toggleItemComplete = (dayId: string, itemId: string) => {
    const updatedDays = itineraryDays.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          items: day.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return day;
    });
    setItineraryDays(updatedDays);
  };

  const deleteItem = (dayId: string, itemId: string) => {
    const updatedDays = itineraryDays.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          items: day.items.filter(item => item.id !== itemId)
        };
      }
      return day;
    });
    setItineraryDays(updatedDays);
  };

  const getTypeIcon = (type: string) => {
    const typeInfo = itemTypes.find(t => t.value === type);
    return typeInfo?.icon || '🎯';
  };

  const getTypeColor = (type: string) => {
    const typeInfo = itemTypes.find(t => t.value === type);
    return typeInfo?.color || 'from-gray-500 to-slate-600';
  };

  const currentDay = itineraryDays.find(day => day.id === selectedDay);

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
              My Itinerary
            </h1>
            <Wand2 className="w-12 h-12 text-magic-pink animate-wand-sparkle ml-4" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Plan your perfect Disney day with our magical itinerary builder
          </p>
        </motion.div>

        {/* Days Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          {itineraryDays.map((day) => (
            <motion.button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedDay === day.id
                  ? 'bg-gradient-compass text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{new Date(day.date).toLocaleDateString()}</span>
                <span className="text-sm opacity-75">({day.park})</span>
              </div>
            </motion.button>
          ))}
          <motion.button
            onClick={addNewDay}
            className="px-6 py-3 rounded-xl bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} />
            <span>Add Day</span>
          </motion.button>
        </motion.div>

        {/* Itinerary Content */}
        {currentDay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Day Header */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="luxury-text text-2xl font-semibold text-gray-900 mb-2">
                    {new Date(currentDay.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {currentDay.park}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-disney-gold">
                    {currentDay.items.filter(item => item.completed).length}/{currentDay.items.length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-compass h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${currentDay.items.length > 0 ? (currentDay.items.filter(item => item.completed).length / currentDay.items.length) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>

            {/* Itinerary Items */}
            <div className="space-y-4">
              {currentDay.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="luxury-text text-xl font-semibold text-gray-900 mb-2">
                    No items planned yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start building your magical day by adding experiences
                  </p>
                  <motion.button
                    onClick={() => setShowAddItem(true)}
                    className="btn-primary px-6 py-3 rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Plus size={18} />
                      <span>Add First Item</span>
                    </div>
                  </motion.button>
                </div>
              ) : (
                currentDay.items
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`bg-white p-6 rounded-2xl border transition-all duration-300 shadow-sm ${
                        item.completed 
                          ? 'border-green-500/30 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Time */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-disney-gold to-disney-blue rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center mt-2">
                            <div className="text-sm font-semibold text-white">{item.time}</div>
                            <div className="text-xs text-gray-600">{item.duration}</div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl">{getTypeIcon(item.type)}</span>
                            <h3 className={`luxury-text text-xl font-semibold ${
                              item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}>
                              {item.name}
                            </h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(item.type)} text-white`}>
                              {itemTypes.find(t => t.value === item.type)?.label}
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            {item.location}
                          </div>
                          
                          {item.notes && (
                            <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                              <strong>Notes:</strong> {item.notes}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2">
                          <motion.button
                            onClick={() => toggleItemComplete(currentDay.id, item.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              item.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {item.completed ? '✓' : '○'}
                          </motion.button>
                          
                          <motion.button
                            onClick={() => deleteItem(currentDay.id, item.id)}
                            className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 flex items-center justify-center transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
              )}
            </div>

            {/* Add Item Button */}
            <motion.button
              onClick={() => setShowAddItem(true)}
              className="w-full bg-white p-6 rounded-2xl border border-dashed border-gray-300 hover:border-gray-400 transition-all duration-300 text-center shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <Plus className="w-6 h-6 text-disney-gold" />
                <span className="luxury-text text-lg font-semibold text-white">
                  Add New Experience
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}

        {/* Add Item Modal */}
        <AnimatePresence>
          {showAddItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddItem(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="luxury-text text-2xl font-semibold text-white mb-6">
                  Add New Experience
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Time</label>
                      <input
                        type="time"
                        value={newItem.time}
                        onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Duration</label>
                      <input
                        type="text"
                        placeholder="e.g., 30 min"
                        value={newItem.duration}
                        onChange={(e) => setNewItem({ ...newItem, duration: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Experience Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Space Mountain"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {itemTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setNewItem({ ...newItem, type: type.value as any })}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            newItem.type === type.value
                              ? 'border-disney-gold bg-disney-gold/20 text-disney-gold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span>{type.icon}</span>
                            <span className="text-sm">{type.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., Tomorrowland"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Notes (Optional)</label>
                    <textarea
                      placeholder="Any special notes or reminders..."
                      value={newItem.notes}
                      onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setShowAddItem(false)}
                    className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addItem}
                    className="flex-1 btn-primary py-3 px-6 rounded-xl"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Plus size={18} />
                      <span>Add Experience</span>
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

export default ItineraryBuilder;
