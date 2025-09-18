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
            <div className="flex items-center justify-center mb-8 sm:mb-10">
              <Compass className="w-10 h-10 sm:w-14 sm:h-14 text-disney-gold mr-4 sm:mr-8 animate-compass-spin drop-shadow-lg" />
              <h1 className="font-disney text-4xl sm:text-6xl md:text-8xl magical-text tracking-wide">
                Mickey's Compass
              </h1>
              <Wand2 className="w-10 h-10 sm:w-14 sm:h-14 text-magic-pink ml-4 sm:ml-8 animate-wand-sparkle drop-shadow-lg" />
            </div>
            <p className="font-disney-body text-2xl sm:text-3xl md:text-4xl text-white max-w-4xl mx-auto leading-relaxed font-medium mb-6 sm:mb-8 px-4">
              Your Personal <span className="sparkle-text magical-text">Magic</span> Maker at Disney Parks
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-castle-silver max-w-4xl mx-auto leading-relaxed font-nunito px-4">
              Transform overwhelming Disney planning into <span className="magical-text">magical adventures</span> with AI-powered guidance
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
                <div
                  key={index}
                  className="card group"
                >
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-compass rounded-2xl shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="luxury-text text-2xl font-semibold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-slate-light text-center leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
