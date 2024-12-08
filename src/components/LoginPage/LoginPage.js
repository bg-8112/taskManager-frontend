import React from "react";
import { useNavigate } from "react-router-dom";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import "./LoginPage.css";
import { app } from "../../utils/firebase";

const auth = getAuth(app);

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); // Open Google Sign-In popup
      const user = result.user;
      const token = await result.user.getIdToken(); // Get the ID token after successful sign-in
      console.log(token);
      const userName = user.displayName;
      const userEmail = user.email;

      console.log("user info: " ,{ userName , userEmail});

      await fetch('http://localhost:5000/api/team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName, email: userEmail }), // Sending the data
      });

      
      // Send the toaken to the backend for further authentication
      await onLogin(true);
      localStorage.setItem('isUserLoggedIn', true);
      navigate("/dashboard");

     
    } catch (error) {
      console.error("Google sign-in error:", error); // Log any errors during the sign-in process
    }
  };

  const handleFailure = (error) => {
    console.error(error);
    alert("Failed to login with Google");
  };

  const handleSkip = () => {
    onLogin(true);
    navigate("/dashboard");
  };

  return (
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <button className="skip-button" onClick={handleSuccess}>
            Continue with Google
          </button>
        </div>
      </div>
  );
};

export default LoginPage;
