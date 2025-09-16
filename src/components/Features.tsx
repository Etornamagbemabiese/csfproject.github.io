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

const Features: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Navigation",
      description: "AI-powered park navigation with real-time wait times and optimal routing",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Perfect Timing",
      description: "Get the best times to visit attractions and avoid crowds",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Group Planning",
      description: "Coordinate with family and friends for seamless group experiences",
      color: "from-green-500 to-emerald-500"
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
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="luxury-text text-display font-bold text-off-white mb-6">
            Magical Features
          </h2>
          <p className="text-subheading text-soft-gray max-w-4xl mx-auto leading-relaxed">
            Discover all the ways our AI concierge can make your Disney experience truly magical
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
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
                whileHover={{ y: -6 }}
              >
                <div className="card h-full group-hover:shadow-2xl group-hover:shadow-soft-blue/20">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="luxury-text text-lg font-semibold text-off-white mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-soft-gray text-sm text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle accent */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-soft-blue rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="card-elevated max-w-3xl mx-auto">
            <h3 className="luxury-text text-heading font-bold text-off-white mb-6">
              Ready for Your Extraordinary Quest?
            </h3>
            <p className="text-soft-gray mb-8 text-body">
              Join thousands of adventurers who have experienced the enchantment with our mystical guide
            </p>
            <motion.button
              className="btn-primary px-8 py-4 text-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Begin Your Quest
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
