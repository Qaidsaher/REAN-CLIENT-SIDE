import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton = ({ onSuccess }) => {
  const handleSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("Google User:", decoded);
    onSuccess(decoded);
  };

  const handleFailure = () => {
    console.error("Google Sign-in Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleFailure}
    />
  );
};

export default GoogleLoginButton;
