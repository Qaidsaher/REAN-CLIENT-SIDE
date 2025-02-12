// src/contexts/InvestorAuthProvider.js
import React, { createContext, useState, useEffect } from "react";

export const InvestorAuthContext = createContext();

export const InvestorAuthProvider = ({ children }) => {
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing investor session (simulated with localStorage)
  useEffect(() => {
    const storedInvestor = localStorage.getItem("investor");
    if (storedInvestor) {
      setInvestor(JSON.parse(storedInvestor));
    }
    setLoading(false);
  }, []);

  // Simulated login function
  const login = async (email, password) => {
    // Replace this simulated call with your real investor login API call.
    const dummyInvestor = { investor_ID: 1, first_name: "Investor", Email: email };
    localStorage.setItem("investor", JSON.stringify(dummyInvestor));
    setInvestor(dummyInvestor);
  };

  const logout = () => {
    localStorage.removeItem("investor");
    setInvestor(null);
  };

  return (
    <InvestorAuthContext.Provider value={{ investor, login, logout, loading }}>
      {children}
    </InvestorAuthContext.Provider>
  );
};
