import API from "../utils/userApi";

const API_URL = "/user/innovations";

// ✅ Get all innovations of the logged-in user
export const getInnovations = async () => {
  const response = await API.get(`${API_URL}`);
  return response.data;
};

// ✅ Get Innovation by ID
export const getInnovationById = async (id) => {
  try {
    const response = await API.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching innovation:", error);
    throw error;
  }
};

// ✅ Create a new innovation (with Content-Type header for file uploads)
export const createInnovation = async (innovation) => {
  const headers = {
    "Content-Type": "multipart/form-data", // Required for image/video uploads
  };

  const response = await API.post(`${API_URL}`, innovation, { headers });
  return response.data;
};

// ✅ Update an innovation (with Content-Type header for file uploads)
export const updateInnovation = async (id, innovation) => {
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const response = await API.put(`${API_URL}/${id}`, innovation, { headers });
  return response.data;
};

// ✅ Delete an innovation
export const deleteInnovation = async (id) => {
  await API.delete(`${API_URL}/${id}`);
};

// ✅ Get all categories
export const getCategories = async () => {
  const response = await API.get(`/user/categories`);
  return response.data;
};
