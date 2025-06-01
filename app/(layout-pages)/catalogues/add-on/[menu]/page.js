import { AddOnPage } from '@/features'
import React from 'react'

export default async function Page({ params, searchParams }) {
    const { menu } = await params
    const { type } = await searchParams

    return (
        <div>
            <AddOnPage menu={menu} type={type} />
        </div>
    )
}
