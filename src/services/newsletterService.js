import initApperClient, { TABLES, getTableFields } from './apperClient';

// Subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  try {
    const apperClient = initApperClient();
    
    // Check if email already exists
    const checkParams = {
      fields: ["Id"],
      filter: {
        email: email
      }
    };
    
    const checkResponse = await apperClient.fetchRecords(TABLES.NEWSLETTER, checkParams);
    
    // If email already exists, return existing subscription
    if (checkResponse.data && checkResponse.data.length > 0) {
      return {
        success: false,
        message: "Email is already subscribed to the newsletter",
        data: checkResponse.data[0]
      };
    }
    
    // Create new subscription
    const subscriptionData = {
      record: {
        Name: email.split('@')[0], // Use part of email as name
        email: email,
        subscriptionDate: new Date().toISOString(),
        isActive: true
      }
    };
    
    const response = await apperClient.createRecord(TABLES.NEWSLETTER, subscriptionData);
    
    return {
      success: true,
      message: "Successfully subscribed to the newsletter",
      data: response.data
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
};

// Unsubscribe from newsletter
export const unsubscribeFromNewsletter = async (email) => {
  try {
    const apperClient = initApperClient();
    
    // Find subscription by email
    const findParams = {
      fields: ["Id"],
      filter: {
        email: email
      }
    };
    
    const findResponse = await apperClient.fetchRecords(TABLES.NEWSLETTER, findParams);
    
    // If no subscription found
    if (!findResponse.data || findResponse.data.length === 0) {
      return {
        success: false,
        message: "No subscription found for this email"
      };
    }
    
    const subscriptionId = findResponse.data[0].Id;
    
    // Update subscription to inactive
    const updateData = {
      record: {
        isActive: false
      }
    };
    
    await apperClient.updateRecord(TABLES.NEWSLETTER, subscriptionId, updateData);
    
    return {
      success: true,
      message: "Successfully unsubscribed from the newsletter"
    };
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    throw error;
  }
};

export default {
  subscribeToNewsletter,
  unsubscribeFromNewsletter
};