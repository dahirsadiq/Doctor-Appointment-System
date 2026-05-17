import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(true);
   const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, profile, user ,logout } = useAuth();
  const role = profile?.role;


  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between h-16 items-center">
          
          {/* 🔹 LEFT */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              DoctorSys
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium">
                Home
              </Link>

              <Link to="/contact" className="px-1 pt-1 text-sm text-gray-600 hover:text-blue-600">
                Contact
              </Link>

          {role === "admin" && (
        <Link
          to="/AdminDoctorManagement"
          className="px-1 pt-1 text-sm text-gray-600 hover:text-blue-600"
        >
          Admin Dashboard
        </Link>
      )}

      {role === "doctor" && (
        <Link
          to="/doctors"
          className="px-1 pt-1 text-sm text-gray-600 hover:text-blue-600"
        >
          Doctors
        </Link>
      )}

      {role === "patient" && (
        <Link
          to="/patients"
          className="px-1 pt-1 text-sm text-gray-600 hover:text-blue-600"
        >
          Patients
        </Link>
      )}
            </nav>
          </div>

          {/* 🔹 RIGHT (Desktop Auth) */}
          <div className="hidden sm:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/signin" className="text-sm text-gray-600 hover:text-blue-600">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => logout()}
                className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm"
              >
                Signout
              </button>
            )}
          </div>

          {/* 📱 MOBILE BUTTON */}
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
          
          <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/contact" className="block py-2" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

             {role === "admin" && (
        <Link
          to="/AdminDoctorManagement"
          className="px-1 pt-1 text-sm text-gray-600 hover:text-blue-600"
        >
          Admin Dashboard
        </Link>
      )}

      {role === "doctor" && (
        <Link
          to="/doctors"
          className="px-1 pt-1 text-sm text-gray-600 hover:text-blue-600"
        >
          Doctors
        </Link>
      )}

      {role === "patient" && (
        <Link
          to="/patients"
          className="px-1 pt-1 text-sm text-gray-600 hover:text-blue-600"
        >
          Patients
        </Link>
      )}

          {/* Auth Mobile */}
          {!isLoggedIn ? (
            <>
              <Link to="/signin" className="block py-2 text-blue-600" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" className="block py-2 bg-blue-600 text-white rounded text-center" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <button
            
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;