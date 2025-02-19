
import API from "../utils/userApi";

const API_URL = "/user/profile"; // ✅ Base URL for user profile API

export const getInnovatorStats = async () => {
    const response = await API.get(`${API_URL}/dashboard`);
    return response.data;
};

export const getDashboard = async () => {
    const response = await API.get(`${API_URL}/dashboard`);
    return response.data;
};
export const getNotifications = async () => {
    const response = await API.get(`${API_URL}/notifications`);
    return response.data;
};

// ✅ Edit Profile (for both Innovators and Investors)
export const editProfile = async (profileData) => {
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
        formData.append(key, profileData[key]);
    });
    const response = await API.put(`${API_URL}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateProfile = async (profileData) => {
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
        formData.append(key, profileData[key]);
    });
    const response = await API.put(`${API_URL}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// ✅ Get Profile (for both Innovators and Investors)
export const getProfile = async () => {
    const response = await API.get(`${API_URL}`);
    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await API.post(`${API_URL}/change-password`, passwordData);
    return response.data;
};

export const deleteAccount = async () => {
    const response = await API.delete(`${API_URL}/delete-account}`);
    return response.data;
};

// ✅ Investment and Commitment Management
export const createInvestmentWithCommitment = async (investmentData) => {
    const response = await API.post(`${API_URL}/investments`, investmentData);
    return response.data;
};

export const addCommitmentConditions = async (conditionsData) => {
    const response = await API.post(`${API_URL}/commitments/conditions`, conditionsData);
    return response.data;
};

export const signCommitmentInvestor = async (commitmentId) => {
    const response = await API.post(`${API_URL}/commitments/sign/investor`, { commitmentId });
    return response.data;
};

export const signCommitmentInnovator = async (commitmentId) => {
    const response = await API.post(`${API_URL}/commitments/sign/innovator`, { commitmentId });
    return response.data;
};

export const getUserCommitments = async () => {
    const response = await API.get(`${API_URL}/commitments`);
    return response.data;
};

export const getUserInvestments = async () => {
    const response = await API.get(`${API_URL}/investments`);
    return response.data;
};

// ✅ Fetch a Commitment by ID
export const getCommitmentById = async (commitmentId) => {
    const response = await API.get(`${API_URL}/commitments/${commitmentId}`);
    return response.data;
};