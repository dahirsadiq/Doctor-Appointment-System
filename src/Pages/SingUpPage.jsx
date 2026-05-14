import { useState } from "react";
import { Link, useNavigate } from "react-router";
import  supabase  from "../lib/supabase";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("patient");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setError(null);

//   try {
//     // 1. create auth user
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) throw error;

//     const user = data.user;
//     if (!user) throw new Error("No user returned");

//     // 2. ALWAYS insert profile correctly
//     const { error: profileError } = await supabase.from("profiles").insert([
//       {
//         id: user.id,
//         email,
//         username,
//         role: role,              // ✅ IMPORTANT FIX
//         status: role === "doctor" ? "pending" : "approved",
//       },
//     ]);

//     if (profileError) throw profileError;

//     navigate("/signin");
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();

  setIsLoading(true);
  setError(null);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("No user created");

    // ✅ IMPORTANT: use selected role from state
    const { error: profileError } = await supabase
  .from("profiles")
  .insert([
    {
      id: user.id,
      email,
      username,
      role: role,   // ✅ MUST BE STATE VALUE
      status: role === "doctor" ? "pending" : "approved",
    },
  ]);

    if (profileError) throw profileError;

    navigate("/signin");

  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
  // ================= SUCCESS SCREEN =================
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">
            Account Created Successfully
          </h2>
          <p className="text-gray-500 mt-2">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  // ================= FORM =================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* ROLE SELECT */}
          <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="w-full border p-2 rounded"
>
  <option value="patient">Patient</option>
  <option value="doctor">Doctor</option>
  <option value="admin">Admin</option>
</select>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {isLoading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;