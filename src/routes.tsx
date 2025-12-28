import { distVersion } from "../app.config"

import Home from '@/pages/home'
import MartaSunar from '@/releases/marta-sunar'
import NotFound from "@/pages/not-found"
import type { RouteObject } from "react-router"
import { Layout } from "./layout"
import { Login } from "./pages/login"
import { DashboardLayout } from "./layout/dashboard"

const routeReleasedByVersion = {
  '1766308273810': {
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ]
  },
  '1766308273811': {
    children: [
      {
        path: 'marta-sunar',
        Component: MartaSunar,
      },
    ],
  },
  '1766308273812': {
    children: [
      {
        path: '*',
        Component: NotFound
      }
    ]
  },
  '1766776338343': {
    children: [
      {
        path: 'sign-in',
        Component: Login
      }
    ]
  },
  '1766776395591': {
    Component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        Component: () => <>hai</>
      },
      {
        path: 'customers',
        Component: () => <>customers</>
      }
    ]
  }
}

export const getReleasedRoutes = (): RouteObject[] => {
  const released: RouteObject[] = []
  const currentVersionNum = parseInt(distVersion)

  // Iterate through all versions in order
  for (const [versionKey, config] of Object.entries(routeReleasedByVersion)) {
    const versionNum = parseInt(versionKey)

    // If version is <= current dist version, include those routes
    if (versionNum <= currentVersionNum) {
      released.push({
        ...('Component' in config && ({ Component: config.Component })),
        children: config.children.map(child => ({
          ...('index' in child && { index: true }),
          ...('path' in child && { path: child.path }),
          Component: child.Component
        }))
      })
    }
  }

  // Return all layout-wrapped routes
  return [
    {
      path: "/",
      children: released
    }
  ]
}