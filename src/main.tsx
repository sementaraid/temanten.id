
import '@vitejs/plugin-react-swc/preamble'  // Add this line first
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { getReleasedRoutes } from '@/routes';

const router = createBrowserRouter(getReleasedRoutes())
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
)