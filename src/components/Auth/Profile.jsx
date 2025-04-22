import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../services/authService';
import { fetchUserTrips } from '../../services/tripService';
import { Link } from 'react-router-dom';
import { User, MapPin, Calendar, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch profile data
        const profileData = await getUserProfile(user.Id || user.id);
        setProfile(profileData);
        
        // Fetch user trips
        const userTrips = await fetchUserTrips(user.Id || user.id);
        setTrips(userTrips);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 px-6 py-8 text-white">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-3 text-blue-600 mr-4">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile?.Name || user?.Name || 'User'}</h2>
            <p className="text-blue-100">{profile?.email || user?.email || ''}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar size={20} className="mr-2" />
            Your Upcoming Trips
          </h3>
          
          {trips.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600 mb-4">You don't have any upcoming trips yet.</p>
              <Link to="/trips/create" className="text-blue-600 hover:text-blue-800 font-medium">
                Plan your first trip
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {trips.slice(0, 3).map(trip => (
                <div key={trip.Id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{trip.Name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                      trip.status === 'booked' ? 'bg-green-100 text-green-800' :
                      trip.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      trip.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {trip.destinationId}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
              
              {trips.length > 3 && (
                <div className="text-center mt-2">
                  <Link to="/trips" className="text-blue-600 hover:text-blue-800 text-sm">
                    View all trips ({trips.length})
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="border-t pt-6">
          <button
            onClick={logout}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut size={16} className="mr-1" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;