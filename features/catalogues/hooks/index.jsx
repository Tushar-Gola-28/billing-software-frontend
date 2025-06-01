"use client"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
export function useColumns(handleEditData, handleOpenModal, handleMenuOpenModal) {
    const router = useRouter()
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
                renderCell: (row, index) => {
                    return row?.description || "-"
                }
            },
            {
                id: "Total Menus",
                label: "Total Menus",
                renderCell: (row, index) => {
                    return row?.menuData?.length || 0
                }
            },
            {
                id: "user",
                label: "Created By",
                renderCell: (row, index) => {
                    return row?.user?.name || "-"
                }
            },
            {
                id: "updatedBy",
                label: "Updated By",
                renderCell: (row, index) => {
                    return row?.updatedBy?.name || "-"
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
                },
                sticky: true
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
                id: "Remaining",
                label: "Remaining",
                renderCell: (row) => {
                    return row.qty - row.usedQty || 0
                }
            },
            {
                id: "discount",
                label: "Discount",
                renderCell: (row) => {
                    return `Rs. ${row.discount}`
                }
            },
            {
                id: "price",
                label: "Price",
                renderCell: (row) => {
                    return `Rs. ${row.price}`
                }
            },


            {
                id: "gst_percentage",
                label: "GST Percentage",
                renderCell: (row) => {
                    return `${row.gst_percentage}%`
                }
            },
            {
                id: "total_price_with_gst",
                label: "Total Price With GST",
                renderCell: (row) => {
                    return `Rs. ${row.total_price_with_gst}`
                }
            },
            {
                id: "type",
                label: "Type",
            },
            {
                id: "note",
                label: "Note",
            },
            {
                id: "totalVariants",
                label: "Total Variants",
                renderCell: (row) => {
                    return row?.totalVariants?.length || 0
                }
            },
            {
                id: "user",
                label: "Created By",
                renderCell: (row, index) => {
                    return row?.user?.name || "-"
                }
            },
            {
                id: "updatedBy",
                label: "Updated By",
                renderCell: (row, index) => {
                    return row?.updatedBy?.name || "-"
                }
            },
            {
                id: "Status",
                label: "Status",
                renderCell: (row, index) => {
                    return <Typography sx={{ color: row?.status ? "green" : "red" }}>{row?.status ? "Active" : "In Active"}</Typography>
                },

            },
            {
                id: "Action",
                label: "Action",
                renderCell: (row, index) => {
                    return <Stack spacing={1} direction="row" justifyContent="center">

                        <Tooltip title="Edit Menu">

                            <IconButton color="primary" onClick={() => { handleEditData(row); handleMenuOpenModal() }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Variants">
                            <IconButton color="primary" onClick={() => router.push(`/catalogues/variants/${row?.menu_tracking_id}`)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Mange Add On" onClick={() => router.push(`/catalogues/add-on/${row?._id}`)}>
                            <IconButton color="primary" >
                                <RemoveRedEyeIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                },
                sticky: true
            },
        ],
    }
    return { columns }
}

export function useVariantColumn() {
    const router = useRouter()
    const columns = {
        variant: [
            {
                id: "S No.",
                label: "S No.",
                renderCell: (_, index) => {
                    return index + 1
                }
            },
            {
                id: "menu_tracking_id",
                label: "Variant Id",
            },
            {
                id: "name",
                label: "Name",
            },
            {
                id: "menu",
                label: "Menu Name",
                renderCell: (row, index) => {
                    return row?.menu?.name
                }

            },

            {
                id: "minQty",
                label: "Min Qty",
            },

            {
                id: "type",
                label: "Type",
            },
            {
                id: "note",
                label: "Note",
            },
            {
                id: "user",
                label: "Created By",
                renderCell: (row, index) => {
                    return row?.user?.name || "-"
                }
            },
            {
                id: "updatedBy",
                label: "Updated By",
                renderCell: (row, index) => {
                    return row?.updatedBy?.name || "-"
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
                    return <IconButton color="primary" onClick={() => { router.push(`/catalogues/variants/update?id=${row?._id}`) }}>
                        <EditIcon />
                    </IconButton>
                },
                sticky: true
            },
        ],
        "add-ons": [
            {
                id: "S No.",
                label: "S No.",
                renderCell: (_, index) => {
                    return index + 1
                }
            },
            {
                id: "menu_tracking_id",
                label: "Variant Id",
                renderCell: (row, index) => {
                    return row?.variants?.menu_tracking_id
                }
            },
            {
                id: "Variant Name",
                label: "Variant Name",
                renderCell: (row, index) => {
                    return row?.variants?.name
                }
            },
            {
                id: "name",
                label: "Name",
            },
            {
                id: "Primary",
                label: "Primary",
                renderCell: (row, index) => {
                    return row?.variants?.isPrimary ? "Yes" : "No"
                }
            },
            {
                id: "note",
                label: "Note",
            },
            {
                id: "user",
                label: "Created By",
                renderCell: (row, index) => {
                    return row?.user?.name || "-"
                }
            },
            {
                id: "updatedBy",
                label: "Updated By",
                renderCell: (row, index) => {
                    return row?.updatedBy?.name || "-"
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
                    return <IconButton color="primary" onClick={() => { router.push(`/catalogues/add-on/${row?.menu?._id}?type=update`) }}>
                        <EditIcon />
                    </IconButton>
                },
                sticky: true
            },
        ],
    }
    return { columns }
}
