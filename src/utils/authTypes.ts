export interface AuthState {
  username: string;
  password: string;
  status: "idle" | "error" | "success";
  isLoading: boolean;
}

export type AuthAction =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_STATUS"; payload: "idle" | "error" | "success" }
  | { type: "SET_LOADING"; payload: boolean };

