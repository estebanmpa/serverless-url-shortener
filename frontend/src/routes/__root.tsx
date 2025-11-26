import { createRootRoute } from "@tanstack/react-router";
import { lazy } from "react";

const goToUrlPage = lazy(() => import('@/pages/GoToUrlPage'))

export const Route = createRootRoute({
    notFoundComponent: goToUrlPage
});