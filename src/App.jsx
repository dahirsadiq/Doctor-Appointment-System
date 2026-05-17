import { Route, Routes, Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import supabase from "./lib/supabase";

import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import DoctorsPage from "./Pages/DoctorsPage";
import PatientsPage from "./Pages/PatientsPage";
import SignInPage from "./Pages/SingInPage";

import SignUpPage from "./Pages/SingUpPage";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";


function App() {
  const navigate = useNavigate();
  const {profile , user}=useAuth();

  return (
      <AuthProvider>
         <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Doctors" element={<DoctorsPage />} />
        <Route path="/Patients" element={<PatientsPage />} />

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard profile={profile} user={user} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>

      <Footer />
      </AuthProvider>
  
  );
}

export default App;