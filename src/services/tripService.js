import initApperClient, { TABLES, getTableFields } from './apperClient';

// Fetch trips for a user
export const fetchUserTrips = async (userId) => {
  try {
    const apperClient = initApperClient();
    const params = {
      fields: getTableFields(TABLES.TRIP),
      filter: {
        userId: userId
      },
      orderBy: [
        { field: "startDate", direction: "asc" }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLES.TRIP, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trips for user ${userId}:`, error);
    throw error;
  }
};

// Fetch a single trip by ID
export const fetchTripById = async (tripId) => {
  try {
    const apperClient = initApperClient();
    const params = {
      fields: getTableFields(TABLES.TRIP),
      filter: {
        Id: tripId
      }
    };
    
    const response = await apperClient.fetchRecords(TABLES.TRIP, params);
    return response.data && response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(`Error fetching trip with ID ${tripId}:`, error);
    throw error;
  }
};

// Create a new trip
export const createTrip = async (tripData) => {
  try {
    const apperClient = initApperClient();
    const params = {
      record: tripData
    };
    
    const response = await apperClient.createRecord(TABLES.TRIP, params);
    return response.data;
  } catch (error) {
    console.error("Error creating trip:", error);
    throw error;
  }
};

// Update an existing trip
export const updateTrip = async (tripId, tripData) => {
  try {
    const apperClient = initApperClient();
    const params = {
      record: tripData
    };
    
    const response = await apperClient.updateRecord(TABLES.TRIP, tripId, params);
    return response.data;
  } catch (error) {
    console.error(`Error updating trip with ID ${tripId}:`, error);
    throw error;
  }
};

// Delete a trip
export const deleteTrip = async (tripId) => {
  try {
    const apperClient = initApperClient();
    const response = await apperClient.deleteRecord(TABLES.TRIP, tripId);
    return response.data;
  } catch (error) {
    console.error(`Error deleting trip with ID ${tripId}:`, error);
    throw error;
  }
};

export default {
  fetchUserTrips,
  fetchTripById,
  createTrip,
  updateTrip,
  deleteTrip
};