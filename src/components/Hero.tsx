import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Crown, Wand2, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center mb-8">
              <Crown className="w-12 h-12 text-gold mr-4 animate-glow" />
              <h1 className="luxury-text text-hero font-bold text-off-white tracking-tight">
                Disney AI Concierge
              </h1>
              <Sparkles className="w-12 h-12 text-soft-blue ml-4 animate-sparkle" />
            </div>
            <p className="text-subheading text-medium-gray max-w-4xl mx-auto leading-relaxed">
              Your magical guide to the most wonderful places on earth
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body text-soft-gray max-w-3xl mx-auto mb-16"
          >
            Experience Disney parks like never before with our luxury AI concierge. 
            Get personalized recommendations, skip the lines, and create magical memories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <motion.button
              onClick={onGetStarted}
              className="group relative px-8 py-4 bg-soft-blue text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-soft-blue to-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Wand2 size={20} />
                <span>Start Your Magic</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>

            <motion.button
              className="group flex items-center space-x-3 px-8 py-4 bg-white/5 backdrop-blur-sm text-off-white font-semibold rounded-xl border border-white/20 hover:border-soft-blue/50 hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Star,
                title: "Personalized Magic",
                description: "AI-powered recommendations tailored to your preferences"
              },
              {
                icon: Crown,
                title: "Luxury Experience",
                description: "Premium concierge service with exclusive access"
              },
              {
                icon: Sparkles,
                title: "Seamless Planning",
                description: "Effortless itinerary planning and real-time updates"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-8 group"
                  whileHover={{ y: -4, scale: 1.01 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-soft-blue to-emerald rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="luxury-text text-heading font-semibold text-off-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-soft-gray text-center leading-relaxed">
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
