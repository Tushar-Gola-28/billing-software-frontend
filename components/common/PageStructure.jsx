"use client"
import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from 'next/navigation';
export function PageStructure({ title, children, navigate, noIcon, headerStyle, content }) {
    const router = useRouter()
    return (
        <Paper sx={{ padding: { xs: "10px", sm: "20px 20px" }, mt: 2 }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack spacing={2} direction="row" marginBottom="15px" >

                    {!noIcon && <Box
                        component="img"
                        alt="icon"
                        height="25px"
                        width="25px"
                        src={"/images/icons/back.svg"}

                        onClick={() => navigate ? router.push(navigate) : router.back()}
                        style={{ cursor: 'pointer' }}
                    />}
                    <Stack spacing={1} width="100%">
                        <Stack direction="row" sx={headerStyle} marginBottom="10px">
                            <Typography color="primary" variant="h4" sx={{ color: "primary.main" }}>
                                {title}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                {
                    content
                }
            </Stack>
            <Box sx={{ paddingLeft: { md: "40px" } }}>
                {children}
            </Box>
        </Paper>
    )
}
