import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Wand2, ArrowRight, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main heading - Positioned lower on page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center justify-center mb-12 sm:mb-16">
            <Compass className="w-16 h-16 sm:w-20 sm:h-20 text-disney-gold mr-4 sm:mr-6 animate-compass-spin drop-shadow-lg" />
            <h1 className="font-disney text-6xl sm:text-8xl md:text-9xl magical-text tracking-wide text-center">
              Mickey's Compass
            </h1>
            <Wand2 className="w-16 h-16 sm:w-20 sm:h-20 text-magic-pink ml-4 sm:ml-6 animate-wand-sparkle drop-shadow-lg" />
          </div>
          <p className="font-disney-body text-3xl sm:text-4xl md:text-5xl text-white max-w-5xl mx-auto leading-relaxed font-medium mb-8 sm:mb-12 px-4">
            Your Personal <span className="sparkle-text magical-text">Magic</span> Maker at Disney Parks
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl text-castle-silver max-w-4xl mx-auto leading-relaxed font-nunito px-4">
            Transform overwhelming Disney planning into <span className="magical-text">magical adventures</span> with AI-powered guidance
          </p>
        </motion.div>


        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 sm:mb-20 px-4"
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center justify-center mb-64 sm:mb-96"
        >
            <div className="text-castle-silver text-sm font-nunito mb-4">Scroll for more magic</div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-disney-gold rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-disney-gold rounded-full mt-2"
              />
            </motion.div>
          </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
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
    </section>
  );
};

export default Hero;
