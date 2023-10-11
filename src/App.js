import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logic from "./pages/logic";
import Login from "./pages/login";
import Memory from "./pages/memory";
import Profile from "./pages/profile";
import Users from "./pages/users";

const router = createBrowserRouter([
  {
    path: "/ez-gf-internal/jigyasa/",
    element: <Memory />,
  },
  {
    path: "/ez-gf-internal/jigyasa/logic",
    element: <Logic />,
  },
  {
    path: "/ez-gf-internal/jigyasa/profile",
    element: <Profile />,
  },
  {
    path: "/ez-gf-internal/jigyasa/users",
    element: <Users />,
  },
  {
    path: "/ez-gf-internal/jigyasa/login",
    element: <Login />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
}
