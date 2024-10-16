import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";

import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
      {
        path: "*",
        lazy: async () => {
          const { NotFound } = await import("../pages/NotFound");
          return { Component: NotFound };
        },
      },
    ],
  },
]);
