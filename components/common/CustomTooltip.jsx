import { Fade, Tooltip } from '@mui/material'
export function CustomTooltip({ children, title }) {
    return (
        <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={title}
        >
            {children}
        </Tooltip>
    )
}
