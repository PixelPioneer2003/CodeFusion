import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashBoard/DashBoard";
import ProfilePage from "./Pages/ProfilePage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import OtpVerification from "./components/Auth/OtpVerification";
import AddPlatform from "./components/Platform/AddPlatform";
import ProfileList from "./components/Platform/AllPlatforms";
import { AuthContextProvider } from "./context/AuthContext";
function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/allPlatform/:userId" element={<ProfileList />} />
          <Route path="/addPlatform/:userId" element={<AddPlatform />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
