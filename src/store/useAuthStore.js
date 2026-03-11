import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE = "https://api.escuelajs.co/api/v1";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(`${API_BASE}/auth/login`, {
            email,
            password,
          });

          const { access_token, refresh_token } = res.data;
          set({ token: access_token, loading: false });

          // Fetch user profile after login
          await get().fetchProfile();

          return true;
        } catch (err) {
          const message =
            err.response?.data?.message || "Invalid email or password";
          set({ loading: false, error: message });
          return false;
        }
      },

      signup: async (name, email, password, avatar) => {
        set({ loading: true, error: null });
        try {
          await axios.post(`${API_BASE}/users/`, {
            name,
            email,
            password,
            avatar: avatar || "https://i.imgur.com/yhW6Yw1.jpg",
          });

          // Auto-login after signup
          const success = await get().login(email, password);
          return success;
        } catch (err) {
          const message =
            err.response?.data?.message || "Signup failed. Please try again.";
          set({
            loading: false,
            error: Array.isArray(message) ? message[0] : message,
          });
          return false;
        }
      },

      fetchProfile: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const res = await axios.get(`${API_BASE}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({
            user: res.data,
            isAuthenticated: true,
            loading: false,
          });
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
