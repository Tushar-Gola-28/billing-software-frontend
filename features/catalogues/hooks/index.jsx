import { IconButton, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
export function useColumns() {
    const columns = [
        {
            id: "S No.",
            label: "S No.",
            renderCell: (_, index) => {
                return index + 1
            }
        },
        {
            id: "code",
            label: "Code",
        },
        {
            id: "name",
            label: "Name",
        },
        {
            id: "description",
            label: "Description",
        },
        {
            id: "Total Menus",
            label: "Total Menus",
            renderCell: (_, index) => {
                return index + 1
            }
        },
        {
            id: "Status",
            label: "Status",
            renderCell: (row, index) => {
                return <Typography sx={{ color: row?.status ? "green" : "red" }}>{row?.status ? "Active" : "In Active"}</Typography>
            }
        },
        {
            id: "Action",
            label: "Action",
            renderCell: (_, index) => {
                return <IconButton color="primary">
                    <EditIcon />
                </IconButton>
            }
        },
    ]
    return { columns }
}
