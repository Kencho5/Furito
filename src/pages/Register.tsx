import { useReducer } from "react";
import { initialState, reducer } from "../utils/authReducer";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    });

    if (response.ok) {
      dispatch({ type: "SET_STATUS", payload: "success" });
    } else {
      dispatch({ type: "SET_STATUS", payload: "error" });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-stone-100">
      <div className="mt-10 w-full max-w-sm transform rounded-lg bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Register
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={state.username}
              onChange={(e) =>
                dispatch({
                  type: "SET_USERNAME",
                  payload: e.target.value,
                })
              }
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition duration-200 ease-in-out focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition duration-200 ease-in-out focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {state.status === "error" && (
            <div className="mb-4 rounded-md bg-red-100 p-4 text-red-600">
              <p>Username taken.</p>
            </div>
          )}

          {state.status === "success" && (
            <div className="mb-4 rounded-md bg-green-100 p-4 text-green-600">
              <p>Registration successful!</p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full transform rounded-lg bg-teal-600 px-4 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-200 ease-in-out focus:outline-none ${
              state.isLoading
                ? "cursor-not-allowed bg-teal-400 motion-safe:animate-pulse"
                : "hover:scale-105 hover:bg-teal-700"
            }`}
          >
            {state.isLoading ? "Submitting..." : "Register"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-teal-600 transition duration-200 hover:text-teal-700"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
