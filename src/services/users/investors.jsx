import API from "../../utils/userApi";

const API_URL = "/user";




export const getInvestorStats = async () => {
  const response = await API.get(`${API_URL}/investor-dashboard`);
  return response.data;
};
// 📌 Handle Investment Request (Accept/Reject)
export const updateInvestmentRequest = async (id, status) => {
  const response = await axios.put(`${API_URL}/investor-dashboard-requests/${id}`, { status });
  return response.data;
};
// ✅ Get all investors
export const getInvestors = async () => {
  const response = await API.get(`${API_URL}/investors`);
  return response.data;
};

// ✅ Get investor by ID
export const getInvestorById = async (id) => {
  const response = await API.get(`${API_URL}/investors/${id}`);
  return response.data;
};
// ✅ Get investments by a specific investor
export const getInvestmentsByInvestor = async (investorId) => {
    const response = await API.get(`${API_URL}/investors/${investorId}/investments`);
    return response.data;
  };