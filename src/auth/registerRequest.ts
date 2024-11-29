import { IRegisterInputs } from "./AuthTypes";
const API_URL = import.meta.env.VITE_API_URL;

export const registerRequest = async (data: IRegisterInputs) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw responseData.error;
  }

  return responseData.token;
};
