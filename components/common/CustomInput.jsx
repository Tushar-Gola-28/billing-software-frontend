"use client"
import React, { memo } from 'react'
import { FormLabel, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const CustomInput = memo(({ label, required, input, size }) => {
    return (
        <FormGrid size={size || { xs: 12, md: 6 }}>
            <Stack spacing={.4}>
                <FormLabel htmlFor={label} error={required} required={required} sx={{ display: "flex" }}>
                    <Typography variant="body2" >{label}</Typography>
                </FormLabel>
                {input}
            </Stack>
        </FormGrid>
    )
})
export { CustomInput }
