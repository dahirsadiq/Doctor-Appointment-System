// import { useEffect, useState } from "react";
// import supabase from "../lib/supabase";
// import { getUserProfile } from "../lib/auth";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [username, setUsername] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");

//   // 1. Get logged-in user from Supabase
//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();

//       if (error) {
//         console.error("Auth error:", error);
//         return;
//       }

//       setUser(user);
//     };

//     fetchUser();
//   }, []);

//   // 2. Fetch profile when user is ready
//   useEffect(() => {
//     if (user?.id) {
//       fetchUserProfile(user.id);
//     }
//   }, [user]);

//   const fetchUserProfile = async (userId) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const profile = await getUserProfile(userId);

//       if (!profile) {
//         setError("Profile not found");
//         return;
//       }

//       setUsername(profile.username || "");
//       setAvatarUrl(profile.avatar_url || "");
//     } catch (err) {
//       console.error("Profile error:", err);
//       setError("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UI states
//   if (!user) {
//     return <div className="p-6 text-center">Not logged in</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
//       <h2 className="text-xl font-bold mb-4">My Profile</h2>

//       {loading && <p className="text-gray-500">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div className="space-y-4">
//           {avatarUrl && (
//             <img
//               src={avatarUrl}
//               alt="Avatar"
//               className="w-24 h-24 rounded-full object-cover"
//             />
//           )}

//           <div>
//             <p className="text-sm text-gray-500">Username</p>
//             <p className="font-medium">{username || "No username"}</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Email</p>
//             <p className="font-medium">{user.email}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;