// import React, { useState } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// const GoogleLoginButton = () => {
//   const [user, setUser] = useState(null);

//   return (
//     <GoogleOAuthProvider clientId="813729221970-2sro6banogmr8nmosfk6eaah26obf1vt.apps.googleusercontent.com">
//       <GoogleLogin
//         onSuccess={(response) => {
//           const decoded = jwtDecode(response.credential); // ✅ Use correct function name
//           setUser({
//             name: decoded.name,
//             email: decoded.email,
//             picture: decoded.picture,
//             token: response.credential,
//           });
//           console.log("User Data:", decoded);
//         }}
//         onError={() => {
//           console.log("Login Failed");
//         }}
//       />

//       {user && (
//         <div>
//           <h3>Welcome, {user.name}!</h3>
//           <img src={user.picture} alt="User Profile" width="50" />
//           <p>Email: {user.email}</p>
//           <p>Token: {user.token.substring(0, 20)}...</p> {/* Shorten for display */}
//         </div>
//       )}
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/AuthContext"; // Import the auth context

const GoogleLoginButton = ({ role }) => {
  const { googleLogin } = useAuth(); // Use the Google login function

  const handleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("User Data:", decoded);

    // Call Google login function from AuthContext
    await googleLogin(response.credential, role);
  };

  return (
    <GoogleOAuthProvider clientId="122534742627-5ln7qqg0q2r87drgrlqh6nn6lsc0pu6g.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
