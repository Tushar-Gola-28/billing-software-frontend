import { AddOnPage } from '@/features'
import React from 'react'

export default async function Page({ params }) {
    const { menu } = await params
    return (
        <div>
            <AddOnPage menu={menu} />
        </div>
    )
}
