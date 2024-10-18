import { useReducer } from "react";
import { initialState, reducer } from "../hooks/authReducer";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginRequest {
  email: string;
  password: string;
}

const loginRequest = async ({ email, password }: LoginRequest) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }

  return (await response.json()).token;
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { login } = useAuth();
  const { t } = useTranslation();

  const { mutate } = useMutation(loginRequest, {
    onSuccess: async (token) => {
      const status = await login(token);
      dispatch({ type: "SET_STATUS", payload: status });
    },
    onError: (error: Error) => {
      dispatch({ type: "SET_STATUS", payload: "error" });
      dispatch({ type: "SET_MESSAGE", payload: error.message });
    },
    onSettled: () => {
      dispatch({ type: "SET_LOADING", payload: false });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    mutate({ email: state.email, password: state.password });
  };

  return (
    <div className="bg-stone-100 flex min-h-screen flex-col items-center">
      <div className="mt-10 w-full max-w-sm transform rounded-lg bg-white p-8 shadow-lg">
        <h3 className="text-gray-800 mb-6 text-center text-3xl font-bold">
          {t("LOGIN.login")}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-gray-700 block text-sm font-medium"
            >
              email
            </label>
            <input
              id="email"
              type="text"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_EMAIL",
                  payload: e.target.value,
                })
              }
              className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 mt-2 w-full rounded-lg border px-4 py-3 shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-gray-700 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={state.password}
              onChange={(e) =>
                dispatch({
                  type: "SET_PASSWORD",
                  payload: e.target.value,
                })
              }
              className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 mt-2 w-full rounded-lg border px-4 py-3 shadow-sm transition duration-200 ease-in-out focus:outline-none focus:ring-2 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {state.status === "error" && (
            <div className="bg-red-100 text-red-600 mb-4 rounded-md p-4">
              <p>{state.message}</p>
            </div>
          )}

          {state.status === "success" && (
            <div className="bg-green-100 text-green-600 mb-4 rounded-md p-4">
              <p>Login successful!</p>
            </div>
          )}

          <button
            type="submit"
            className={`bg-teal-600 w-full transform rounded-lg px-4 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-200 ease-in-out focus:outline-none ${
              state.isLoading
                ? "bg-teal-400 cursor-not-allowed motion-safe:animate-pulse"
                : "hover:bg-teal-700 hover:scale-105"
            }`}
          >
            {state.isLoading ? "Submitting..." : "Login"}
          </button>

          <div className="text-gray-600 mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-teal-600 hover:text-teal-700 font-semibold transition duration-200"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
