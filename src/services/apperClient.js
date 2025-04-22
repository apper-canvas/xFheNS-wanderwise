// Initialize ApperClient with Canvas ID
const CANVAS_ID = "4708abfbf60b4c109ca17810a0e17c9f";

export const initApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient(CANVAS_ID);
};

// Tables
export const TABLES = {
  DESTINATION: "destination",
  ACTIVITY: "Activity1",
  TRIP: "trip",
  USER: "User2",
  NEWSLETTER: "newsletter_subscription"
};

// Get fields for a specific table
export const getTableFields = (tableName) => {
  switch (tableName) {
    case TABLES.DESTINATION:
      return [
        "Id", "Name", "location", "country", "region", "image", 
        "description", "details", "rating", "price", "budget", 
        "discount", "category", "type", "travelPeriod", 
        "bestTime", "duration", "isPopular", "language", 
        "currency1", "timezone"
      ];
    
    case TABLES.ACTIVITY:
      return [
        "Id", "Name", "description", "destinationId"
      ];
    
    case TABLES.TRIP:
      return [
        "Id", "Name", "startDate", "endDate", "userId", 
        "destinationId", "status", "notes"
      ];
    
    case TABLES.USER:
      return [
        "Id", "Name", "email", "password"
      ];
    
    case TABLES.NEWSLETTER:
      return [
        "Id", "Name", "email", "subscriptionDate", "isActive"
      ];
    
    default:
      return ["Id", "Name"];
  }
};

export default initApperClient;