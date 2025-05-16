import { Heading } from '@/components'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
export function CataloguesPage() {
    return (
        <div>
            <Stack direction='row' justifyContent="space-between" mt={1}>
                <Heading title="Catalogues" icon="http://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/add_drinks.svg" />
                <Stack direction="row" gap="10px">
                    <Button variant="contained" startIcon={<AddIcon />}>Create Category</Button>
                    <Button variant="contained" startIcon={<AddIcon />}>Create Menu</Button>
                </Stack>
            </Stack>
        </div>
    )
}
