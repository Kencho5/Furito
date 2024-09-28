import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";

import { lazy } from "react";

import Login from "../pages/Login";
const Register = lazy(() => import("../pages/Register"));

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
        element: <Register />,
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
