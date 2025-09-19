import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Wand2,
  Compass,
  Heart,
  Crown,
  Zap
} from 'lucide-react';

interface BookingItem {
  id: string;
  name: string;
  type: 'ride' | 'lounge';
  location: string;
  duration: string;
  capacity: number;
  rating: number;
  price: number;
  description: string;
  image: string;
  availableSlots: string[];
  features: string[];
}

const Booking: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'ride' | 'lounge'>('ride');
  const [selectedItem, setSelectedItem] = useState<BookingItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const bookingItems: BookingItem[] = [
    // RIDES & ATTRACTIONS
    {
      id: '1',
      name: 'Avatar Flight of Passage',
      type: 'ride',
      location: 'Disney\'s Animal Kingdom - Pandora',
      duration: '4 minutes',
      capacity: 8,
      rating: 4.9,
      price: 0,
      description: 'Soar on the back of a mountain banshee in this breathtaking 3D flying simulator experience.',
      image: '🦅',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 44"', '3D Experience', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '2',
      name: 'Star Wars: Rise of the Resistance',
      type: 'ride',
      location: 'Disney\'s Hollywood Studios - Galaxy\'s Edge',
      duration: '18 minutes',
      capacity: 8,
      rating: 4.9,
      price: 0,
      description: 'Join the Resistance in this epic battle against the First Order in an immersive multi-ride experience.',
      image: '⚔️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 40"', 'Multi-Ride Experience', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '3',
      name: 'Guardians of the Galaxy: Cosmic Rewind',
      type: 'ride',
      location: 'EPCOT - World Discovery',
      duration: '4 minutes',
      capacity: 4,
      rating: 4.8,
      price: 0,
      description: 'Join the Guardians on a thrilling adventure through space with a reverse-launch roller coaster.',
      image: '🌌',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 42"', 'Reverse Launch', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '4',
      name: 'TRON Lightcycle / Run',
      type: 'ride',
      location: 'Magic Kingdom - Tomorrowland',
      duration: '2 minutes',
      capacity: 2,
      rating: 4.7,
      price: 0,
      description: 'Race through the digital world on a high-speed lightcycle in this thrilling coaster experience.',
      image: '🏍️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 48"', 'High Speed', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '5',
      name: 'Seven Dwarfs Mine Train',
      type: 'ride',
      location: 'Magic Kingdom - Fantasyland',
      duration: '3 minutes',
      capacity: 4,
      rating: 4.6,
      price: 0,
      description: 'Journey through the diamond mine with the Seven Dwarfs in this family-friendly coaster.',
      image: '⛏️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 38"', 'Family Friendly', 'Thrill Level: Moderate', 'Lightning Lane Available']
    },
    {
      id: '6',
      name: 'Expedition Everest',
      type: 'ride',
      location: 'Disney\'s Animal Kingdom - Asia',
      duration: '3 minutes',
      capacity: 6,
      rating: 4.8,
      price: 0,
      description: 'Race through the Himalayas on a runaway train while avoiding the legendary Yeti.',
      image: '🏔️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 44"', 'Big Drops', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '7',
      name: 'Space Mountain',
      type: 'ride',
      location: 'Magic Kingdom - Tomorrowland',
      duration: '3 minutes',
      capacity: 6,
      rating: 4.8,
      price: 0,
      description: 'Blast off on a thrilling journey through space in this iconic indoor roller coaster.',
      image: '🚀',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 44"', 'Indoor Coaster', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '8',
      name: 'Big Thunder Mountain Railroad',
      type: 'ride',
      location: 'Magic Kingdom - Frontierland',
      duration: '3 minutes',
      capacity: 6,
      rating: 4.7,
      price: 0,
      description: 'Race through the gold rush on this runaway mine train through the Wild West.',
      image: '🚂',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 40"', 'Mine Train', 'Thrill Level: Moderate', 'Lightning Lane Available']
    },
    {
      id: '9',
      name: 'Splash Mountain',
      type: 'ride',
      location: 'Magic Kingdom - Frontierland',
      duration: '11 minutes',
      capacity: 6,
      rating: 4.6,
      price: 0,
      description: 'Join Br\'er Rabbit on a musical journey that ends with a thrilling 52-foot drop.',
      image: '💧',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 40"', 'Water Ride', 'Thrill Level: Moderate', 'Lightning Lane Available']
    },
    {
      id: '10',
      name: 'Pirates of the Caribbean',
      type: 'ride',
      location: 'Magic Kingdom - Adventureland',
      duration: '8 minutes',
      capacity: 8,
      rating: 4.9,
      price: 0,
      description: 'Sail through a pirate adventure with animatronic characters and special effects.',
      image: '🏴‍☠️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Boat Ride', 'Classic Disney', 'Lightning Lane Available']
    },
    {
      id: '11',
      name: 'Haunted Mansion',
      type: 'ride',
      location: 'Magic Kingdom - Liberty Square',
      duration: '10 minutes',
      capacity: 6,
      rating: 4.7,
      price: 0,
      description: 'Enter the mysterious mansion for a spooky but family-friendly adventure with 999 happy haunts.',
      image: '👻',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Dark Ride', 'Classic Disney', 'Lightning Lane Available']
    },
    {
      id: '12',
      name: 'Jungle Cruise',
      type: 'ride',
      location: 'Magic Kingdom - Adventureland',
      duration: '10 minutes',
      capacity: 8,
      rating: 4.5,
      price: 0,
      description: 'Take a hilarious riverboat cruise through exotic jungles with witty skippers.',
      image: '🌴',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Boat Ride', 'Comedy', 'Lightning Lane Available']
    },
    {
      id: '13',
      name: 'Peter Pan\'s Flight',
      type: 'ride',
      location: 'Magic Kingdom - Fantasyland',
      duration: '3 minutes',
      capacity: 4,
      rating: 4.6,
      price: 0,
      description: 'Fly over London and Neverland in this magical dark ride adventure.',
      image: '🧚‍♀️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Dark Ride', 'Classic Disney', 'Lightning Lane Available']
    },
    {
      id: '14',
      name: 'It\'s a Small World',
      type: 'ride',
      location: 'Magic Kingdom - Fantasyland',
      duration: '11 minutes',
      capacity: 8,
      rating: 4.4,
      price: 0,
      description: 'Take a gentle boat ride through scenes representing countries around the world.',
      image: '🌍',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Boat Ride', 'Classic Disney', 'Lightning Lane Available']
    },
    {
      id: '15',
      name: 'Soarin\' Around the World',
      type: 'ride',
      location: 'EPCOT - World Nature',
      duration: '5 minutes',
      capacity: 8,
      rating: 4.7,
      price: 0,
      description: 'Soar over iconic landmarks around the world in this breathtaking hang-gliding simulation.',
      image: '🌍',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 40"', 'Simulation', 'Thrill Level: Low', 'Lightning Lane Available']
    },
    {
      id: '16',
      name: 'Test Track',
      type: 'ride',
      location: 'EPCOT - World Discovery',
      duration: '5 minutes',
      capacity: 6,
      rating: 4.6,
      price: 0,
      description: 'Design and test your own concept car before taking it on a high-speed test drive.',
      image: '🏎️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 40"', 'High Speed', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '17',
      name: 'Frozen Ever After',
      type: 'ride',
      location: 'EPCOT - World Showcase',
      duration: '5 minutes',
      capacity: 8,
      rating: 4.5,
      price: 0,
      description: 'Join Elsa, Anna, and Olaf on a musical boat ride through Arendelle.',
      image: '❄️',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Boat Ride', 'Frozen Theme', 'Lightning Lane Available']
    },
    {
      id: '18',
      name: 'Remy\'s Ratatouille Adventure',
      type: 'ride',
      location: 'EPCOT - World Showcase',
      duration: '5 minutes',
      capacity: 6,
      rating: 4.6,
      price: 0,
      description: 'Shrink down to the size of a rat and scurry through Gusteau\'s restaurant.',
      image: '🐭',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', '4D Experience', 'Ratatouille Theme', 'Lightning Lane Available']
    },
    {
      id: '19',
      name: 'Kilimanjaro Safaris',
      type: 'ride',
      location: 'Disney\'s Animal Kingdom - Africa',
      duration: '18 minutes',
      capacity: 8,
      rating: 4.8,
      price: 0,
      description: 'Take an open-air vehicle tour through the African savanna to see real animals.',
      image: '🦁',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Safari Tour', 'Real Animals', 'Lightning Lane Available']
    },
    {
      id: '20',
      name: 'Na\'vi River Journey',
      type: 'ride',
      location: 'Disney\'s Animal Kingdom - Pandora',
      duration: '5 minutes',
      capacity: 8,
      rating: 4.4,
      price: 0,
      description: 'Take a gentle boat ride through the bioluminescent rainforest of Pandora.',
      image: '🌿',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Boat Ride', 'Avatar Theme', 'Lightning Lane Available']
    },
    {
      id: '21',
      name: 'The Twilight Zone Tower of Terror',
      type: 'ride',
      location: 'Disney\'s Hollywood Studios - Sunset Boulevard',
      duration: '4 minutes',
      capacity: 6,
      rating: 4.7,
      price: 0,
      description: 'Enter the haunted Hollywood Tower Hotel for a terrifying drop into the Twilight Zone.',
      image: '🏨',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 40"', 'Drop Tower', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '22',
      name: 'Rock \'n\' Roller Coaster',
      type: 'ride',
      location: 'Disney\'s Hollywood Studios - Sunset Boulevard',
      duration: '2 minutes',
      capacity: 6,
      rating: 4.8,
      price: 0,
      description: 'Launch from 0 to 60 mph in 2.8 seconds on this high-speed indoor coaster with Aerosmith music.',
      image: '🎸',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 48"', 'High Speed', 'Thrill Level: High', 'Lightning Lane Available']
    },
    {
      id: '23',
      name: 'Mickey & Minnie\'s Runaway Railway',
      type: 'ride',
      location: 'Disney\'s Hollywood Studios - Hollywood Boulevard',
      duration: '5 minutes',
      capacity: 8,
      rating: 4.6,
      price: 0,
      description: 'Join Mickey and Minnie on a wacky train ride through their cartoon world.',
      image: '🚂',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['All Ages', 'Dark Ride', 'Mickey Mouse', 'Lightning Lane Available']
    },
    {
      id: '24',
      name: 'Millennium Falcon: Smugglers Run',
      type: 'ride',
      location: 'Disney\'s Hollywood Studios - Galaxy\'s Edge',
      duration: '5 minutes',
      capacity: 6,
      rating: 4.5,
      price: 0,
      description: 'Pilot the Millennium Falcon on a smuggling mission in this interactive experience.',
      image: '🛸',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 38"', 'Interactive', 'Star Wars Theme', 'Lightning Lane Available']
    },
    {
      id: '25',
      name: 'Slinky Dog Dash',
      type: 'ride',
      location: 'Disney\'s Hollywood Studios - Toy Story Land',
      duration: '2 minutes',
      capacity: 4,
      rating: 4.5,
      price: 0,
      description: 'Race through Andy\'s backyard on this family-friendly coaster inspired by Slinky Dog.',
      image: '🐕',
      availableSlots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
      features: ['Height Requirement: 38"', 'Family Coaster', 'Toy Story Theme', 'Lightning Lane Available']
    },

    // LOUNGES & DINING
    {
      id: '26',
      name: 'Oga\'s Cantina',
      type: 'lounge',
      location: 'Disney\'s Hollywood Studios - Galaxy\'s Edge',
      duration: '45 minutes',
      capacity: 8,
      rating: 4.6,
      price: 25,
      description: 'Experience the cantina from Star Wars with themed drinks, music, and atmosphere.',
      image: '🛸',
      availableSlots: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
      features: ['Star Wars Theme', 'Themed Drinks', 'DJ R-3X', 'Reservation Required']
    },
    {
      id: '27',
      name: 'Space 220 Lounge',
      type: 'lounge',
      location: 'EPCOT - World Discovery',
      duration: '2 hours',
      capacity: 6,
      rating: 4.7,
      price: 45,
      description: 'Dine 220 miles above Earth with stunning space views and cosmic cocktails.',
      image: '🚀',
      availableSlots: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
      features: ['Space Theme', 'Premium Cocktails', 'Stunning Views', 'Reservation Required']
    },
    {
      id: '28',
      name: 'Nomad Lounge',
      type: 'lounge',
      location: 'Disney\'s Animal Kingdom - Discovery Island',
      duration: '1 hour',
      capacity: 6,
      rating: 4.8,
      price: 20,
      description: 'Relax in this adventure-themed lounge with specialty cocktails and small plates.',
      image: '🌿',
      availableSlots: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
      features: ['Adventure Theme', 'Outdoor Seating', 'Craft Cocktails', 'Walk-up Available']
    },
    {
      id: '29',
      name: 'Trader Sam\'s Grog Grotto',
      type: 'lounge',
      location: 'Disney\'s Polynesian Village Resort',
      duration: '1 hour',
      capacity: 6,
      rating: 4.8,
      price: 35,
      description: 'Tiki-themed lounge with interactive elements, tropical cocktails, and magical surprises.',
      image: '🌺',
      availableSlots: ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'],
      features: ['Tiki Theme', 'Interactive Elements', 'Tropical Drinks', 'Resort Access Required']
    },
    {
      id: '30',
      name: 'Enchanted Rose',
      type: 'lounge',
      location: 'Disney\'s Grand Floridian Resort & Spa',
      duration: '1 hour',
      capacity: 4,
      rating: 4.7,
      price: 30,
      description: 'Elegant Beauty and the Beast-inspired lounge with premium cocktails and small plates.',
      image: '🌹',
      availableSlots: ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'],
      features: ['Beauty & Beast Theme', 'Elegant Atmosphere', 'Premium Cocktails', 'Resort Access Required']
    }
  ];

  const filteredItems = bookingItems.filter(item => item.type === selectedType);

  const handleBookNow = () => {
    if (selectedItem && selectedSlot) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmBooking = () => {
    // Here you would typically send the booking to a backend
    alert(`Booking confirmed! ${selectedItem?.name} at ${selectedSlot} for ${partySize} guest(s).`);
    setShowConfirmation(false);
    setSelectedItem(null);
    setSelectedSlot('');
    setPartySize(1);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Compass className="w-12 h-12 text-disney-gold animate-compass-spin mr-4" />
            <h1 className="font-disney text-4xl md:text-6xl magical-text">
              Book Your Magic
            </h1>
            <Wand2 className="w-12 h-12 text-magic-pink animate-wand-sparkle ml-4" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Reserve your spot for the most magical experiences at Disney Parks
          </p>
        </motion.div>

        {/* Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
            <div className="flex space-x-2">
              {[
                { type: 'ride' as const, label: 'Rides & Attractions', icon: Zap },
                { type: 'lounge' as const, label: 'Lounges & Dining', icon: Crown }
              ].map(({ type, label, icon: Icon }) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-gradient-compass text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="card group cursor-pointer bg-white border border-gray-200 shadow-lg"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="text-6xl mb-4 text-center">{item.image}</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="luxury-text text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-disney-gold fill-current" />
                  <span className="text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {item.location}
              </div>
              <div className="flex items-center text-sm text-gray-700 mb-3">
                <Clock className="w-4 h-4 mr-1" />
                {item.duration}
              </div>
              <p className="text-gray-800 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                  <Users className="w-4 h-4 mr-1" />
                  Up to {item.capacity}
                </div>
                <div className="text-disney-gold font-semibold">
                  {item.price === 0 ? 'Free' : `$${item.price}`}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{selectedItem.image}</div>
                    <div>
                      <h2 className="luxury-text text-2xl font-semibold text-white">
                        {selectedItem.name}
                      </h2>
                      <div className="flex items-center text-castle-silver">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedItem.location}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-castle-silver hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-2">
                      About This Experience
                    </h3>
                    <p className="text-slate-light">{selectedItem.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-3">
                      Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-disney-gold/20 text-disney-gold rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Party Size */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-3">
                      Party Size
                    </h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-white min-w-[2rem] text-center">
                        {partySize}
                      </span>
                      <button
                        onClick={() => setPartySize(Math.min(selectedItem.capacity, partySize + 1))}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-castle-silver mt-2">
                      Maximum capacity: {selectedItem.capacity} guests
                    </p>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="luxury-text text-lg font-semibold text-white mb-3">
                      Available Times
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedItem.availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            selectedSlot === slot
                              ? 'border-disney-gold bg-disney-gold/20 text-disney-gold'
                              : 'border-white/20 hover:border-white/40 text-slate-light hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <motion.button
                    onClick={handleBookNow}
                    disabled={!selectedSlot}
                    className="w-full btn-primary py-4 text-lg font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: selectedSlot ? 1.02 : 1 }}
                    whileTap={{ scale: selectedSlot ? 0.98 : 1 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles size={20} />
                      <span>Book Now - {selectedItem.price === 0 ? 'Free' : `$${selectedItem.price * partySize}`}</span>
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl text-center"
              >
                <div className="text-6xl mb-4">✨</div>
                <h2 className="luxury-text text-2xl font-semibold text-white mb-4">
                  Booking Confirmation
                </h2>
                <div className="space-y-3 mb-6 text-left">
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Experience:</span>
                    <span className="text-white font-medium">{selectedItem?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Time:</span>
                    <span className="text-white font-medium">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Guests:</span>
                    <span className="text-white font-medium">{partySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-castle-silver">Total:</span>
                    <span className="text-disney-gold font-semibold">
                      {selectedItem?.price === 0 ? 'Free' : `$${selectedItem?.price! * partySize}`}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 py-3 px-6 rounded-xl border border-white/20 text-slate-light hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 btn-primary py-3 px-6 rounded-xl"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={20} />
                      <span>Confirm</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Booking;
