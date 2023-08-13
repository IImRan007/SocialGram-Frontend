/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "/api/posts/";

// Create post
export const createPost = async (postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, postData, config);
    console.log("data", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get posts
export const getPosts = async (token) => {
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

// Get all posts
export const getAllPosts = async () => {
  try {
    const response = await axios.get(API_URL + "all");

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user post
export const getPost = async (productId) => {
  // try {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  const response = await axios.get(API_URL + productId);

  return response.data;
  // } catch (error) {
  //   throw error;
  // }
};
// // Get user product
// export const getProduct = async (productId, token) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(API_URL + productId, config);

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Update post
export const updatePost = async (productId, postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(API_URL + productId, postData, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete user post
export const deletePost = async (productId, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(API_URL + productId, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};
