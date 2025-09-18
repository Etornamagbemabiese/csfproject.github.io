import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AIConcierge from './components/AIConcierge';
import LuxuryHubFinder from './components/LuxuryHubFinder';
import Login from './components/Login';
import Footer from './components/Footer';
import { Sparkles, Star, Compass, Wand2 } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'concierge':
        return <AIConcierge />;
      case 'luxury-hubs':
        return <LuxuryHubFinder />;
      case 'my-journey':
        return <Login onLoginSuccess={() => setActiveSection('concierge')} />;
      default:
        return (
          <>
            <Hero onGetStarted={() => setActiveSection('concierge')} />
            <Features onNavigateToSection={setActiveSection} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark">
      {/* Magical background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-disney-gold/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-disney-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-magic-sparkle/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-magic-sparkle/30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -20, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {activeSection === 'home' && <Footer />}

      {/* Mickey's Compass corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 opacity-20">
        <div className="absolute top-4 left-4 w-24 h-24 border-l-2 border-t-2 border-disney-gold rounded-tl-lg"></div>
        <Compass className="absolute top-2 left-2 text-disney-gold animate-compass-spin" size={20} />
      </div>
      
      <div className="fixed top-0 right-0 w-32 h-32 opacity-20">
        <div className="absolute top-4 right-4 w-24 h-24 border-r-2 border-t-2 border-disney-gold rounded-tr-lg"></div>
        <Star className="absolute top-2 right-2 text-disney-gold animate-sparkle" size={20} />
      </div>
      
      <div className="fixed bottom-0 left-0 w-32 h-32 opacity-20">
        <div className="absolute bottom-4 left-4 w-24 h-24 border-l-2 border-b-2 border-disney-gold rounded-bl-lg"></div>
        <Wand2 className="absolute bottom-2 left-2 text-disney-gold animate-wand-sparkle" size={20} />
      </div>
      
      <div className="fixed bottom-0 right-0 w-32 h-32 opacity-20">
        <div className="absolute bottom-4 right-4 w-24 h-24 border-r-2 border-b-2 border-disney-gold rounded-br-lg"></div>
        <Sparkles className="absolute bottom-2 right-2 text-disney-gold animate-sparkle" size={20} />
      </div>
    </div>
  );
}

export default App;
