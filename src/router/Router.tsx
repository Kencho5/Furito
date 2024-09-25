import { createBrowserRouter } from "react-router-dom";
import App from "../app";

import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import("../pages/Home");
          return { Component: Home };
        },
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        lazy: async () => {
          const { Register } = await import("../pages/Register");
          return { Component: Register };
        },
      },
    ],
  },
  {
    path: "*",
    lazy: async () => {
      const { NotFound } = await import("../pages/NotFound");
      return { Component: NotFound };
    },
  },
]);
