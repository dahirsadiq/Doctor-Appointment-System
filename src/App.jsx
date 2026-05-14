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

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH PROFILE
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Profile error:", error);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      // 1️⃣ restore session
      const { data: sessionData } = await supabase.auth.getSession();
      const sessionUser = sessionData?.session?.user;

      if (!sessionUser) {
        setLoading(false);
        return;
      }

      setUser(sessionUser);

      // 2️⃣ get profile
      const profileData = await fetchProfile(sessionUser.id);
      setProfile(profileData);

      // 3️⃣ routing logic
      if (profileData?.role === "doctor") {
        if (profileData.status !== "approved") {
          navigate("/signin"); // blocked doctor
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/dashboard");
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <>
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
    </>
  );
}

export default App;