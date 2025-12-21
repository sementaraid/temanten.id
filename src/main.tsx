import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { getReleasedRoutes } from '@/routes';

const router = createBrowserRouter(getReleasedRoutes())
console.log("Released Routes:", getReleasedRoutes());
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)