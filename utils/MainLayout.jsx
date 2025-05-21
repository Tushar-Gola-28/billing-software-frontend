"use client"
import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from '@/components'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
    experimental: {
        prefetchInRender: true,
    }
})
export default function MainLayout({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
