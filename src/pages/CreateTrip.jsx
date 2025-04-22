import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createTrip } from "../services/tripService";
import { fetchDestinations } from "../services/destinationService";
import { Calendar, MapPin, AlertCircle, ChevronDown } from "lucide-react";

const CreateTrip = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    Name: "",
    startDate: "",
    endDate: "",
    destinationId: "",
    status: "planned",
    notes: ""
  });
  
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadDestinations = async () => {
      try {
        setLoading(true);
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (err) {
        setError("Failed to load destinations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectDestination = (destination) => {
    setFormData(prev => ({ ...prev, destinationId: destination.Id }));
    setShowDestinationDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Validate form data
      if (!formData.Name.trim()) {
        setError("Please enter a trip name");
        setSubmitting(false);
        return;
      }
      
      if (!formData.startDate) {
        setError("Please select a start date");
        setSubmitting(false);
        return;
      }
      
      if (!formData.endDate) {
        setError("Please select an end date");
        setSubmitting(false);
        return;
      }
      
      if (!formData.destinationId) {
        setError("Please select a destination");
        setSubmitting(false);
        return;
      }
      
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        setError("Start date cannot be after end date");
        setSubmitting(false);
        return;
      }
      
      // Add user ID to form data
      const tripData = {
        ...formData,
        userId: user.Id || user.id
      };
      
      // Submit the form
      const newTrip = await createTrip(tripData);
      
      // Navigate to trips page
      navigate("/trips");
    } catch (err) {
      setError("Failed to create trip. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getSelectedDestinationName = () => {
    const destination = destinations.find(d => d.Id === formData.destinationId);
    return destination ? destination.Name : "Select a destination";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a New Trip</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center mb-6">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-6">
              {/* Trip Name */}
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Name
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="e.g., Summer Vacation 2023"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Destination Selector */}
              <div className="relative">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <div
                  onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer"
                >
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    <span>{getSelectedDestinationName()}</span>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
                
                {showDestinationDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {destinations.map(destination => (
                      <div
                        key={destination.Id}
                        onClick={() => selectDestination(destination)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      >
                        <MapPin size={16} className="text-gray-400 mr-2" />
                        <span>{destination.Name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Trip Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="planned">Planned</option>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add any details or notes about your trip..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/trips")}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                    submitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? "Creating..." : "Create Trip"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateTrip;