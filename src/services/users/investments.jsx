import API from "../../utils/userApi";

const API_URL = "/user/investments";

// ✅ Get all investments
export const getInvestments = async () => {
  const response = await API.get(`${API_URL}/`);
  return response.data;
};

// ✅ Get investment by ID
export const getInvestmentById = async (id) => {
  const response = await API.get(`${API_URL}/${id}`);
  return response.data;
};
