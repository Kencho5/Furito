import { AuthState, AuthAction } from "./authTypes";

export const initialState: AuthState = {
  email: "",
  password: "",
  status: "idle",
  isLoading: false,
  message: "",
};

export function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
