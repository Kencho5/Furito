import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app";
import "./index.css";
import "./i18n";
import TopBarProgress from "react-topbar-progress-indicator";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

TopBarProgress.config({
  barColors: {
    "0": "#0d9488",
    "1.0": "#0d9488",
  },
  shadowBlur: 2,
  barThickness: 3,
});

const LoadingIndicator = () => <TopBarProgress />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        lazy: async () => {
          const { Register } = await import("./pages/Register");
          return { Component: Register };
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingIndicator />} />
  </StrictMode>,
);

// import { StrictMode, lazy, Suspense } from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./app";
// import "./index.css";
// import "./i18n";
// import TopBarProgress from "react-topbar-progress-indicator";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";
//
// const Register = lazy(() => import("./pages/Register"));
//
// TopBarProgress.config({
//   barColors: {
//     "0": "#0d9488",
//     "1.0": "#0d9488",
//   },
//   shadowBlur: 2,
//   barThickness: 3,
// });
//
// const LoadingIndicator = () => <TopBarProgress />;
//
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: (
//           <Suspense fallback={<TopBarProgress />}>
//             <Register />
//           </Suspense>
//         ),
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);
//
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <RouterProvider router={router} fallbackElement={<LoadingIndicator />} />
//   </StrictMode>,
// );
//
