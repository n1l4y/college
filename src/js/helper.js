import axios from "axios";

// Set the base URL for your backend
const API_URL = `https://meteora-backend-three.vercel.app/api/auth`;

// Sign up function
export const signup = async (name, email, password, latitude, longitude) => {
  // Password validation: at least 8 characters, 1 uppercase letter, and 1 number
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;

  if (!passwordRegex.test(password)) {
    throw {
      msg: "Password must be at least 8 characters, contain 1 uppercase letter and 1 number",
    };
  }

  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
      latitude,
      longitude,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error(
      "Error during sign up:",
      error.response?.data || error.message
    );
    throw error.response?.data || { msg: "Something went wrong" };
  }
};

// Sign in function
export const signin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, {
      email,
      password,
    });
    // Save token to localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error during sign in", error.response.data);
    throw error.response.data; // Return error message
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("atoken");
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("atoken");
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        "x-auth-token": token, // Send the token in the request headers
      },
    });
    return response.data;
  } catch (error) {
    logout();
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    throw error.response?.data || { msg: "Failed to fetch user" };
  }
};
