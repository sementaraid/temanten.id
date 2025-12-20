import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from "@/pages/home"
import MartaSunar from "@/pages/marta-sunar"

let router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "marta-sunar",
    Component: MartaSunar
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
)
