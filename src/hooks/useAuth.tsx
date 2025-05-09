import axios from "axios";
import { baseURL } from "@/components/api/base";

export const authService = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${baseURL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Invalid credentials");
    }

    const data = await res.json();
    return {
      token: data.access_token,
      refreshToken: data.access_token
    };

    // return res.json(); // { access_token, refresh_token }
  },

  getUser: async (token: string) => {
    const res = await fetch(`${baseURL}/api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return res.json(); // { id, email, name, ... }
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axios.post(`${baseURL}/api/v1/auth/refresh/`, {
      refresh: refreshToken,
    });
    return response.data; // Expected: { token, refreshToken }
  },
};
