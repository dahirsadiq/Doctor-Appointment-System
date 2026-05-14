// lib/auth.js
import supabase from "./supabase";

export async function signUp(email, password, username, role = "patient") {
  // 1️⃣ Create auth user
  const { data: authData, error: signUpError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (signUpError) throw signUpError;

  const user = authData?.user;

  if (!user) {
    throw new Error("User not returned. Check email confirmation.");
  }

  // 2️⃣ Insert profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email,
      username,
      role,
    });

  if (profileError) throw profileError;

  return profileData;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (!data?.session) {
    throw new Error("No session created");
  }

  return data;
}
 export async function  getUser ()  {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Get user error:", error.message);
    return null;
  }

  return data.user;
};