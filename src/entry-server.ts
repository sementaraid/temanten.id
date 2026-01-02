// src/server.tsx - Server-side rendering entry point
import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider
} from 'react-router'
import { createElement } from 'react'
import { getReleasedRoutes } from '@/routes'

/**
 * Options for rendering the app on the server
 */
interface RenderAppOptions {
  /** The current URL being requested */
  url: string
}

/**
 * Result from server-side rendering
 */
interface RenderResult {
  /** HTML string of the rendered app */
  markup: string
  helmetContext: Record<string, any>
  /** Redirect information if needed */
  redirect?: {
    status: number
    location: string | null
  }
}

/**
 * Renders the React app on the server
 * 
 * @param options - Configuration for rendering
 * @returns Rendered HTML and optional redirect info
 * 
 * @example
 * const result = await renderApp({
 *   url: '/dashboard',
 *   authState: { isLoggedIn: true, user: { id: '1', name: 'John', email: 'john@example.com' } }
 * })
 */
export async function renderApp(options: RenderAppOptions): Promise<RenderResult> {
  const helmetContext = {}
  const { url } = options

  try {
    // 1. Get all available routes
    const routes = getReleasedRoutes()
    const handler = createStaticHandler(routes)

    // 2. Create a Request object for the requested URL
    const request = new Request(new URL(url, 'http://localhost'), {
      method: 'GET',
    })

    // 3. Query the handler to find matching route and execute loaders
    const context = await handler.query(request)

    // 4. Handle redirects from loaders or route rules
    if (context instanceof Response) {
      return {
        markup: '',
        helmetContext,
        redirect: {
          status: context.status,
          location: context.headers.get('location'),
        },
      }
    }

    // 5. Create static router with matched context
    const staticRouter = createStaticRouter(handler.dataRoutes, context)

    // 6. Render app to HTML string with providers
    //    - AuthProvider supplies auth state to the entire app
    //    - HelmetProvider collects meta tags (title, meta, link)
    //    - StaticRouterProvider provides router context
    const markup = renderToString(
      createElement(
        HelmetProvider,
        { context: helmetContext },
        createElement(StaticRouterProvider, {
          router: staticRouter,
          context: context,
        })
      )
    )

    return { markup, helmetContext }
  } catch (error) {
    console.error('SSR render error:', error)
    throw error
  }
}