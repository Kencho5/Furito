import { ReactNode } from "react";
import { create } from "zustand";
import { useQuery } from "react-query";
import { changeLanguage } from "i18next";
import { allowedLanguages } from "./allowedLanguages";

const API_URL = import.meta.env.VITE_API_URL;

interface LocationState {
  language: string | null;
  setLanguage: (lang: string) => void;
}

interface IpData {
  ip: string;
  city: string;
  country: string;
  language: string;
}

const fetchIpData = async (): Promise<IpData> => {
  const response = await fetch(`${API_URL}/location`, { method: "POST" });
  if (!response.ok) throw new Error("IP data fetch failed");
  return response.json();
};

export const useIpData = create<LocationState>((set) => ({
  language: null,
  setLanguage: (lang: string) => {
    set({ language: lang });
    changeLanguage(lang);
    localStorage.setItem("language", lang);
  },
}));

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setLanguage } = useIpData();

  useQuery("IpData", fetchIpData, {
    onSuccess: (data) => {
      const lang = data.language;
      if (!allowedLanguages.includes(lang)) return;
      setLanguage(lang);
    },
    onError: () => {
      setLanguage("en");
    },
    enabled: !localStorage.getItem("language"),
    retry: false,
  });

  return <>{children}</>;
};
