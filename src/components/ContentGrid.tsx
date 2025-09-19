import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, MapPin, Utensils, Gift, Camera, Heart } from 'lucide-react';

interface ContentGridProps {
  onNavigateToSection?: (section: string) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ onNavigateToSection }) => {
  const contentItems = [
    {
      id: 'magic-guide',
      title: 'AI Magic Chat',
      description: 'Your personal Disney assistant',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
      category: 'feature',
      action: 'concierge',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'character-meet',
      title: 'Character Meet & Greet',
      description: 'Meet your favorite Disney characters',
      image: '/mickeymouse2.jpg',
      category: 'experience',
      action: 'booking',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'family-fun',
      title: 'Family Adventures',
      description: 'Create memories together',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      category: 'family',
      action: 'family',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'dining-experience',
      title: 'Magical Dining',
      description: 'Fine dining with Disney magic',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      category: 'dining',
      action: 'dining',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'park-maps',
      title: 'Interactive Maps',
      description: 'Navigate with ease',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      category: 'navigation',
      action: 'maps',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'wait-times',
      title: 'Smart Wait Times',
      description: 'Skip the lines, maximize fun',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      category: 'optimization',
      action: 'wait-times',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'memories',
      title: 'Photo Memories',
      description: 'Capture every magical moment',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop',
      category: 'memories',
      action: 'concierge',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'special-events',
      title: 'Special Events',
      description: 'Exclusive Disney experiences',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      category: 'events',
      action: 'booking',
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'feature': return Star;
      case 'experience': return Gift;
      case 'family': return Users;
      case 'dining': return Utensils;
      case 'navigation': return MapPin;
      case 'optimization': return Clock;
      case 'memories': return Camera;
      case 'events': return Heart;
      default: return Star;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Discover More Magic
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all the ways Magic Chat can make your Disney experience unforgettable
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentItems.map((item, index) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <motion.div
                key={item.id}
                className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => onNavigateToSection && onNavigateToSection(item.action)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Category icon */}
                  <div className={`absolute top-3 left-3 w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/5 group-hover:to-purple-600/5 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Magical Journey?
            </h3>
            <p className="text-gray-700 mb-6">
              Join thousands of families who have transformed their Disney experience with our AI-powered planning
            </p>
            <motion.button
              onClick={() => onNavigateToSection && onNavigateToSection('concierge')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>

        {/* Picture under everything */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop"
              alt="Disney Magic Experience"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h4 className="text-white text-xl md:text-2xl font-bold mb-2">
                Experience the Magic
              </h4>
              <p className="text-white text-sm md:text-base">
                Create unforgettable memories with your family at the most magical place on earth
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentGrid;


