import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Users, 
  Camera, 
  Utensils, 
  Gift, 
  Shield, 
  Zap,
  Heart,
  Globe,
  Calendar
} from 'lucide-react';

interface FeaturesProps {
  onNavigateToSection?: (section: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigateToSection }) => {
  const features = [
    {
      icon: MapPin,
      title: "Magic Chat",
      description: "AI-powered park navigation with real-time wait times and optimal routing",
      color: "from-sky-300 to-blue-400",
      clickable: true,
      action: "concierge"
    },
    {
      icon: Calendar,
      title: "Book Magic",
      description: "Reserve rides, lounges, and exclusive experiences",
      color: "from-purple-500 to-pink-500",
      clickable: true,
      action: "booking"
    },
    {
      icon: Users,
      title: "Family Profiles",
      description: "Create personalized profiles for each family member",
      color: "from-sky-300 to-blue-400",
      clickable: true,
      action: "family"
    },
    {
      icon: Clock,
      title: "Wait Times",
      description: "Real-time wait times for all Disney attractions",
      color: "from-yellow-500 to-orange-500",
      clickable: true,
      action: "wait-times"
    },
    {
      icon: Utensils,
      title: "Dining Reservations",
      description: "Secure reservations at the most sought-after restaurants",
      color: "from-red-500 to-rose-500",
      clickable: true,
      action: "dining"
    },
    {
      icon: MapPin,
      title: "Park Maps",
      description: "Interactive maps with real-time location information",
      color: "from-blue-600 to-indigo-500",
      clickable: true,
      action: "maps"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Real-time safety updates and emergency assistance",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Calendar,
      title: "My Itinerary",
      description: "Plan and organize your perfect Disney day",
      color: "from-amber-500 to-yellow-500",
      clickable: true,
      action: "itinerary"
    },
    {
      icon: Heart,
      title: "Memories Made",
      description: "Create lasting memories with personalized experiences",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Globe,
      title: "All Parks",
      description: "Support for all Disney parks worldwide",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Magical Features
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the ways our AI concierge can make your Disney experience truly magical
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                        <div
                          className={`bg-white p-4 md:p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full group-hover:shadow-xl touch-manipulation ${feature.clickable ? 'cursor-pointer' : ''}`}
                          onClick={feature.clickable && onNavigateToSection ? () => onNavigateToSection(feature.action) : undefined}
                        >
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    
                            {/* Content */}
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 text-center leading-tight">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm text-center leading-relaxed">
                              {feature.description}
                            </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center mt-16 sm:mt-20"
                >
                  <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-lg max-w-3xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      Ready for Your Magical Journey?
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Join thousands of families who have transformed their Disney experience with our AI-powered planning
                    </p>
                    <motion.button
                      onClick={() => onNavigateToSection && onNavigateToSection('concierge')}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Gift size={20} />
                      <span className="text-lg">Start Your Journey</span>
                    </motion.button>
                  </div>
                </motion.div>
      </div>
    </section>
  );
};

export default Features;
