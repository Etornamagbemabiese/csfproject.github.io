import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Wand2, ArrowRight, Play, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Compass className="w-12 h-12 text-disney-gold mr-3 animate-compass-spin" />
              <h1 className="luxury-text text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Mickey's Compass
              </h1>
              <Wand2 className="w-12 h-12 text-magic-sparkle ml-3 animate-wand-sparkle" />
            </div>
            <p className="text-xl md:text-2xl text-neutral-white max-w-3xl mx-auto leading-relaxed">
              Your Personal Magic Maker at Disney Parks
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-slate-light max-w-2xl mx-auto mb-12"
          >
            Planning Disney is overwhelming. Meet Mickey's Compass, your AI concierge that creates 
            personalized itineraries, handles dining reservations, and guides you with AR navigation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
              <motion.button
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gradient-compass text-white font-semibold rounded-xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-disney-blue to-disney-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Compass size={20} />
                  <span>Start Your Journey</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.button>

            <motion.button
              className="group flex items-center space-x-2 px-8 py-4 glass-effect text-white font-semibold rounded-xl border border-white/20 hover:border-disney-gold/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: MapPin,
                title: "Personalized Itineraries",
                description: "AI creates custom park plans based on your family's interests"
              },
              {
                icon: Clock,
                title: "Dining Reservations",
                description: "Automatic booking for character meals and fine dining"
              },
              {
                icon: Compass,
                title: "AR Navigation",
                description: "Guided directions with magical AR overlays and tips"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-effect p-6 rounded-xl border border-white/10 hover:border-disney-gold/30 transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-compass rounded-full group-hover:animate-glow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="luxury-text text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-light text-center">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
