import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";

import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";
import { AuthSkeleton } from "../components/auth/AuthSkeleton";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export const router = createBrowserRouter(
  [
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
            <Suspense fallback={<AuthSkeleton width="550" height="424" />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<AuthSkeleton width="550" height="424" />}>
              <Register />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
