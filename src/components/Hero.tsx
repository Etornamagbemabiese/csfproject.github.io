import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Wand2, ArrowRight, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <Compass className="w-8 h-8 sm:w-12 sm:h-12 text-white mr-3 sm:mr-6 opacity-80" />
              <h1 className="font-disney text-3xl sm:text-5xl md:text-7xl text-white tracking-wide">
                Mickey's Compass
              </h1>
              <Wand2 className="w-8 h-8 sm:w-12 sm:h-12 text-white ml-3 sm:ml-6 opacity-80" />
            </div>
            <p className="font-disney-body text-xl sm:text-2xl md:text-3xl text-white max-w-4xl mx-auto leading-relaxed font-medium mb-4 sm:mb-6 px-4">
              Your Personal Magic Maker at Disney Parks
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-quicksand px-4">
              Transform overwhelming Disney planning into magical adventures with AI-powered guidance
            </p>
          </motion.div>

          {/* Problem/Solution Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12 sm:mb-16 px-4"
          >
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="text-center md:text-right">
                <h3 className="text-lg sm:text-xl font-semibold text-red-300 mb-2">The Problem</h3>
                <p className="text-base sm:text-lg text-slate-light leading-relaxed">
                  Planning Disney trips is overwhelming. Too many options, long lines, and missed experiences.
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-disney-gold mb-2">The Solution</h3>
                <p className="text-base sm:text-lg text-slate-light leading-relaxed">
                  Mickey's Compass creates personalized itineraries, handles dining reservations, and guides you with AR navigation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
          >
            <motion.button
              onClick={onGetStarted}
              className="btn-primary group relative px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-2xl shadow-2xl overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-disney-gold to-disney-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                <Compass size={20} className="sm:w-6 sm:h-6" />
                <span>Start Your Magical Journey</span>
                <ArrowRight size={20} className="sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>

          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4"
          >
            {[
              {
                icon: MapPin,
                title: "Personalized Itineraries",
                description: "AI creates custom park plans based on your family's interests and preferences"
              },
              {
                icon: Clock,
                title: "Smart Dining Reservations",
                description: "Automatic booking for character meals, fine dining, and popular restaurants"
              },
              {
                icon: Compass,
                title: "AR Navigation & Tips",
                description: "Guided directions with magical AR overlays and real-time insider tips"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="card group"
                  whileHover={{ y: -8, scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                >
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-compass rounded-2xl group-hover:animate-glow shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="luxury-text text-2xl font-semibold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-slate-light text-center leading-relaxed text-lg">
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
