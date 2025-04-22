import initApperClient, { TABLES, getTableFields } from './apperClient';

// Handle user authentication
export const setupAuth = (targetElement, onSuccess, onError) => {
  const { ApperUI } = window.ApperSDK;
  const apperClient = initApperClient();

  ApperUI.setup(apperClient, {
    target: targetElement,
    clientId: "4708abfbf60b4c109ca17810a0e17c9f",
    hide: [],
    view: 'both',
    onSuccess: (user, account) => {
      // Store user details in localStorage for reference across the application
      localStorage.setItem('apperUser', JSON.stringify(user.data));
      if (onSuccess) onSuccess(user, account);
    },
    onError: (error) => {
      console.error("Authentication failed:", error);
      if (onError) onError(error);
    }
  });

  return {
    showLogin: () => ApperUI.showLogin(targetElement),
    showSignup: () => ApperUI.showSignup(targetElement)
  };
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = localStorage.getItem('apperUser');
  return !!user;
};

// Get current user data
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('apperUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('apperUser');
  // Optionally call any backend logout endpoint if needed
  window.location.href = '/';
};

// Register user using User2 table (for manual registration if needed)
export const registerUser = async (userData) => {
  try {
    const apperClient = initApperClient();
    const params = {
      record: {
        Name: userData.name,
        email: userData.email,
        password: userData.password
      }
    };
    
    const response = await apperClient.createRecord(TABLES.USER, params);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const apperClient = initApperClient();
    const params = {
      fields: getTableFields(TABLES.USER),
      filter: {
        Id: userId
      }
    };
    
    const response = await apperClient.fetchRecords(TABLES.USER, params);
    return response.data && response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export default {
  setupAuth,
  isAuthenticated,
  getCurrentUser,
  logout,
  registerUser,
  getUserProfile
};