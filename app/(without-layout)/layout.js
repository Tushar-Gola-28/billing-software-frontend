import { MainLayout } from '@/components'
import React from 'react'

export default function Layout({ children }) {
    return (
        <div>
            <MainLayout slide={false} header={true}>
                {children}
            </MainLayout>
        </div>
    )
}
