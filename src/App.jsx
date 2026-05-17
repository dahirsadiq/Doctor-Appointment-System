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
import UnAuthenticatedRoute from "./Components/UnAuthenticatedRoute";
import DoctorDashboard from "./Pages/DoctorDashboard";
import PatientDashboard from "./Pages/PatientDashboard";
import AdminDashboard from "./Pages/AdminDoctorManagement";


function App() {
  const navigate = useNavigate();
  const {profile , user}=useAuth();

  return (
      <AuthProvider>
         <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Doctors" element={<DoctorDashboard/>} />
        <Route path="/Patients" element={<PatientDashboard/>} />
            <Route path="/AdminDoctorManagement" element={<AdminDashboard/>} />
      
        {/* un authenticated routes */}
         <Route path='/signin'
              element={
                <UnAuthenticatedRoute>
                  <SignInPage />
                </UnAuthenticatedRoute>
              } />

            <Route path='/signup'
              element={
                <UnAuthenticatedRoute>
                  <SignUpPage />
                </UnAuthenticatedRoute>
              }
            />

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