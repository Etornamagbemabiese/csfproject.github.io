import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Camera, 
  MapPin, 
  Clock, 
  Star,
  Compass,
  Wand2,
  Heart,
  Gift,
  Zap,
  Music,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'recommendation' | 'quick-action';
  data?: any;
}

const AIConcierge: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome, friend! 🧭 I'm Mickey's Compass, your personal magic maker! I'm here to guide you through the most wonderful places on earth. What magical adventure shall we plan today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: MapPin, label: "Plan My Day", action: "Create a personalized itinerary for my park visit" },
    { icon: Clock, label: "Wait Times", action: "Show me current wait times for all attractions" },
    { icon: Star, label: "Dining Magic", action: "Find available dining reservations and recommendations" },
    { icon: Gift, label: "Souvenir Hunt", action: "Where can I find exclusive Disney merchandise?" },
    { icon: Camera, label: "Photo Spots", action: "Show me the best photo opportunities and PhotoPass locations" },
    { icon: Heart, label: "Meet Characters", action: "When and where can I meet Disney characters?" },
    { icon: Compass, label: "Navigation", action: "Help me navigate between attractions efficiently" },
    { icon: Zap, label: "Weather Update", action: "What's the current weather and indoor activity recommendations?" },
    { icon: Music, label: "Shows & Events", action: "What entertainment and shows are happening today?" }
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response with more realistic timing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // 0.8-2 second delay for more natural feel
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Planning and Itineraries
    if (input.includes('plan') || input.includes('day') || input.includes('itinerary') || input.includes('schedule')) {
      return "🧭 Perfect! Let me craft your magical day! Here's my recommended itinerary:\n\n**Morning (9-12 PM):**\n• Start at Space Mountain (15 min wait)\n• Pirates of the Caribbean (5 min wait)\n• Haunted Mansion (10 min wait)\n\n**Afternoon (12-4 PM):**\n• Lunch at Be Our Guest (booked for 1:30 PM)\n• Big Thunder Mountain (25 min wait)\n• Splash Mountain (20 min wait)\n\n**Evening (4-8 PM):**\n• Character meet at Town Square\n• Dinner at Cinderella's Royal Table (7 PM)\n• Fireworks viewing at 9 PM\n\nWould you like me to adjust this plan or add specific attractions?";
    }
    
    // Dining and Food
    else if (input.includes('dining') || input.includes('restaurant') || input.includes('food') || input.includes('eat') || input.includes('meal')) {
      return "🍽️ Magical dining options available now:\n\n**Character Dining:**\n• Chef Mickey's (Contemporary Resort) - 7:30 PM available\n• Cinderella's Royal Table - 6:45 PM available\n• Be Our Guest (Fantasyland) - 1:30 PM available\n\n**Quick Service:**\n• Dole Whip at Aloha Isle (Adventureland)\n• Turkey Leg at Frontierland\n• Mickey Pretzel at Main Street\n\n**Fine Dining:**\n• Victoria & Albert's (Grand Floridian) - 8:00 PM\n• California Grill (Contemporary) - 7:15 PM\n\nWhich type of dining experience interests you most?";
    }
    
    // Wait Times
    else if (input.includes('wait') || input.includes('line') || input.includes('queue') || input.includes('time')) {
      return "⏰ Current wait times (updated 2 minutes ago):\n\n**Magic Kingdom:**\n• Space Mountain: 15 minutes ⭐\n• Big Thunder Mountain: 25 minutes\n• Haunted Mansion: 10 minutes ⭐\n• Pirates of the Caribbean: 5 minutes ⭐\n• It's a Small World: 8 minutes\n• Seven Dwarfs Mine Train: 45 minutes\n\n**Pro Tips:**\n• Use Lightning Lane for popular rides\n• Best times: 9-11 AM and 6-8 PM\n• Avoid 12-3 PM (peak crowds)\n\nWhich attraction are you most excited about?";
    }
    
    // Photos and Memories
    else if (input.includes('photo') || input.includes('picture') || input.includes('camera') || input.includes('memory')) {
      return "📸 Magical photo opportunities:\n\n**Best Photo Spots:**\n• Cinderella Castle (golden hour 6-7 PM)\n• Main Street USA (vintage charm)\n• Galaxy's Edge (at night with lights)\n• Tomorrowland (futuristic backdrop)\n• Adventureland (jungle vibes)\n\n**Character Photo Ops:**\n• Mickey Mouse - Town Square (10 AM-6 PM)\n• Princesses - Fairytale Hall (9 AM-8 PM)\n• Star Wars - Galaxy's Edge (all day)\n\n**PhotoPass Locations:**\n• Castle front, Main Street, Tomorrowland\n• Professional photographers available\n• Digital downloads included with Memory Maker\n\nWant me to help you plan the perfect photo route?";
    }
    
    // Souvenirs and Shopping
    else if (input.includes('souvenir') || input.includes('gift') || input.includes('shop') || input.includes('buy') || input.includes('merchandise')) {
      return "🛍️ Best shopping destinations:\n\n**Must-Visit Shops:**\n• World of Disney (largest selection)\n• Emporium (Main Street classics)\n• Galaxy's Edge shops (Star Wars exclusives)\n• Fantasyland shops (princess items)\n\n**Exclusive Items:**\n• Limited edition pins\n• Park-specific merchandise\n• Custom ears and accessories\n• Collectible figures\n\n**Shopping Tips:**\n• Ask about exclusive park items\n• Check for limited editions\n• Use Disney Genie+ for shopping\n• Package pickup available\n\nWhat type of souvenirs are you looking for?";
    }
    
    // Characters and Meet & Greets
    else if (input.includes('character') || input.includes('meet') || input.includes('mickey') || input.includes('princess') || input.includes('disney friends')) {
      return "🎭 Character meet & greet schedule:\n\n**Available Now:**\n• Mickey Mouse - Town Square (10 AM-6 PM)\n• Minnie Mouse - Town Square (10 AM-6 PM)\n• Goofy - Tomorrowland (11 AM-7 PM)\n• Donald Duck - Adventureland (12 PM-8 PM)\n\n**Princesses:**\n• Elsa & Anna - Fairytale Hall (9 AM-8 PM)\n• Cinderella - Fairytale Hall (9 AM-8 PM)\n• Belle - Fantasyland (10 AM-7 PM)\n\n**Star Wars:**\n• Rey - Galaxy's Edge (all day)\n• Kylo Ren - Galaxy's Edge (all day)\n• Chewbacca - Galaxy's Edge (all day)\n\n**Tips:**\n• Bring autograph books\n• Use Lightning Lane for popular characters\n• Best times: early morning or evening\n\nWhich character would you love to meet?";
    }
    
    // Navigation and Directions
    else if (input.includes('navigate') || input.includes('navigation') || input.includes('directions') || input.includes('where') || input.includes('how to get')) {
      return "🧭 Navigation assistance:\n\n**Transportation Options:**\n• Monorail (Magic Kingdom ↔ Epcot)\n• Skyliner (Epcot ↔ Hollywood Studios)\n• Ferry boats (Magic Kingdom ↔ TTC)\n• Buses (all parks and resorts)\n\n**Walking Routes:**\n• Main Street to Fantasyland: 5 minutes\n• Tomorrowland to Adventureland: 8 minutes\n• Galaxy's Edge to Toy Story Land: 12 minutes\n\n**AR Navigation Features:**\n• Real-time directions\n• Crowd avoidance\n• Wait time integration\n• Photo spot alerts\n\n**Pro Tips:**\n• Download My Disney Experience app\n• Use Genie+ for optimal routing\n• Check park maps at entrances\n\nWhere would you like to go?";
    }
    
    // Weather and Conditions
    else if (input.includes('weather') || input.includes('rain') || input.includes('hot') || input.includes('temperature')) {
      return "🌤️ Current park conditions:\n\n**Weather:**\n• Temperature: 78°F (perfect!)\n• Conditions: Partly cloudy\n• Rain chance: 20% (afternoon)\n• Humidity: 65%\n\n**Indoor Attractions (if needed):**\n• Haunted Mansion\n• Pirates of the Caribbean\n• It's a Small World\n• Carousel of Progress\n• Hall of Presidents\n\n**Weather Tips:**\n• Pack ponchos (cheaper than park ones)\n• Stay hydrated\n• Use indoor attractions during storms\n• Don't forget sunscreen\n• Afternoon storms usually pass quickly\n\n**Best Times Today:**\n• Morning: 9-11 AM (coolest)\n• Evening: 6-8 PM (comfortable)\n\nNeed recommendations for indoor activities?";
    }
    
    // Special Events and Shows
    else if (input.includes('show') || input.includes('parade') || input.includes('fireworks') || input.includes('event') || input.includes('entertainment')) {
      return "🎪 Today's entertainment schedule:\n\n**Parades:**\n• Festival of Fantasy Parade - 3:00 PM\n• Mickey's Royal Friendship Faire - 12:30 PM, 2:30 PM, 4:30 PM\n\n**Fireworks:**\n• Happily Ever After - 9:00 PM\n• Best viewing: Main Street or Tomorrowland\n\n**Shows:**\n• Mickey's PhilharMagic - Every 30 minutes\n• Country Bear Jamboree - Every 45 minutes\n• Enchanted Tiki Room - Every 20 minutes\n\n**Special Events:**\n• Character Cavalcades (throughout day)\n• Street performers on Main Street\n• Galaxy's Edge shows (all day)\n\n**Pro Tips:**\n• Arrive 30 minutes early for parades\n• Use Lightning Lane for shows\n• Best parade spots: Main Street curb\n\nWhich entertainment interests you most?";
    }
    
    // Help and General Questions
    else if (input.includes('help') || input.includes('what can you do') || input.includes('capabilities')) {
      return "🌟 I'm Mickey's Compass, your personal Disney assistant! Here's what I can help with:\n\n**Planning:**\n• Create custom itineraries\n• Optimize your park day\n• Schedule dining reservations\n• Plan character meet & greets\n\n**Real-Time Info:**\n• Current wait times\n• Weather conditions\n• Show schedules\n• Special events\n\n**Navigation:**\n• AR-guided directions\n• Crowd avoidance\n• Transportation options\n• Photo spot locations\n\n**Dining:**\n• Restaurant recommendations\n• Reservation availability\n• Menu suggestions\n• Character dining options\n\n**Shopping:**\n• Souvenir recommendations\n• Exclusive merchandise\n• Shop locations\n• Package pickup\n\nWhat would you like help with first?";
    }
    
    // Default response
    else {
      return "✨ That's a great question! I'm Mickey's Compass, your personal magic maker at Disney Parks! I can help you with:\n\n• Planning your perfect day\n• Finding the best dining spots\n• Checking wait times\n• Meeting characters\n• Taking amazing photos\n• Shopping for souvenirs\n• Navigating the parks\n• Weather updates\n• Show schedules\n\nJust ask me anything about your Disney adventure! What magical experience are you looking for today? 🎭";
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Compass className="w-12 h-12 text-disney-gold mr-4 animate-compass-spin drop-shadow-lg" />
            <h1 className="luxury-text text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent drop-shadow-lg">Mickey's Compass</h1>
            <Wand2 className="w-12 h-12 text-magic-sparkle ml-4 animate-wand-sparkle drop-shadow-lg" />
          </div>
          <p className="text-xl text-slate-light font-medium">Your personal magic maker at Disney Parks</p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card-elevated rounded-3xl border border-white/20 overflow-hidden"
        >
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-2xl px-6 py-5 rounded-2xl ${
                    message.isUser 
                      ? 'bg-gradient-compass text-white shadow-lg' 
                      : 'bg-white/15 text-white border border-white/25 backdrop-blur-sm shadow-lg'
                  }`}>
                    <div className={`text-base leading-relaxed ${
                      message.isUser ? 'font-medium' : 'font-normal'
                    }`}>
                      {message.isUser ? (
                        <p>{message.text}</p>
                      ) : (
                        <div className="space-y-3">
                          {message.text.split('\n').map((line, index) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <h4 key={index} className="text-lg font-semibold text-disney-gold mt-4 mb-2">
                                  {line.replace(/\*\*/g, '')}
                                </h4>
                              );
                            } else if (line.startsWith('•')) {
                              return (
                                <div key={index} className="flex items-start space-x-2">
                                  <span className="text-disney-gold mt-1">•</span>
                                  <span className="text-white/90">{line.substring(1).trim()}</span>
                                </div>
                              );
                            } else if (line.trim() === '') {
                              return <br key={index} />;
                            } else {
                              return (
                                <p key={index} className="text-white/90">
                                  {line}
                                </p>
                              );
                            }
                          })}
                        </div>
                      )}
                    </div>
                    <p className={`text-xs mt-4 ${
                      message.isUser ? 'text-white/70' : 'text-white/60'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 text-white border border-white/20 px-5 py-4 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <Wand2 className="w-5 h-5 text-disney-gold animate-wand-sparkle" />
                    <span className="text-base font-medium">Mickey's Compass is thinking...</span>
                    <div className="loading-dots"></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t border-white/10 p-4">
            <p className="text-base text-slate-light mb-4 font-medium">Quick Actions:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-disney-gold/30 rounded-xl transition-all duration-300 text-white text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={16} />
                    <span>{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Suggested Prompts Dropdown */}
          <div className="border-t border-white/10 p-4">
            <div className="relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-disney-gold/30 transition-all duration-300 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-slate-light">Choose a prompt to get started...</span>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </motion.button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg z-10"
                  >
                    <div className="p-2 space-y-1">
                      {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                          <motion.button
                            key={index}
                            onClick={() => {
                              handleQuickAction(action.action);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                            whileHover={{ x: 4 }}
                          >
                            <Icon size={18} className="text-disney-gold" />
                            <div>
                              <div className="font-medium">{action.label}</div>
                              <div className="text-sm text-slate-light">{action.action}</div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIConcierge;
