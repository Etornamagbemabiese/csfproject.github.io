import React from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Our Story', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' }
    ],
    services: [
      { label: 'Enchanted Guide', href: '#' },
      { label: 'Quest Planning', href: '#' },
      { label: 'Royal Experiences', href: '#' },
      { label: 'Group Adventures', href: '#' }
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' }
    ],
    destinations: [
      { label: 'Enchanted Forest', href: '#' },
      { label: 'Mystical Mountains', href: '#' },
      { label: 'Royal Palace', href: '#' },
      { label: 'Fairy Tale Village', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="relative mt-20">
      {/* Magical background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-900/50 to-transparent"></div>
      
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Crown className="w-8 h-8 text-luxury-gold" />
                  <h3 className="luxury-text text-2xl font-bold text-white">
                    Enchanted Guide
                  </h3>
                  <Sparkles className="w-6 h-6 text-disney-pink animate-sparkle" />
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Your mystical companion for creating extraordinary memories. 
                  Experience magical destinations like never before with our enchanted AI guide.
                </p>
                
                {/* Contact info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Mail size={16} />
                    <span>guide@enchanted.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Phone size={16} />
                    <span>1-800-ENCHANTED</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <MapPin size={16} />
                    <span>Available at magical destinations worldwide</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="luxury-text text-lg font-semibold text-white mb-4 capitalize">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href={link.href}
                        className="text-gray-400 hover:text-enchanted-gold transition-colors duration-300 text-sm"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Social media and newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Social media */}
              <div className="flex items-center space-x-4 mb-6 md:mb-0">
                <span className="text-gray-400 text-sm">Follow the magic:</span>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="p-2 bg-white/5 hover:bg-enchanted-gold/20 border border-white/10 hover:border-enchanted-gold/50 rounded-lg transition-all duration-300 text-gray-400 hover:text-enchanted-gold"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>

              {/* Newsletter signup */}
              <div className="flex items-center space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email for magical updates"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-enchanted-gold/50 focus:ring-2 focus:ring-enchanted-gold/20 transition-all duration-300 text-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-6"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Enchanted Guide. Made with{' '}
                <Heart className="inline w-4 h-4 text-red-500" /> for adventurers worldwide.
              </p>
              <p className="text-gray-500 text-xs">
                A magical companion for extraordinary journeys.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
