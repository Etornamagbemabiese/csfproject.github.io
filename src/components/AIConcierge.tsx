import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
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
  ChevronDown,
  Search,
  Send,
  X
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
      text: "Welcome, friend! 🧭 I'm Magic Chat, your personal magic maker! I'm here to guide you through the most wonderful places on earth. What magical adventure shall we plan today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // Auto-focus search input on mobile when component mounts
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && searchInputRef.current) {
      // Small delay to ensure component is fully rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 500);
    }
  }, []);

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
    setIsTyping(true);
    setSearchInput(''); // Clear search input after sending
    setShowQuickPrompts(false); // Hide quick prompts after user sends a message

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleSendMessage(searchInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearchSubmit(e);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setShowSearchSuggestions(value.length > 0 && isSearchFocused);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSearchSuggestions(searchInput.length > 0);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSearchSuggestions(false), 200);
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
      return "🌟 I'm Magic Chat, your personal Disney assistant! Here's what I can help with:\n\n**Planning:**\n• Create custom itineraries\n• Optimize your park day\n• Schedule dining reservations\n• Plan character meet & greets\n\n**Real-Time Info:**\n• Current wait times\n• Weather conditions\n• Show schedules\n• Special events\n\n**Navigation:**\n• AR-guided directions\n• Crowd avoidance\n• Transportation options\n• Photo spot locations\n\n**Dining:**\n• Restaurant recommendations\n• Reservation availability\n• Menu suggestions\n• Character dining options\n\n**Shopping:**\n• Souvenir recommendations\n• Exclusive merchandise\n• Shop locations\n• Package pickup\n\nWhat would you like help with first?";
    }
    
    // Default response
    else {
      return "✨ That's a great question! I'm Magic Chat, your personal magic maker at Disney Parks! I can help you with:\n\n• Planning your perfect day\n• Finding the best dining spots\n• Checking wait times\n• Meeting characters\n• Taking amazing photos\n• Shopping for souvenirs\n• Navigating the parks\n• Weather updates\n• Show schedules\n\nJust ask me anything about your Disney adventure! What magical experience are you looking for today? 🎭";
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };


  return (
    <div className="pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8 px-2 sm:px-4 md:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4 md:mb-6 gap-2 sm:gap-4">
            <Compass className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-disney-gold animate-compass-spin drop-shadow-lg order-1 sm:order-1" />
            <h1 className="luxury-text text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent drop-shadow-lg order-2 sm:order-2">Magic Chat</h1>
            <Wand2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-magic-sparkle animate-wand-sparkle drop-shadow-lg order-3 sm:order-3" />
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium px-2">Your personal magic maker at Disney Parks</p>
        </motion.div>


        {/* Quick Actions Dropdown - Moved to top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 sm:mb-6"
        >
          <div className="relative">
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-disney-gold transition-all duration-300 text-sm touch-manipulation min-h-[48px] shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                <Wand2 size={16} className="text-disney-gold" />
                <span className="text-gray-700 text-left font-medium">Quick Actions & Prompts</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 sm:max-h-96 overflow-hidden"
                >
                  <div className="p-2 space-y-1 overflow-y-auto max-h-72 sm:max-h-80">
                    <div className="px-3 py-2 text-xs font-semibold text-disney-gold uppercase tracking-wide border-b border-gray-200 mb-2">
                      Popular Questions
                    </div>
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => {
                            handleQuickAction(action.action);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 touch-manipulation min-h-[48px] group border border-transparent hover:border-gray-200"
                          whileHover={{ x: 4 }}
                        >
                          <div className="flex-shrink-0">
                            <Icon size={16} className="text-disney-gold group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate text-gray-900">{action.label}</div>
                            <div className="text-xs text-gray-500 truncate mt-1">{action.action}</div>
                          </div>
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Send size={14} className="text-disney-gold" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-200 overflow-visible shadow-lg"
        >
          {/* Messages */}
          <div className="h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem] xl:h-[40rem] overflow-y-auto p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-xs md:max-w-sm lg:max-w-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-5 rounded-xl sm:rounded-2xl ${
                    message.isUser 
                      ? 'bg-gradient-compass text-white shadow-lg' 
                      : 'bg-gray-50 text-gray-900 border border-gray-200 shadow-sm'
                  }`}>
                    <div className={`text-xs sm:text-sm md:text-base leading-relaxed ${
                      message.isUser ? 'font-medium' : 'font-normal'
                    }`}>
                      {message.isUser ? (
                        <p>{message.text}</p>
                      ) : (
                        <div className="space-y-2 sm:space-y-3">
                          {message.text.split('\n').map((line, index) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <h4 key={index} className="text-sm sm:text-base md:text-lg font-semibold text-disney-gold mt-2 sm:mt-3 md:mt-4 mb-1 sm:mb-2">
                                  {line.replace(/\*\*/g, '')}
                                </h4>
                              );
                            } else if (line.startsWith('•')) {
                              return (
                                <div key={index} className="flex items-start space-x-2">
                                  <span className="text-disney-gold mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base">•</span>
                                  <span className="text-gray-700 text-xs sm:text-sm md:text-base">{line.substring(1).trim()}</span>
                                </div>
                              );
                            } else if (line.trim() === '') {
                              return <br key={index} />;
                            } else {
                              return (
                                <p key={index} className="text-gray-700 text-xs sm:text-sm md:text-base">
                                  {line}
                                </p>
                              );
                            }
                          })}
                        </div>
                      )}
                    </div>
                    <p className={`text-xs mt-1 sm:mt-2 md:mt-4 ${
                      message.isUser ? 'text-white/70' : 'text-gray-500'
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
                <div className="bg-gray-50 text-gray-700 border border-gray-200 px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-disney-gold animate-wand-sparkle" />
                    <span className="text-xs sm:text-sm md:text-base font-medium">Magic Chat is thinking...</span>
                    <div className="loading-dots"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Prompts in Chat */}
            {showQuickPrompts && messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="max-w-[85%] sm:max-w-xs md:max-w-sm lg:max-w-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-5 rounded-xl sm:rounded-2xl bg-gray-50 text-gray-900 border border-gray-200 shadow-sm">
                  <div className="text-sm font-medium text-gray-700 mb-3">Try asking:</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Plan my perfect Disney day",
                      "What are the current wait times?",
                      "Find me dining reservations",
                      "Where can I meet Mickey Mouse?",
                      "Show me the best photo spots",
                      "What's the weather like today?"
                    ].map((prompt, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-50 hover:border-disney-gold transition-all duration-200 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Search Input */}
          <div className="border-t border-white/10 p-2 sm:p-3 md:p-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Ask Magic Chat anything about Disney Parks..."
                  className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 md:py-4 bg-white border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-disney-gold focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300 text-sm sm:text-base touch-manipulation min-h-[44px] shadow-sm"
                />
                {searchInput && (
                  <motion.button
                    type="button"
                    onClick={() => {
                      setSearchInput('');
                      setShowSearchSuggestions(false);
                    }}
                    className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  disabled={!searchInput.trim()}
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-gradient-to-r from-sky-300 to-blue-400 text-white rounded-md sm:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation min-h-[36px] min-w-[36px]"
                  whileHover={{ scale: searchInput.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: searchInput.trim() ? 0.95 : 1 }}
                >
                  <Send size={14} />
                </motion.button>
              </div>
              
              {/* Search Suggestions */}
              <AnimatePresence>
                {showSearchSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg z-30"
                  >
                    <div className="p-2 space-y-1">
                      {quickActions
                        .filter(action => 
                          action.label.toLowerCase().includes(searchInput.toLowerCase()) ||
                          action.action.toLowerCase().includes(searchInput.toLowerCase())
                        )
                        .slice(0, 3)
                        .map((action, index) => {
                          const Icon = action.icon;
                          return (
                            <motion.button
                              key={index}
                              onClick={() => {
                                handleQuickAction(action.action);
                                setSearchInput('');
                                setShowSearchSuggestions(false);
                              }}
                              className="w-full flex items-center space-x-3 px-3 py-2.5 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 touch-manipulation"
                              whileHover={{ x: 4 }}
                            >
                              <Icon size={16} className="text-disney-gold" />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{action.label}</div>
                                <div className="text-xs text-gray-500 truncate">{action.action}</div>
                              </div>
                  </motion.button>
                );
              })}
            </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default AIConcierge;
