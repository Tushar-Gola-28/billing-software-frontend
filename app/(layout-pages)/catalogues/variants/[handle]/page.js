import { VariantPage } from '@/features'
import React from 'react'

export default async function Page({ params, searchParams }) {
    const { handle } = await params
    const { id } = await searchParams
    const menu_tracking_id = handle

    return (
        <div>
            <VariantPage menu_tracking_id={menu_tracking_id} id={id} />
        </div>
    )
}
