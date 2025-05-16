"use client"
import React from 'react'
import { Button, Typography } from '@mui/material'
import { CustomModal } from '..'

export default function LogoutModal({ open, close }) {
    const handeSubmit = () => {
        localStorage.clear()
        window.location.replace('/login')
    }
    return (
        <div>
            <CustomModal size="xs" open={open} close={close} heading="Logout" action={<Button onClick={handeSubmit} variant="contained" color="error">Confirm</Button>}>
                <Typography variant="subtitle1">Are you sure you want to logout.</Typography>
            </CustomModal>
        </div>
    )
}
