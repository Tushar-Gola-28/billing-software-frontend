import { MainLayout } from '@/components'
import React from 'react'

export default function Layout({ children }) {
    return (
        <div>
            <MainLayout slide={true} header={true}>
                {children}
            </MainLayout>
        </div>
    )
}
