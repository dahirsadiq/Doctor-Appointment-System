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
import ProtectedRoute from "./Components/ProtectedRoute";
import ContactPage from "./Pages/ContactPage";


function App() {
  const navigate = useNavigate();
  const {profile , user}=useAuth();

  return (
      <AuthProvider>
        
         <Header />
         <main>
          <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Contact" element={<ContactPage />} />
        <Route path="/Doctors" element={ <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>} />
        <Route path="/Patients" element={ <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>} />
            <Route path="/AdminDoctorManagement" element={ <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>} />
      
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
         </main>

      

      <Footer />
      </AuthProvider>
  
  );
}

export default App;