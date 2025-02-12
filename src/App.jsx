// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Import Google Provider

function App() {
  return (
     
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              {AdminRoutes()}
              <Route path="/" element={<LandingPage />} />
              <Route path="/*" element={<UserRoutes />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    
  );
}

export default App;
