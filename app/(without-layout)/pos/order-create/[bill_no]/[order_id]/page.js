import { PosPage } from '@/features'
import React from 'react'

export default async function Page({ params }) {
    const data = await params
    return (
        <div>
            <PosPage bill_no={data?.bill_no} order_id={data?.order_id} />
        </div>
    )
}
