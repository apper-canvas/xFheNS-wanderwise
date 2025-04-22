import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserTrips, deleteTrip } from "../services/tripService";
import { fetchDestinationById } from "../services/destinationService";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Calendar, MapPin, Filter, AlertCircle, 
  Trash2, Edit, Eye, ChevronDown, ChevronUp 
} from "lucide-react";

const Trips = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadTrips = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch user trips
        const userTrips = await fetchUserTrips(user.Id || user.id);
        setTrips(userTrips);
        setFilteredTrips(userTrips);
        
        // Fetch destination details for each trip
        const destinationDetails = {};
        
        for (const trip of userTrips) {
          if (trip.destinationId && !destinationDetails[trip.destinationId]) {
            try {
              const destination = await fetchDestinationById(trip.destinationId);
              if (destination) {
                destinationDetails[trip.destinationId] = destination;
              }
            } catch (error) {
              console.error(`Error fetching destination ${trip.destinationId}:`, error);
            }
          }
        }
        
        setDestinations(destinationDetails);
      } catch (err) {
        setError("Failed to load your trips. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTrips();
  }, [user, isLoggedIn, navigate]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setFilteredTrips(trips);
    } else {
      setFilteredTrips(trips.filter(trip => trip.status === filter));
    }
  };

  const handleSort = (sortType) => {
    if (sortBy === sortType) {
      // Toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortType);
      setSortDirection("asc");
    }
    
    const sortedTrips = [...filteredTrips].sort((a, b) => {
      let comparison = 0;
      
      if (sortType === "date") {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        comparison = dateA - dateB;
      } else if (sortType === "name") {
        comparison = a.Name.localeCompare(b.Name);
      } else if (sortType === "destination") {
        const destA = destinations[a.destinationId]?.Name || "";
        const destB = destinations[b.destinationId]?.Name || "";
        comparison = destA.localeCompare(destB);
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setFilteredTrips(sortedTrips);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTrip(tripId);
      setTrips(trips.filter(trip => trip.Id !== tripId));
      setFilteredTrips(filteredTrips.filter(trip => trip.Id !== tripId));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting trip:", error);
      setError("Failed to delete trip. Please try again.");
    }
  };

  const getSortIcon = (sortField) => {
    if (sortBy !== sortField) return null;
    
    return sortDirection === "asc" ? (
      <ChevronUp size={16} className="ml-1" />
    ) : (
      <ChevronDown size={16} className="ml-1" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Trips</h1>
          <p className="text-gray-600">Manage your travel plans and itineraries</p>
        </div>
        
        <Link 
          to="/trips/create" 
          className="mt-4 md:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Create New Trip
        </Link>
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeFilter === "all" 
                ? "bg-blue-100 text-blue-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Trips
          </button>
          <button
            onClick={() => handleFilterChange("planned")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeFilter === "planned" 
                ? "bg-blue-100 text-blue-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Planned
          </button>
          <button
            onClick={() => handleFilterChange("booked")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeFilter === "booked" 
                ? "bg-green-100 text-green-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Booked
          </button>
          <button
            onClick={() => handleFilterChange("completed")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeFilter === "completed" 
                ? "bg-gray-100 text-gray-700 font-medium" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => handleFilterChange("cancelled")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              activeFilter === "cancelled" 
                ? "bg-red-100 text-red-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {/* Error State */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center mb-6">
          <AlertCircle size={20} className="mr-2" />
          {error}
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {/* Trips Table */}
      {!isLoading && !error && (
        <>
          {filteredTrips.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No trips found</h3>
              <p className="text-gray-600 mb-6">
                {activeFilter === "all" 
                  ? "You haven't created any trips yet. Start planning your next adventure!"
                  : `You don't have any ${activeFilter} trips.`}
              </p>
              <Link 
                to="/trips/create" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Create New Trip
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Sort Options */}
              <div className="border-b border-gray-200 p-4 flex justify-end">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">Sort by:</span>
                  <button 
                    onClick={() => handleSort("date")} 
                    className={`flex items-center px-2 py-1 rounded ${
                      sortBy === "date" ? "bg-gray-100 text-gray-800" : ""
                    }`}
                  >
                    Date {getSortIcon("date")}
                  </button>
                  <button 
                    onClick={() => handleSort("name")} 
                    className={`flex items-center px-2 py-1 rounded ml-2 ${
                      sortBy === "name" ? "bg-gray-100 text-gray-800" : ""
                    }`}
                  >
                    Name {getSortIcon("name")}
                  </button>
                  <button 
                    onClick={() => handleSort("destination")} 
                    className={`flex items-center px-2 py-1 rounded ml-2 ${
                      sortBy === "destination" ? "bg-gray-100 text-gray-800" : ""
                    }`}
                  >
                    Destination {getSortIcon("destination")}
                  </button>
                </div>
              </div>
              
              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trip Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTrips.map((trip) => (
                    <tr key={trip.Id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{trip.Name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin size={16} className="text-gray-400 mr-1" />
                          <span>{destinations[trip.destinationId]?.Name || trip.destinationId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize
                          ${trip.status === 'booked' ? 'bg-green-100 text-green-800' :
                            trip.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                            trip.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/trips/${trip.Id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            aria-label="View trip details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/trips/edit/${trip.Id}`)}
                            className="text-gray-600 hover:text-gray-900"
                            aria-label="Edit trip"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(trip.Id)}
                            className="text-red-600 hover:text-red-900"
                            aria-label="Delete trip"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        {/* Delete Confirmation */}
                        {showDeleteConfirm === trip.Id && (
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-3 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Are you sure you want to delete this trip?</p>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-3 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-gray-800"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeleteTrip(trip.Id)}
                                className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Trips;