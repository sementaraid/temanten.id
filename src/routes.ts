import { distVersion } from "../app.config"

import Home from '@/pages/home'
import MartaSunar from '@/pages/marta-sunar'
import NotFound from "@/pages/not-found"
import type { RouteObject } from "react-router"


const routeReleasedByVersion = {
  '1766308273810': [
    {
      name: '/',
      page: Home,
    },
  ],
  '1766308273811': [
    {
      name: '/marta-sunar',
      page: MartaSunar,
    },
  ],
  '1766308273812': [
    {
      name: '*',
      page: NotFound
    }
  ]
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