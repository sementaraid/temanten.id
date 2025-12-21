import { distVersion } from "../app.config"

import Home from '@/pages/home'
import MartaSunar from '@/pages/marta-sunar'
import type { RouteObject } from "react-router"


const routeReleasedByVersion = {
  '1734792000000': [
    {
      name: '/',
      page: Home,
    },
  ],
  '1734877200000': [
    {
      name: '/marta-sunar',
      page: MartaSunar,
    },
  ],
}

export const getReleasedRoutes = (): RouteObject[] => {
  const released: RouteObject[] = []
  
  // Convert distVersion to number for comparison
  const currentVersionNum = parseInt(distVersion)
  
  // Iterate through all versions in order
  for (const [versionKey, routes] of Object.entries(routeReleasedByVersion)) {
    const versionNum = parseInt(versionKey)
    
    // If version is <= current dist version, include those routes
    if (versionNum <= currentVersionNum) {
      for (const route of routes) {
        released.push({
          path: route.name,
          Component: route.page
        })
      }
    }
  }
  
  return released
}