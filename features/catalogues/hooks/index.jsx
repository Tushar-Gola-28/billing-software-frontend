import { IconButton, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
export function useColumns(handleEditData, handleOpenModal) {
    const columns = {
        categories: [
            {
                id: "S No.",
                label: "S No.",
                renderCell: (_, index) => {
                    return index + 1
                }
            },
            {
                id: "handle",
                label: "Category Id",
            },
            {
                id: "name",
                label: "Name",
            },
            {
                id: "code",
                label: "Code",
            },
            {
                id: "description",
                label: "Description",
            },
            {
                id: "Total Menus",
                label: "Total Menus",
                renderCell: (row, index) => {
                    return row?.menuData?.length || 0
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
                renderCell: (row, index) => {
                    return <IconButton color="primary" onClick={() => { handleEditData(row); handleOpenModal() }}>
                        <EditIcon />
                    </IconButton>
                }
            },
        ],
        menu: [
            {
                id: "S No.",
                label: "S No.",
                renderCell: (_, index) => {
                    return index + 1
                }
            },

            {
                id: "handle",
                label: "Menu Id",
            },
            {
                id: "category",
                label: "Category Name",
                renderCell: (row, index) => {
                    return row?.category?.name || "-"
                }

            },
            {
                id: "name",
                label: "Name",
            },
            {
                id: "code",
                label: "Code",
            },
            {
                id: "qty",
                label: "Quantity",
            },
            {
                id: "price",
                label: "Price",
            },
            {
                id: "discount",
                label: "Discount",
            },
            {
                id: "type",
                label: "Type",
            },
            {
                id: "gst_percentage",
                label: "GST Percentage",
            },
            {
                id: "total_price_with_gst",
                label: "Total Price With GST",
            },
            {
                id: "note",
                label: "Note",
            },
            {
                id: "Total Menus",
                label: "Total Menus",
                renderCell: (row, index) => {
                    return row?.menuData?.length || 0
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
                renderCell: (row, index) => {
                    return <IconButton color="primary" onClick={() => { handleEditData(row); handleOpenModal() }}>
                        <EditIcon />
                    </IconButton>
                }
            },
        ],
    }
    return { columns }
}
