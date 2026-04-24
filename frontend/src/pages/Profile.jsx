import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    interests: []
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        interests: user.interests || []
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      // TODO: Connect to API to update profile
      console.log('Updating profile:', formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    try {
      // TODO: Connect to API to change password
      console.log('Changing password');
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password' });
    }
  };

  const userStats = {
    eventsAttended: 12,
    upcomingRSVPs: 3,
    eventsCreated: 2,
    followers: 45
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-12 py-24">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="text-[#f59e0b] text-sm hover:text-[#d97706] transition flex items-center gap-2 mb-4"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-[#888] text-sm">Manage your account settings and preferences</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/50 text-green-500' 
              : 'bg-red-500/10 border border-red-500/50 text-red-500'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-6 sticky top-24">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=f59e0b&color=000&size=120`}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-[#f59e0b] hover:bg-[#d97706] text-black w-8 h-8 rounded-full flex items-center justify-center transition">
                    📷
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{user?.name}</h2>
                <p className="text-[#888] text-sm">{user?.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userStats.eventsAttended}</div>
                  <div className="text-[#888] text-xs">Events Attended</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userStats.upcomingRSVPs}</div>
                  <div className="text-[#888] text-xs">Upcoming RSVPs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userStats.eventsCreated}</div>
                  <div className="text-[#888] text-xs">Events Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{userStats.followers}</div>
                  <div className="text-[#888] text-xs">Followers</div>
                </div>
              </div>

              {/* Member Since */}
              <div className="border-t border-[#2a2a2a] pt-4">
                <p className="text-[#888] text-xs">Member since</p>
                <p className="text-white text-sm font-medium">April 2026</p>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] px-4 py-2 rounded-lg transition text-sm"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="4"
                    placeholder="Tell us about yourself..."
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] transition disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="City, Country"
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-3 rounded-lg transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          bio: user?.bio || '',
                          location: user?.location || '',
                          interests: user?.interests || []
                        });
                      }}
                      className="flex-1 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] py-3 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Password Change */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Password & Security</h3>
                  <p className="text-[#888] text-sm">Manage your password and security settings</p>
                </div>
                {!showPasswordForm && (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] px-4 py-2 rounded-lg transition text-sm"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {showPasswordForm && (
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] transition"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-3 rounded-lg transition"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      className="flex-1 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] py-3 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Danger Zone */}
            <div className="bg-[#0f0f0f] rounded-xl border border-red-500/20 p-8">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Danger Zone</h3>
              <p className="text-[#888] text-sm mb-6">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-6 py-3 rounded-lg transition font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
