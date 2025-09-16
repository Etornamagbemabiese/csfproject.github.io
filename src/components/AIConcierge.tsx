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
  Sparkles,
  Crown,
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
      text: "Welcome to your Disney AI Concierge! ✨ I'm here to make your magical journey unforgettable. How can I help you today?",
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
    { icon: MapPin, label: "Find Attractions", action: "Show me the best attractions to visit today" },
    { icon: Clock, label: "Check Wait Times", action: "What are the current wait times?" },
    { icon: Star, label: "Dining Options", action: "Recommend restaurants for dinner" },
    { icon: Gift, label: "Shopping", action: "Where can I find the best souvenirs?" },
    { icon: Camera, label: "Photo Spots", action: "Show me the best photo opportunities" },
    { icon: Heart, label: "Character Meets", action: "When can I meet my favorite characters?" },
    { icon: Crown, label: "Luxury Hubs", action: "Find the nearest luxury dining and relaxation spots" }
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
    
    if (input.includes('attraction') || input.includes('ride')) {
      return "Based on your preferences, I recommend starting with Space Mountain (15 min wait) and then heading to Pirates of the Caribbean (5 min wait). Would you like me to create a personalized itinerary for your day?";
    } else if (input.includes('dining') || input.includes('restaurant') || input.includes('food')) {
      return "For a magical dining experience, I suggest Be Our Guest Restaurant in Fantasyland - they have availability at 7:30 PM. Or for something quicker, try Dole Whip at Aloha Isle! 🍍";
    } else if (input.includes('wait time') || input.includes('line')) {
      return "Here are the current wait times: Space Mountain (15 min), Big Thunder Mountain (25 min), Haunted Mansion (10 min), and It's a Small World (5 min). The best time to visit popular attractions is during the parade!";
    } else if (input.includes('photo') || input.includes('picture')) {
      return "Perfect photo spots right now: Cinderella Castle (golden hour lighting), Main Street USA (vintage charm), and Tomorrowland (futuristic backdrop). I can also help you find character meet-and-greets!";
    } else if (input.includes('character')) {
      return "Character meet-and-greets today: Mickey Mouse at Town Square (10 AM - 6 PM), Elsa & Anna at Princess Fairytale Hall (9 AM - 8 PM), and Buzz Lightyear at Tomorrowland (11 AM - 7 PM).";
    } else {
      return "That's a great question! I'm here to help make your Disney experience magical. I can assist with attractions, dining, wait times, photo spots, character meets, and so much more. What would you like to explore first? ✨";
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
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-luxury-gold mr-3" />
            <h1 className="luxury-text text-3xl font-bold bg-gradient-disney bg-clip-text text-transparent">AI Concierge</h1>
            <Sparkles className="w-8 h-8 text-disney-pink ml-3 animate-sparkle" />
          </div>
          <p className="text-gray-400">Your magical guide to Disney parks</p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-effect rounded-2xl border border-white/10 overflow-hidden"
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
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isUser 
                      ? 'bg-gradient-luxury-blue text-white' 
                      : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.isUser ? 'text-white/70' : 'text-gray-400'
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
                <div className="bg-white/10 text-white border border-white/20 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Wand2 className="w-4 h-4 text-luxury-gold animate-spin" />
                    <span className="text-sm">Concierge is typing</span>
                    <div className="loading-dots"></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t border-white/10 p-4">
            <p className="text-sm text-gray-400 mb-3">Quick Actions:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-luxury-gold/30 rounded-lg transition-all duration-300 text-white text-sm"
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
                  placeholder="Ask me anything about your Disney experience..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold/50 focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
                />
              </div>
              
              <motion.button
                onClick={toggleListening}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400' 
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-luxury-gold/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>

              <motion.button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="p-3 bg-gradient-luxury-blue text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
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
