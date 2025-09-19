import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ContentGrid from './components/ContentGrid';
import Booking from './components/Booking';
import ItineraryBuilder from './components/ItineraryBuilder';
import WaitTimeTracker from './components/WaitTimeTracker';
import DiningReservations from './components/DiningReservations';
import ParkMaps from './components/ParkMaps';
import FamilyProfiles from './components/FamilyProfiles';
import AIConcierge from './components/AIConcierge';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'booking':
        return <Booking />;
      case 'itinerary':
        return <ItineraryBuilder />;
      case 'wait-times':
        return <WaitTimeTracker />;
      case 'dining':
        return <DiningReservations />;
      case 'maps':
        return <ParkMaps />;
      case 'family':
        return <FamilyProfiles />;
      case 'concierge':
        return <AIConcierge />;
      case 'my-journey':
        return <Login onLoginSuccess={() => setActiveSection('concierge')} />;
              default:
                return (
                  <>
                    <Hero onGetStarted={() => setActiveSection('concierge')} />
                    <ContentGrid onNavigateToSection={setActiveSection} />
                    <Features onNavigateToSection={setActiveSection} />
                  </>
                );
    }
  };

  return (
    <div className="min-h-screen bg-white">

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
    </div>
  );
}

export default App;
