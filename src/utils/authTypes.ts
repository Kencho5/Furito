export interface AuthState {
  email: string;
  password: string;
  status: "idle" | "error" | "success";
  isLoading: boolean;
  message: string;
}

export type AuthAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_STATUS"; payload: "idle" | "error" | "success" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGE"; payload: string };
