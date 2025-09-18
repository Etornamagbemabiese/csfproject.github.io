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
  Globe
} from 'lucide-react';

interface FeaturesProps {
  onNavigateToSection?: (section: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigateToSection }) => {
  const features = [
    {
      icon: MapPin,
      title: "Magic Guide",
      description: "AI-powered park navigation with real-time wait times and optimal routing",
      color: "from-sky-300 to-blue-400",
      clickable: true,
      action: "concierge"
    },
    {
      icon: Clock,
      title: "Parks & Resorts",
      description: "Get the best times to visit attractions and avoid crowds",
      color: "from-sky-300 to-blue-400",
      clickable: true,
      action: "luxury-hubs"
    },
    {
      icon: Users,
      title: "Group Planning",
      description: "Coordinate with family and friends for seamless group experiences",
      color: "from-sky-300 to-blue-400",
      clickable: true,
      action: "concierge"
    },
    {
      icon: Camera,
      title: "Photo Opportunities",
      description: "Discover the best photo spots and character meet-and-greets",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Utensils,
      title: "Dining Reservations",
      description: "Secure reservations at the most sought-after restaurants",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Gift,
      title: "Exclusive Access",
      description: "VIP experiences and behind-the-scenes tours",
      color: "from-blue-600 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Real-time safety updates and emergency assistance",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant responses and real-time park updates",
      color: "from-amber-500 to-yellow-500"
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
    <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="luxury-text text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Magical Features
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2">
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
                  className={`glass-effect p-3 sm:p-4 md:p-6 rounded-xl border border-white/10 hover:border-luxury-gold/30 transition-all duration-300 h-full group-hover:shadow-2xl group-hover:shadow-luxury-gold/20 touch-manipulation ${feature.clickable ? 'cursor-pointer active:scale-95' : ''}`}
                  onClick={feature.clickable && onNavigateToSection ? () => onNavigateToSection(feature.action) : undefined}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 bg-gradient-to-br ${feature.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="luxury-text text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-2 text-center leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Sparkle effect */}
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-luxury-gold rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Souvenir Hunt Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="glass-effect p-6 sm:p-8 rounded-2xl border border-white/10 max-w-2xl mx-auto">
            <h3 className="luxury-text text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Ready for Your Extraordinary Quest?
            </h3>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Join thousands of adventurers who have experienced the enchantment with our mystical guide
            </p>
            <motion.button
              onClick={() => onNavigateToSection && onNavigateToSection('concierge')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-300 to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 mx-auto min-h-[48px] touch-manipulation"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift size={18} className="sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Start Souvenir Hunt</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
