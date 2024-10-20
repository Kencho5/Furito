import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";

const Login = lazy(() => import("../pages/Login"));

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
        path: "*",
        lazy: async () => {
          const { NotFound } = await import("../pages/NotFound");
          return { Component: NotFound };
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
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
]);
