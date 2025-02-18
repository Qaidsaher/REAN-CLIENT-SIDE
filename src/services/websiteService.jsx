// websiteService.js
import API from "../utils/userApi";

// Get All Categories
export const getCategories = async () => {
    const response = await API.get("/website/categories");
    return response.data;
};

// Get Counts of All Items
export const getCounts = async () => {
    // alert()
    const response = await API.get("/website/counts");

    return response.data;
};

// Get All Innovators
export const getInnovators = async () => {
    const response = await API.get("/website/innovators");
   
    return response.data;
};

// Get Innovator by ID
export const getInnovatorById = async (id) => {
    const response = await API.get(`/website/innovator/${id}`);
    return response.data;
};
// ✅ Get Innovations by Innovator ID
export const getInnovationsByInnovator = async (id) => {
    try {
        const response = await API.get(`/website/innovator/${id}/innovations`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching innovations by innovator:", error);
        throw error;
    }
};
// Get All Investors
export const getInvestors = async () => {
    const response = await API.get("/website/investors");
    return response.data;
};

// Get Investor by ID
export const getInvestorById = async (id) => {
    const response = await API.get(`/website/investor/${id}`);
    return response.data;
};

// Get All Innovations
export const getInnovations = async () => {
    const response = await API.get("/website/innovations");
    return response.data;
};

// Get Innovation by ID
export const getInnovationById = async (id) => {
    const response = await API.get(`/website/innovation/${id}`);
    return response.data;
};

// Get All Investments
export const getInvestments = async () => {
    const response = await API.get("/website/investments");
    return response.data;
};

// Get Investment by ID
export const getInvestmentById = async (id) => {
    const response = await API.get(`/website/investment/${id}`);
    return response.data;
};

// Get 3 Random Innovators
export const getRandomInnovators = async () => {
    const response = await API.get("/website/innovators/random");
    return response.data;
};

// Get 3 Random Investors
export const getRandomInvestors = async () => {
    const response = await API.get("/website/investors/random");
    return response.data;
};

// Get 3 Random Innovations
export const getRandomInnovations = async () => {
    const response = await API.get("/website/innovations/random");
    return response.data;
};

// Get 3 Random Investments
export const getRandomInvestments = async () => {
    const response = await API.get("/website/investments/random");
    return response.data;
};
