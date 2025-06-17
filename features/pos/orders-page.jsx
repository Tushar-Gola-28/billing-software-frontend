"use client"
import { Heading, notify } from '@/components'
import { Button, Grid, IconButton, InputAdornment, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchGetAllOrders, fetchNextBillNo } from '@/services';
import { usePagination } from '@/hooks';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SaveIcon from '@mui/icons-material/Save';
import dayjs from 'dayjs';
export function OrdersPage() {
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const [search, setSearch] = useState("")
    const router = useRouter()
    const handleSearch = debounce((e) => {
        setSearch(e.target.value)
    }, 600)

    const mutation = useMutation({
        mutationFn: (data) => {
            return fetchNextBillNo()
        },
    })
    const handleButton = () => {
        mutation.mutate({}, {
            onSuccess: (response) => {
                console.log(response);
                if (response?.bill_no) {
                    router.push(`/pos/order-create/${response?.bill_no}`)
                } else {
                    notify("Something went wrong.")
                }

            }
        })
    }
    const [orders, setOrders] = useState([])
    const data = useQuery({
        queryKey: ["fetchGetAllOrders", search, page],
        queryFn: ({ signal }) => fetchGetAllOrders(signal, search, page, 30)
    })
    useEffect(() => {
        if (data?.data) {
            setTotalPages(data?.data?.totalPages)
            setTotal_records(data?.data?.total_records)
            setOrders(data?.data?._payload)
        }
    }, [data?.data])

    return (
        <div>
            <Stack direction='row' justifyContent="space-between" mt={1}>
                <Heading title="Orders" icon="http://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/add_drinks.svg" />
            </Stack>
            <Stack direction='row' justifyContent="space-between" mt={2} alignItems="center">
                <TextField fullWidth placeholder='Search...'
                    sx={{ maxWidth: "300px", background: "white" }}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "primary.main" }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Stack direction="row" gap="10px">
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleButton} >Create Order</Button>
                </Stack>
            </Stack>
            <Stack sx={{ width: "100%", mt: 2 }}>
                <Grid container spacing={1}>
                    {
                        orders?.map((it) => {
                            return (
                                <Grid size={{ lg: 4 }} key={it._id}>
                                    <Paper sx={{ border: 1, borderColor: "divider", padding: "10px", width: "100%", height: "100%" }}>
                                        <Stack direction="row" justifyContent="flex-end" gap="10px">
                                            {it.bill_status != "PAID" && <Tooltip title="Edit Bill">
                                                <IconButton color="primary" onClick={() => router.push(`/pos/order-create/${it.bill_no}/${it.order_id}`)}>
                                                    <SaveAsIcon />
                                                </IconButton>
                                            </Tooltip>}
                                            {it.bill_status != "PAID" && <Tooltip title="Settle">
                                                <IconButton color="primary">
                                                    <SaveIcon />
                                                </IconButton>
                                            </Tooltip>}
                                        </Stack>
                                        <Stack spacing={1}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Order Id</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", }}>{it.order_id}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Bill No</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", }}>{it.bill_no / 4}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Customer Info</Typography>
                                                <Typography variant="body1">No Data Added</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Sell By</Typography>
                                                <Typography variant="body1">{it?.sell_by}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Total Bill</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold" }}>₹{it?.total_amount}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Total Discount</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", fontWeight: "bold" }}>₹{it?.total_discount}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Total Items</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", }}>{it?.total_items}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Bill Status</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", }}>{it?.bill_status}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Payment Mode</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", }}>{it?.payment_mode}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Tax Type</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", }}>{it?.tax_type}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">Created At</Typography>
                                                <Typography variant="body1" sx={{ color: "primary.main", }}>{dayjs(it?.createdAt).format("DD/MM/YYYY hh:mm A    ")}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            )
                        })
                    }


                </Grid>
            </Stack>
        </div >
    )
}
