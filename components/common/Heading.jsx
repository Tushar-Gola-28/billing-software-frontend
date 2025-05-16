import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export function Heading({ title, icon }) {
    return (
        <div>
            <Stack direction="row" gap="10px" alignItems="center" >
                {typeof icon == "string" ?
                    <Image
                        src={icon}
                        width={25}
                        height={25}
                        alt='Catalogues Icon'
                        style={{
                            filter: 'brightness(0) saturate(100%) invert(10%) sepia(48%) saturate(6595%) hue-rotate(246deg) brightness(104%) contrast(94%)'
                        }}
                    /> :
                    icon
                }
                <Typography variant="h4" sx={{ color: "primary.main", fontSize: "22px" }}>
                    {title}
                </Typography>
            </Stack>
        </div>
    )
}
