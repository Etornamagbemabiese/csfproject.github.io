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
  Gift
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: MapPin, label: "Plan My Day", action: "Help me plan the perfect day at the parks" },
    { icon: Clock, label: "Wait Times", action: "What are the current wait times?" },
    { icon: Star, label: "Dining Magic", action: "Find me some magical dining experiences" },
    { icon: Gift, label: "Souvenir Hunt", action: "Where can I find the best Disney treasures?" },
    { icon: Camera, label: "Photo Magic", action: "Show me the most magical photo spots" },
    { icon: Heart, label: "Character Magic", action: "When can I meet my favorite Disney friends?" },
    { icon: Compass, label: "Navigation", action: "Help me navigate the parks like a pro" }
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

    // Simulate AI response
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
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('plan') || input.includes('day') || input.includes('itinerary')) {
      return "Oh, I love planning magical days! 🧭 Let me create the perfect adventure for you! I'd suggest starting with Space Mountain (only 15 minutes wait - perfect timing!), then we'll head to Pirates of the Caribbean (just 5 minutes!). Would you like me to craft a full personalized itinerary?";
    } else if (input.includes('dining') || input.includes('restaurant') || input.includes('food') || input.includes('magical dining')) {
      return "Oh my, you're in for a treat! 🍽️✨ Be Our Guest Restaurant in Fantasyland has a table available at 7:30 PM - it's like dining in the Beast's castle! Or if you're feeling adventurous, the Dole Whip at Aloha Isle is absolutely magical! 🍍";
    } else if (input.includes('wait time') || input.includes('line')) {
      return "Great timing to ask! 🕐 Here's the current magic: Space Mountain (15 min - perfect!), Big Thunder Mountain (25 min), Haunted Mansion (10 min - spooky fun!), and It's a Small World (5 min - a classic!). Pro tip: the parade is the perfect time to hit those popular attractions!";
    } else if (input.includes('photo') || input.includes('picture') || input.includes('magical photo')) {
      return "Oh, you're going to love these spots! 📸✨ Cinderella Castle has that perfect golden hour lighting right now, Main Street USA has that vintage charm, and Tomorrowland gives you that futuristic backdrop! I can also help you find the best character meet-and-greets for those magical memories!";
    } else if (input.includes('souvenir') || input.includes('gift') || input.includes('shop') || input.includes('buy')) {
      return "🛍️ Best souvenir spots: World of Disney (largest selection), Emporium on Main Street, and don't miss the new shops in Galaxy's Edge! Pro tip: Ask about exclusive park merchandise and check for limited edition items!";
    } else if (input.includes('character') || input.includes('disney friends')) {
      return "Your Disney friends are ready to meet you! 🎭 Mickey Mouse is at Town Square (10 AM - 6 PM), Elsa & Anna are at Princess Fairytale Hall (9 AM - 8 PM), and Buzz Lightyear is in Tomorrowland (11 AM - 7 PM). Don't forget to bring your autograph book!";
    } else if (input.includes('navigate') || input.includes('navigation')) {
      return "I'm your navigation wizard! 🧭✨ I can guide you through the parks with AR magic, show you the shortest routes, and even help you avoid the crowds. Just tell me where you want to go, and I'll make sure you get there with time to spare for all the magic!";
    } else {
      return "What a wonderful question! 🌟 I'm Mickey's Compass, and I'm here to make your Disney experience absolutely magical! I can help with planning your perfect day, finding the best dining spots, checking wait times, discovering photo opportunities, meeting characters, and so much more. What magical adventure shall we embark on first? ✨";
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
                  <div className={`max-w-xs lg:max-w-lg px-5 py-4 rounded-2xl ${
                    message.isUser 
                      ? 'bg-gradient-compass text-white shadow-lg' 
                      : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'
                  }`}>
                    <p className="text-base leading-relaxed font-medium">{message.text}</p>
                    <p className={`text-xs mt-3 ${
                      message.isUser ? 'text-white/70' : 'text-slate-light'
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

          {/* Input Area */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Ask me anything about your magical Disney adventure..."
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-light focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300 text-base"
                />
              </div>
              
              <motion.button
                onClick={toggleListening}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400' 
                    : 'bg-white/5 border border-white/10 text-slate-light hover:text-white hover:border-disney-gold/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>

              <motion.button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="p-4 bg-gradient-compass text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIConcierge;
