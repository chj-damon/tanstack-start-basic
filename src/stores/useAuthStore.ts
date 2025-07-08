import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

/**
 * 使用zustand的persist中间件，将token存储到localStorage中
 */
export const useAuthStore = create<AuthStore>()(persist(
  (set) => ({
    token: null,
    isAuthenticated: false,
    login: (token) => set({ token, isAuthenticated: true }),
    logout: () => set({ token: null, isAuthenticated: false }),
  }),
  {
    name: "auth-storage",
    storage: createJSONStorage(() => window.localStorage),
  }
));