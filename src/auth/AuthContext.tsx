import React, { ReactNode } from "react";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

interface AuthState {
  loggedIn: boolean;
  verify: () => Promise<boolean>;
  login: (token: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  loggedIn: !!localStorage.getItem("token"),

  verify: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch {
      return false;
    }
  },

  login: async (token: string) => {
    if (!token) return false;

    localStorage.setItem("token", token);
    set({ loggedIn: true });
    return true;
  },

  logout: async () => {
    localStorage.removeItem("token");
    set({ loggedIn: false });
  },
}));

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => <>{children}</>;
