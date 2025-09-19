import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Search, ChevronDown, X, Users, Clock, User } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showParksDropdown, setShowParksDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [mobileParksOpen, setMobileParksOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setMobileParksOpen(false);
        setMobileMoreOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'concierge', label: 'MAGIC GUIDE' },
    { id: 'parks', label: 'PARKS & TRAVEL', hasDropdown: true },
    { id: 'booking', label: 'BOOK MAGIC' },
    { id: 'dining', label: 'DINING' },
    { id: 'more', label: 'MORE', hasDropdown: true },
  ];

  const parksDropdownItems = [
    { id: 'magic-kingdom', label: 'Magic Kingdom' },
    { id: 'epcot', label: 'EPCOT' },
    { id: 'hollywood-studios', label: 'Hollywood Studios' },
    { id: 'animal-kingdom', label: 'Animal Kingdom' },
    { id: 'disney-springs', label: 'Disney Springs' },
  ];

  const moreDropdownItems = [
    { id: 'itinerary', label: 'My Itinerary', icon: Clock },
    { id: 'wait-times', label: 'Wait Times', icon: Clock },
    { id: 'family', label: 'Family Profiles', icon: Users },
    { id: 'my-journey', label: 'My Journey', icon: User },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSectionChange('home')}
          >
            <Compass className="w-8 h-8 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'cursive' }}>
              Magic Chat
            </div>
          </motion.button>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <motion.button
                  onClick={() => {
                    if (item.hasDropdown) {
                      if (item.id === 'parks') {
                        setShowParksDropdown(!showParksDropdown);
                        setShowMoreDropdown(false);
                      } else if (item.id === 'more') {
                        setShowMoreDropdown(!showMoreDropdown);
                        setShowParksDropdown(false);
                      }
                    } else {
                      onSectionChange(item.id);
                      setShowParksDropdown(false);
                      setShowMoreDropdown(false);
                    }
                  }}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown size={14} />}
                </motion.button>

                {/* Parks Dropdown */}
                {item.id === 'parks' && showParksDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg py-2"
                  >
                    {parksDropdownItems.map((park) => (
                      <button
                        key={park.id}
                        onClick={() => {
                          onSectionChange('maps');
                          setShowParksDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors duration-200"
                      >
                        {park.label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* More Dropdown */}
                {item.id === 'more' && showMoreDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg py-2"
                  >
                    {moreDropdownItems.map((moreItem) => {
                      const Icon = moreItem.icon;
                      return (
                        <button
                          key={moreItem.id}
                          onClick={() => {
                            onSectionChange(moreItem.id);
                            setShowMoreDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3"
                        >
                          <Icon size={16} />
                          <span>{moreItem.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side - Login and Search */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm">
              LOG IN
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : (
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
            ref={mobileMenuRef}
            className="lg:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto overscroll-contain"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e0 #f7fafc'
            }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        if (item.id === 'parks') {
                          setMobileParksOpen(!mobileParksOpen);
                        } else if (item.id === 'more') {
                          setMobileMoreOpen(!mobileMoreOpen);
                        }
                      } else {
                        onSectionChange(item.id);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="w-full text-left px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <motion.div
                        animate={{ rotate: item.id === 'parks' ? (mobileParksOpen ? 180 : 0) : (mobileMoreOpen ? 180 : 0) }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} className="text-gray-400" />
                      </motion.div>
                    )}
                  </button>
                  
                  {/* Mobile dropdown items - Parks */}
                  {item.id === 'parks' && (
                    <AnimatePresence>
                      {mobileParksOpen && (
                        <motion.div 
                          className="ml-4 space-y-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {parksDropdownItems.map((park) => (
                            <button
                              key={park.id}
                              onClick={() => {
                                onSectionChange('maps');
                                setIsMobileMenuOpen(false);
                                setMobileParksOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-md"
                            >
                              {park.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                  
                  {/* Mobile dropdown items - More */}
                  {item.id === 'more' && (
                    <AnimatePresence>
                      {mobileMoreOpen && (
                        <motion.div 
                          className="ml-4 space-y-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {moreDropdownItems.map((moreItem) => {
                            const Icon = moreItem.icon;
                            return (
                              <button
                                key={moreItem.id}
                                onClick={() => {
                                  onSectionChange(moreItem.id);
                                  setIsMobileMenuOpen(false);
                                  setMobileMoreOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3 rounded-md"
                              >
                                <Icon size={16} />
                                <span>{moreItem.label}</span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              
              {/* Mobile login and search */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button 
                  onClick={() => {
                    onSectionChange('my-journey');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 font-medium rounded-md"
                >
                  LOG IN
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;