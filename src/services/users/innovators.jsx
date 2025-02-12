import API from "../../utils/userApi";

const API_URL = "user/innovators";



// ✅ Get All Innovators
export const getInnovators = async () => {
  try {
    const response = await API.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching innovators:", error);
    throw error;
  }
};

// ✅ Get Innovator by ID
export const getInnovatorById = async (id) => {
  try {
    const response = await API.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching innovator:", error);
    throw error;
  }
};

// ✅ Get Innovations by Innovator ID
export const getInnovationsByInnovator = async (id) => {
  try {
    const response = await API.get(`${API_URL}/${id}/innovations`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching innovations by innovator:", error);
    throw error;
  }
};

export const getInnovatorStats = async () => {
  const response = await API.get("user/innovator-dashboard");
  return response.data;
};

export const handleInvestmentRequest = async (id, status) => {
  const response = await API.post(`user/innovator-dashboard-request/${id}`, { status });
  return response.data;
};
