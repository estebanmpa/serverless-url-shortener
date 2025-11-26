import { Route, RootRoute } from '@tanstack/react-router'
import App from './App'
import Home from './pages/HomePage'

// Root route
const rootRoute = new RootRoute({
  component: App,
})

// Home route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Create the route tree
export const routeTree = rootRoute.addChildren([indexRoute])



