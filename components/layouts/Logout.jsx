"use client"
import React from 'react'
import { Button, Typography } from '@mui/material'
import { CustomModal, LoadingScreen, notify } from '..'
import { useMutation } from '@tanstack/react-query'
import { logoutVendor } from '@/services'
import { useRouter } from 'next/navigation'

export default function LogoutModal({ open, close }) {
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: () => {
            return logoutVendor()
        },
    })
    const handleSubmit = () => {
        mutation.mutate({}, {
            onSuccess: (response) => {
                console.log(response);
                notify("Logout Successfully.", "success")
                router.replace("/login")

            }
        })
    }

    return (
        <CustomModal size="xs" open={open} close={close} heading="Logout" action={<Button onClick={handleSubmit} loading={mutation.isPending} disabled={mutation.isPending} variant="contained" color="error">Confirm</Button>}>
            <Typography variant="subtitle1">Are you sure you want to logout.</Typography>
        </CustomModal>
    )
}
