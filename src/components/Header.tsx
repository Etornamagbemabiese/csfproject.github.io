import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Home, MessageCircle, User, Settings, X, MapPin, Wand2 } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'concierge', label: 'Magic Guide', icon: MessageCircle },
    { id: 'luxury-hubs', label: 'Parks & Resorts', icon: MapPin },
    { id: 'profile', label: 'My Journey', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Compass className="w-10 h-10 text-disney-gold animate-compass-spin drop-shadow-lg" />
              <Wand2 className="absolute -top-1 -right-1 w-5 h-5 text-magic-sparkle animate-wand-sparkle drop-shadow-lg" />
            </div>
            <div className="luxury-text text-2xl font-bold text-white drop-shadow-lg">
              Mickey's Compass
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                    isActive 
                      ? 'bg-gradient-compass text-white shadow-lg' 
                      : 'text-slate-light hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-compass rounded-lg -z-10"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden border-t border-white/10 bg-black/20 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-compass text-white' 
                        : 'text-slate-light hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
