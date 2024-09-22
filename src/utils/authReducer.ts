import { AuthState, AuthAction } from "./authTypes";

export const initialState: AuthState = {
  username: "",
  password: "",
  status: "idle",
  isLoading: false,
};

export function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

