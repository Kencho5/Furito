import React, { ReactNode } from "react";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  loggedIn: boolean;
  verify: () => Promise<boolean>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  loggedIn: !!localStorage.getItem("token"),

  verify: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return parseInt(decoded.exp, 10) > now;
  },

  login: async (token: string) => {
    localStorage.setItem("token", token);
    set({ loggedIn: true });
  },

  logout: async () => {
    localStorage.removeItem("token");
    set({ loggedIn: false });
  },
}));

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => <>{children}</>;
