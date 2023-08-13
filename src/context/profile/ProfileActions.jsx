/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "/api/users/profile/";

// Create profile
export const createProfile = async (profileData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, profileData, config);
    console.log("data", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user profile
export const getProfile = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update profile
export const updateProfile = async (profileId, profileData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(API_URL + profileId, profileData, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};
