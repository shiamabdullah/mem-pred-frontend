import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logic from "./pages/logic";
import Memory from "./pages/memory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Memory />,
  },
  {
    path: "/logic",
    element: <Logic />,
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
