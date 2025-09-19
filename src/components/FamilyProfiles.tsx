import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Edit3, 
  Trash2, 
  Save,
  Heart,
  Star,
  AlertTriangle,
  Compass,
  Wand2,
  Calendar,
  Utensils,
  MapPin
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  height: number; // in inches
  avatar: string;
  preferences: {
    favoriteRides: string[];
    favoriteFood: string[];
    dietaryRestrictions: string[];
    accessibilityNeeds: string[];
    interests: string[];
  };
  restrictions: {
    heightRestrictions: string[];
    healthRestrictions: string[];
    mobilityRestrictions: string[];
  };
  notes: string;
}

const FamilyProfiles: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 35,
      height: 65,
      avatar: '👩',
      preferences: {
        favoriteRides: ['Space Mountain', 'Big Thunder Mountain', 'Splash Mountain'],
        favoriteFood: ['Pizza', 'Ice Cream', 'Mickey Waffles'],
        dietaryRestrictions: ['Vegetarian'],
        accessibilityNeeds: [],
        interests: ['Thrill Rides', 'Character Meet & Greets', 'Shopping']
      },
      restrictions: {
        heightRestrictions: [],
        healthRestrictions: [],
        mobilityRestrictions: []
      },
      notes: 'Loves roller coasters and character interactions'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      age: 38,
      height: 72,
      avatar: '👨',
      preferences: {
        favoriteRides: ['Pirates of the Caribbean', 'Haunted Mansion', 'Jungle Cruise'],
        favoriteFood: ['Steak', 'Burgers', 'Beer'],
        dietaryRestrictions: [],
        accessibilityNeeds: [],
        interests: ['Dark Rides', 'Fine Dining', 'Photography']
      },
      restrictions: {
        heightRestrictions: [],
        healthRestrictions: [],
        mobilityRestrictions: []
      },
      notes: 'Prefers slower, story-based attractions'
    },
    {
      id: '3',
      name: 'Emma Johnson',
      age: 8,
      height: 48,
      avatar: '👧',
      preferences: {
        favoriteRides: ['Peter Pan\'s Flight', 'It\'s a Small World', 'Dumbo'],
        favoriteFood: ['Chicken Nuggets', 'Mac & Cheese', 'Cotton Candy'],
        dietaryRestrictions: [],
        accessibilityNeeds: [],
        interests: ['Princesses', 'Fairy Tales', 'Parades']
      },
      restrictions: {
        heightRestrictions: ['Some thrill rides require 48" height'],
        healthRestrictions: [],
        mobilityRestrictions: []
      },
      notes: 'Loves princesses and gentle rides'
    }
  ]);

  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    age: 0,
    height: 0,
    avatar: '👤',
    preferences: {
      favoriteRides: [] as string[],
      favoriteFood: [] as string[],
      dietaryRestrictions: [] as string[],
      accessibilityNeeds: [] as string[],
      interests: [] as string[]
    },
    restrictions: {
      heightRestrictions: [] as string[],
      healthRestrictions: [] as string[],
      mobilityRestrictions: [] as string[]
    },
    notes: ''
  });

  const availableAvatars = ['👤', '👨', '👩', '👦', '👧', '👶', '🧑', '👴', '👵'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut Allergy', 'Dairy-Free', 'Kosher', 'Halal'];
  const accessibilityOptions = ['Wheelchair Access', 'ECV Access', 'Hearing Impaired', 'Visual Impaired', 'Service Animal'];
  const interestOptions = ['Thrill Rides', 'Dark Rides', 'Character Meet & Greets', 'Parades', 'Fireworks', 'Shopping', 'Fine Dining', 'Photography', 'Princesses', 'Superheroes'];

  const addFamilyMember = () => {
    if (!newMember.name) return;

    const member: FamilyMember = {
      id: Date.now().toString(),
      ...newMember
    };

    setFamilyMembers([...familyMembers, member]);
    setNewMember({
      name: '',
      age: 0,
      height: 0,
      avatar: '👤',
      preferences: {
        favoriteRides: [],
        favoriteFood: [],
        dietaryRestrictions: [],
        accessibilityNeeds: [],
        interests: []
      },
      restrictions: {
        heightRestrictions: [],
        healthRestrictions: [],
        mobilityRestrictions: []
      },
      notes: ''
    });
    setShowAddMember(false);
  };

  const updateFamilyMember = () => {
    if (!editingMember) return;

    setFamilyMembers(familyMembers.map(member => 
      member.id === editingMember.id ? editingMember : member
    ));
    setEditingMember(null);
  };

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const getHeightRestrictions = (height: number) => {
    const restrictions = [];
    if (height < 32) restrictions.push('Most rides require 32" minimum');
    if (height < 40) restrictions.push('Some moderate rides require 40" minimum');
    if (height < 44) restrictions.push('Some thrill rides require 44" minimum');
    if (height < 48) restrictions.push('High thrill rides require 48" minimum');
    return restrictions;
  };

  const getAgeRecommendations = (age: number) => {
    if (age < 3) return 'Toddler - Focus on gentle rides and character interactions';
    if (age < 8) return 'Child - Mix of gentle and moderate attractions';
    if (age < 13) return 'Tween - Can enjoy most attractions with supervision';
    if (age < 18) return 'Teen - Can enjoy all attractions';
    return 'Adult - Full access to all experiences';
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Compass className="w-12 h-12 text-disney-gold animate-compass-spin mr-4" />
            <h1 className="font-disney text-4xl md:text-6xl magical-text">
              Family Profiles
            </h1>
            <Wand2 className="w-12 h-12 text-magic-pink animate-wand-sparkle ml-4" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Create personalized profiles for each family member to optimize your Disney experience
          </p>
        </motion.div>

        {/* Add Member Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.button
            onClick={() => setShowAddMember(true)}
            className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-3">
              <UserPlus size={24} />
              <span>Add Family Member</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Family Members Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {familyMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{member.avatar}</div>
                  <div>
                    <h3 className="luxury-text text-xl font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <div className="text-sm text-gray-600">
                      Age {member.age} • {member.height}" tall
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => setEditingMember(member)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit3 size={16} />
                  </motion.button>
                  <motion.button
                    onClick={() => deleteFamilyMember(member.id)}
                    className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Age Recommendations */}
              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Age Recommendations</span>
                </div>
                <p className="text-sm text-blue-300">{getAgeRecommendations(member.age)}</p>
              </div>

              {/* Height Restrictions */}
              {getHeightRestrictions(member.height).length > 0 && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Height Restrictions</span>
                  </div>
                  <ul className="text-sm text-yellow-300 space-y-1">
                    {getHeightRestrictions(member.height).map((restriction, idx) => (
                      <li key={idx}>• {restriction}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preferences */}
              <div className="space-y-3">
                {member.preferences.favoriteRides.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-disney-gold" />
                      <span className="text-sm font-medium text-white">Favorite Rides</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.preferences.favoriteRides.map((ride, idx) => (
                        <span key={idx} className="px-2 py-1 bg-disney-gold/20 text-disney-gold rounded-full text-xs">
                          {ride}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.preferences.dietaryRestrictions.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Utensils className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-medium text-white">Dietary Restrictions</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.preferences.dietaryRestrictions.map((restriction, idx) => (
                        <span key={idx} className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs">
                          {restriction}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.preferences.accessibilityNeeds.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-white">Accessibility Needs</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.preferences.accessibilityNeeds.map((need, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              {member.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Notes</span>
                  </div>
                  <p className="text-sm text-gray-700">{member.notes}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Add Member Modal */}
        <AnimatePresence>
          {showAddMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddMember(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="luxury-text text-2xl font-semibold text-white mb-6">
                  Add Family Member
                </h2>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Name</label>
                      <input
                        type="text"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Age</label>
                      <input
                        type="number"
                        value={newMember.age}
                        onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                        placeholder="Enter age"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Height (inches)</label>
                      <input
                        type="number"
                        value={newMember.height}
                        onChange={(e) => setNewMember({ ...newMember, height: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                        placeholder="Enter height"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Avatar</label>
                      <div className="flex space-x-2">
                        {availableAvatars.map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => setNewMember({ ...newMember, avatar })}
                            className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 ${
                              newMember.avatar === avatar
                                ? 'border-disney-gold bg-disney-gold/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-2xl">{avatar}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Dietary Restrictions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            const restrictions = newMember.preferences.dietaryRestrictions.includes(option)
                              ? newMember.preferences.dietaryRestrictions.filter(r => r !== option)
                              : [...newMember.preferences.dietaryRestrictions, option];
                            setNewMember({
                              ...newMember,
                              preferences: { ...newMember.preferences, dietaryRestrictions: restrictions }
                            });
                          }}
                          className={`p-2 rounded-xl border transition-all duration-300 ${
                            newMember.preferences.dietaryRestrictions.includes(option)
                              ? 'border-disney-gold bg-disney-gold/20 text-disney-gold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900'
                          }`}
                        >
                          <span className="text-sm">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accessibility Needs */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Accessibility Needs</label>
                    <div className="grid grid-cols-2 gap-2">
                      {accessibilityOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            const needs = newMember.preferences.accessibilityNeeds.includes(option)
                              ? newMember.preferences.accessibilityNeeds.filter(n => n !== option)
                              : [...newMember.preferences.accessibilityNeeds, option];
                            setNewMember({
                              ...newMember,
                              preferences: { ...newMember.preferences, accessibilityNeeds: needs }
                            });
                          }}
                          className={`p-2 rounded-xl border transition-all duration-300 ${
                            newMember.preferences.accessibilityNeeds.includes(option)
                              ? 'border-disney-gold bg-disney-gold/20 text-disney-gold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900'
                          }`}
                        >
                          <span className="text-sm">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Interests</label>
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            const interests = newMember.preferences.interests.includes(option)
                              ? newMember.preferences.interests.filter(i => i !== option)
                              : [...newMember.preferences.interests, option];
                            setNewMember({
                              ...newMember,
                              preferences: { ...newMember.preferences, interests }
                            });
                          }}
                          className={`p-2 rounded-xl border transition-all duration-300 ${
                            newMember.preferences.interests.includes(option)
                              ? 'border-disney-gold bg-disney-gold/20 text-disney-gold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:text-gray-900'
                          }`}
                        >
                          <span className="text-sm">{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Notes</label>
                    <textarea
                      value={newMember.notes}
                      onChange={(e) => setNewMember({ ...newMember, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20 h-20 resize-none"
                      placeholder="Any additional notes or preferences..."
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setShowAddMember(false)}
                    className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addFamilyMember}
                    className="flex-1 btn-primary py-3 px-6 rounded-xl"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <UserPlus size={18} />
                      <span>Add Member</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Member Modal */}
        <AnimatePresence>
          {editingMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setEditingMember(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-neutral-black via-disney-blue-dark to-slate-dark rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="luxury-text text-2xl font-semibold text-white mb-6">
                  Edit Family Member
                </h2>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Name</label>
                      <input
                        type="text"
                        value={editingMember.name}
                        onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Age</label>
                      <input
                        type="number"
                        value={editingMember.age}
                        onChange={(e) => setEditingMember({ ...editingMember, age: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Height (inches)</label>
                      <input
                        type="number"
                        value={editingMember.height}
                        onChange={(e) => setEditingMember({ ...editingMember, height: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Avatar</label>
                      <div className="flex space-x-2">
                        {availableAvatars.map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => setEditingMember({ ...editingMember, avatar })}
                            className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 ${
                              editingMember.avatar === avatar
                                ? 'border-disney-gold bg-disney-gold/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-2xl">{avatar}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Notes</label>
                    <textarea
                      value={editingMember.notes}
                      onChange={(e) => setEditingMember({ ...editingMember, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-disney-gold focus:outline-none focus:ring-2 focus:ring-disney-gold/20 h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setEditingMember(null)}
                    className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateFamilyMember}
                    className="flex-1 btn-primary py-3 px-6 rounded-xl"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Save size={18} />
                      <span>Save Changes</span>
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

export default FamilyProfiles;
