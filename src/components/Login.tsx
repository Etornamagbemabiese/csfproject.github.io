import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass,
  Wand2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    favoritePark: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    console.log(isLogin ? 'Login' : 'Signup', formData);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const disneyParks = [
    'Magic Kingdom',
    'EPCOT',
    'Hollywood Studios',
    'Animal Kingdom',
    'Disneyland',
    'Disney California Adventure',
    'Disneyland Paris',
    'Tokyo Disneyland',
    'Hong Kong Disneyland'
  ];

  return (
    <div className="pt-16 sm:pt-20 md:pt-32 pb-12 sm:pb-16 md:pb-24 px-3 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-2 sm:gap-4">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-disney-gold order-1 sm:order-1" />
            <h1 className="font-disney text-3xl sm:text-4xl text-white order-2 sm:order-2">My Journey</h1>
            <Wand2 className="w-10 h-10 sm:w-12 sm:h-12 text-disney-gold order-3 sm:order-3" />
          </div>
          <p className="text-base sm:text-lg text-gray-400 font-quicksand px-2">
            Connect with your Disney account to unlock personalized magic
          </p>
        </motion.div>

        {/* Login/Signup Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex bg-white/5 rounded-xl p-1 mb-6 sm:mb-8 border border-white/10"
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base touch-manipulation min-h-[48px] ${
              isLogin 
                ? 'bg-white text-black' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base touch-manipulation min-h-[48px] ${
              !isLogin 
                ? 'bg-white text-black' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            Create Account
          </button>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-effect p-6 sm:p-8 rounded-2xl border border-white/10"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Disney Account Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@disney.com"
                  className="w-full pl-10 pr-4 py-3 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300 text-base touch-manipulation min-h-[48px]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Signup Additional Fields */}
            {!isLogin && (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Mickey"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Mouse"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Birth Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                </div>

                {/* Favorite Park */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Favorite Disney Park
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      name="favoritePark"
                      value={formData.favoritePark}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300 appearance-none"
                      required={!isLogin}
                    >
                      <option value="">Select your favorite park</option>
                      {disneyParks.map((park) => (
                        <option key={park} value={park} className="bg-gray-800">
                          {park}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-disney-gold/50 focus:ring-2 focus:ring-disney-gold/20 transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-sky-300 to-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Star size={20} />
              <span>{isLogin ? 'Sign In to My Journey' : 'Create My Disney Account'}</span>
            </motion.button>
          </form>

          {/* Additional Options */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-4">
              {isLogin ? "Don't have a Disney account?" : "Already have a Disney account?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-disney-gold hover:text-disney-gold-light transition-colors font-medium"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </div>

          {/* Disney Account Benefits */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Disney Account Benefits
            </h3>
            <div className="space-y-3">
              {[
                "Personalized park recommendations",
                "Save your favorite attractions",
                "Track your magical memories",
                "Exclusive Disney content",
                "Special offers and discounts"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Star className="w-4 h-4 text-disney-gold" />
                  <span className="text-sm text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
