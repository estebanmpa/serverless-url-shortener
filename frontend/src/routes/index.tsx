import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

const homePage = lazy(() => import('@/pages/HomePage'))

export const Route = createFileRoute('/')({
  component: homePage,
})
