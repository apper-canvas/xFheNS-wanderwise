import initApperClient, { TABLES, getTableFields } from './apperClient';

// Fetch all destinations with optional filtering
export const fetchDestinations = async (filters = {}) => {
  try {
    const apperClient = initApperClient();
    
    let filterObj = {};
    
    // Apply search query filter
    if (filters.searchQuery) {
      filterObj.or = [
        { Name: { contains: filters.searchQuery } },
        { location: { contains: filters.searchQuery } },
        { country: { contains: filters.searchQuery } },
        { description: { contains: filters.searchQuery } }
      ];
    }
    
    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filterObj.category = filters.category;
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      filterObj.and = [
        { price: { gte: filters.priceRange[0] } },
        { price: { lte: filters.priceRange[1] } }
      ];
    }
    
    // Apply rating filter
    if (filters.rating > 0) {
      filterObj.rating = { gte: filters.rating };
    }
    
    // Apply region filter
    if (filters.regions && filters.regions.length > 0) {
      filterObj.region = { in: filters.regions };
    }
    
    const params = {
      fields: getTableFields(TABLES.DESTINATION),
      filter: Object.keys(filterObj).length > 0 ? filterObj : undefined,
      pagingInfo: {
        limit: filters.limit || 20,
        offset: filters.offset || 0
      },
      orderBy: [
        { field: filters.sortField || "CreatedOn", direction: filters.sortDirection || "desc" }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLES.DESTINATION, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};

// Fetch a single destination by ID
export const fetchDestinationById = async (destinationId) => {
  try {
    const apperClient = initApperClient();
    const params = {
      fields: getTableFields(TABLES.DESTINATION),
      filter: {
        Id: destinationId
      }
    };
    
    const response = await apperClient.fetchRecords(TABLES.DESTINATION, params);
    return response.data && response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(`Error fetching destination with ID ${destinationId}:`, error);
    throw error;
  }
};

// Fetch activities for a destination
export const fetchActivitiesForDestination = async (destinationId) => {
  try {
    const apperClient = initApperClient();
    const params = {
      fields: getTableFields(TABLES.ACTIVITY),
      filter: {
        destinationId: destinationId
      }
    };
    
    const response = await apperClient.fetchRecords(TABLES.ACTIVITY, params);
    return response.data;
  } catch (error) {
    console.error(`Error fetching activities for destination ${destinationId}:`, error);
    throw error;
  }
};

// Create a new destination
export const createDestination = async (destinationData) => {
  try {
    const apperClient = initApperClient();
    const params = {
      record: destinationData
    };
    
    const response = await apperClient.createRecord(TABLES.DESTINATION, params);
    return response.data;
  } catch (error) {
    console.error("Error creating destination:", error);
    throw error;
  }
};

// Update an existing destination
export const updateDestination = async (destinationId, destinationData) => {
  try {
    const apperClient = initApperClient();
    const params = {
      record: destinationData
    };
    
    const response = await apperClient.updateRecord(TABLES.DESTINATION, destinationId, params);
    return response.data;
  } catch (error) {
    console.error(`Error updating destination with ID ${destinationId}:`, error);
    throw error;
  }
};

// Delete a destination
export const deleteDestination = async (destinationId) => {
  try {
    const apperClient = initApperClient();
    const response = await apperClient.deleteRecord(TABLES.DESTINATION, destinationId);
    return response.data;
  } catch (error) {
    console.error(`Error deleting destination with ID ${destinationId}:`, error);
    throw error;
  }
};

// Fetch popular destinations (using isPopular flag)
export const fetchPopularDestinations = async (limit = 8) => {
  try {
    const apperClient = initApperClient();
    const params = {
      fields: getTableFields(TABLES.DESTINATION),
      filter: {
        isPopular: true
      },
      pagingInfo: {
        limit: limit,
        offset: 0
      },
      orderBy: [
        { field: "rating", direction: "desc" }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLES.DESTINATION, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular destinations:", error);
    throw error;
  }
};

export default {
  fetchDestinations,
  fetchDestinationById,
  fetchActivitiesForDestination,
  createDestination,
  updateDestination,
  deleteDestination,
  fetchPopularDestinations
};