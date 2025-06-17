"use client"
import { Heading, notify } from '@/components'
import { Box, Button, Grid, IconButton, InputAdornment, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { a11yProps, getTotalMenuGST } from '@/functions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, fetchAllActiveCategoriesAndMenus, fetchGetAllOrdersByOrderId, updateOrder } from '@/services';
import RemoveIcon from '@mui/icons-material/Remove';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
export function PosPage({ bill_no, order_id }) {
    const router = useRouter()
    const [allData, setAllData] = useState([])
    const [search, setSearch] = useState("")
    const [categoryMenuData, setCategoryMenuData] = useState([])
    const [items, setItems] = useState([])
    const [value, setValue] = useState("dine-in");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [value1, setValue1] = useState("No Payment");

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };
    const [value2, setValue2] = useState(0);

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };
    const handleSearch = debounce((e) => {
        setSearch(e.target.value)
    }, 600)
    const handleItems = (data) => {
        setItems((prev) => {
            if (prev.some((it) => it._id == data._id)) {
                return prev
            }
            return [{ ...data, qty: 1 }, ...prev]
        })
    }
    const handleItemsQty = (index, type) => {
        setItems((prev) => {
            let update = [...prev]
            if (type == "add") {
                update[index].qty += 1
            } else {
                update[index].qty -= 1

            }
            return update
        })
    }

    const data = useQuery({
        queryKey: ["fetchAllActiveCategoriesAndMenus", search],
        queryFn: ({ signal }) => fetchAllActiveCategoriesAndMenus(signal, search)
    })
    const orderDetails = useQuery({
        queryKey: ["fetchGetAllOrdersByOrderId", search],
        queryFn: ({ signal }) => fetchGetAllOrdersByOrderId(signal, order_id),
        enabled: !!order_id
    })
    useEffect(() => {
        if (data.data) {
            setAllData(data.data?._payload || [])
            setCategoryMenuData(data.data?._payload[0]?.menus || [])
        }
    }, [data.data])

    const mutation = useMutation({
        mutationFn: (data) => {
            return createOrder(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: (data) => {
            return updateOrder(data, order_id)
        },
    })
    const handleStoreData = (type) => {
        const data = {
            "items": items.map((it) => ({ menu_id: it._id, selected_qty: it.qty })),
            "payment_mode": value1,
            "sell_by": value,
            "note": "note",
            "customer": "", // optional
            "payment_type": type,
            bill_no: bill_no
        }
        if (order_id) {
            updateMutation.mutate({ ...data, order_id }, {
                onSuccess: (response) => {
                    console.log(response);
                    if (response) {
                        notify("Order Update Successfully.", "success")
                        router.push("/pos")

                    }
                }
            })
        } else {
            mutation.mutate(data, {
                onSuccess: (response) => {
                    console.log(response);
                    if (response) {
                        notify("Order Created Successfully.", "success")
                        router.push("/pos")

                    }
                }
            })
        }
    }

    useEffect(() => {
        if (order_id) {
            if (orderDetails.data?._payload) {
                const { items, payment_mode, sell_by } = orderDetails.data?._payload
                setItems(items.map((it) => ({ ...it, _id: it.menu_id, qty: it.selected_qty, status: true })))
                setValue1(payment_mode)
                setValue(sell_by)
            }

        }
    }, [orderDetails.data])



    return (
        <div>

            <Grid container spacing={1}>
                <Grid size={{ md: 6 }}>
                    <Stack direction='row' justifyContent="space-between" mt={1}>
                        <Heading title="Items Billing" icon="http://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/add_drinks.svg" />
                    </Stack>
                    <Stack direction='row' justifyContent="space-between" mt={2} alignItems="center">
                        <TextField fullWidth placeholder='Search...'
                            sx={{ background: "white" }}
                            onChange={handleSearch}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "primary.main" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>

                    <Stack direction="row" mt={2} gap="20px">
                        <Stack sx={{ background: "white", height: "70vh", width: "150px" }}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value2}
                                onChange={handleChange2}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider', borderRadius: "6px" }}
                            >
                                {
                                    allData?.map((it) => {
                                        return (
                                            <Tab label={it?.name} {...a11yProps(0)} key={it._id} sx={{ textTransform: "inherit" }} onClick={() => setCategoryMenuData(it.menus)} />
                                        )
                                    })
                                }

                            </Tabs>
                        </Stack>
                        <Stack sx={{ flex: 1, }}>
                            <Paper sx={{ height: "70vh", overflowY: "auto", width: "100%" }}>
                                <Grid container spacing={1}>
                                    {
                                        categoryMenuData?.map((it) => {
                                            const actualPrice = it.price;
                                            const discountedPrice = it.price - it.discount;

                                            return (
                                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={it._id}>
                                                    <Box
                                                        sx={{
                                                            padding: "10px",
                                                            textAlign: "center",
                                                            border: 1,
                                                            borderColor: "divider",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            width: "100%"
                                                        }}
                                                        onClick={() => handleItems(it)}
                                                    >
                                                        <Typography variant="body1">{it.name}</Typography>

                                                        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                                                            {it.discount > 0 && (
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{ textDecoration: "line-through", color: "red" }}
                                                                >
                                                                    ₹{actualPrice}
                                                                </Typography>
                                                            )}
                                                            <Typography variant="caption" fontWeight="bold" sx={{ color: "primary.main" }} fontSize="12px">
                                                                ₹{discountedPrice}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            );
                                        })
                                    }


                                </Grid>
                            </Paper>
                        </Stack>
                    </Stack>

                </Grid>
                <Grid size={{ md: 6 }}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                                {[{ label: "Dine In", value: "dine-in" }, { label: "Delivery", value: "delivery" }, { label: "Pick Up", value: "pick-up" }].map((item, index) => (
                                    <Tab
                                        key={index}
                                        label={item.label}
                                        value={item.value}
                                        sx={{ textTransform: "inherit" }}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        <Stack direction="row" justifyContent="flex-end">
                            <Stack textAlign="center" sx={{ padding: "5px 20px", border: 1, borderColor: 'divider', mt: 1, borderRadius: "6px" }}>
                                <Typography variant="body2">
                                    Bill No
                                </Typography>
                                <Typography variant="subtitle2">
                                    {bill_no}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', mt: 1 }}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1, color: "primary.main" }}>
                                    Check Items
                                </Typography>
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1, textAlign: "start", color: "primary.main" }}>
                                    Type
                                </Typography>
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1, textAlign: "center", color: "primary.main" }}>
                                    Qty
                                </Typography>
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1, textAlign: "right", color: "primary.main" }}>
                                    Discount
                                </Typography>
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1, textAlign: "right", color: "primary.main" }}>
                                    Price
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', height: "250px", overflowY: "scroll", scrollbarWidth: "none", scrollBehavior: "smooth" }}>
                            <Stack spacing={1}>

                                {
                                    items?.map((it, index) => {
                                        return (
                                            <Stack direction="row" justifyContent="space-between" mt={1} key={it._id} >
                                                <Typography variant="h5" fontSize="14px" sx={{ flex: 1, color: "grey" }}>
                                                    {it.name}
                                                </Typography>
                                                <Typography variant="h5" fontSize="14px" sx={{ flex: 1, color: "grey", textAlign: "start" }}>
                                                    {it.type == "non-veg" ? "Non Veg" : "Veg"}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", border: 1, borderColor: "primary.main", borderRadius: "6px", gap: "5px", flex: 1, }}>

                                                    <IconButton sx={{ padding: "5px" }} color="primary" onClick={() => handleItemsQty(index, "sub")}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography variant="h5" fontSize="14px" sx={{ flex: 1, textAlign: "center", color: "grey" }}>
                                                        {it.qty}
                                                    </Typography>
                                                    <IconButton sx={{ padding: "5px" }} color="primary" onClick={() => handleItemsQty(index, "add")}>
                                                        <AddIcon />
                                                    </IconButton>

                                                </Box>
                                                <Typography variant="h5" fontSize="14px" sx={{ flex: 1, textAlign: "right", color: "grey" }}>
                                                    ₹{it.qty * (it.discount)}
                                                </Typography>
                                                <Typography variant="h5" fontSize="14px" sx={{ flex: 1, textAlign: "right", color: "primary.main" }} fontWeight="bold">
                                                    ₹{it.qty * (it.price - it.discount)}
                                                </Typography>

                                            </Stack>
                                        )
                                    })
                                }

                            </Stack>
                        </Box>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', mt: 1, }}>
                            <Stack direction="row" alignItems="start">
                                <Stack sx={{ width: "65%" }}>
                                    <Tabs value={value1} onChange={handleChange1} variant="scrollable"
                                        scrollButtons="auto" aria-label="basic tabs example" >
                                        {["Cash", "Card", "UPI", "Others", "No Payment"].map((item, index) => (
                                            <Tab
                                                sx={{ padding: "0" }}
                                                key={index}
                                                value={item}
                                                label={item}
                                            />
                                        ))}
                                    </Tabs>
                                </Stack>
                                <Stack ml={2} sx={{ width: "35%", borderLeft: 1, borderColor: 'divider', pl: 2 }} spacing={1}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="13px">CGST</Typography>
                                        <Typography variant="h5" fontSize="13px">	₹{getTotalMenuGST(items).totalCGST}</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="13px">SGST</Typography>
                                        <Typography variant="h5" fontSize="13px">	₹{getTotalMenuGST(items).totalSGST}</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="13px">Discount</Typography>
                                        <Typography variant="h5" fontSize="13px">	₹{getTotalMenuGST(items).totalDiscount}</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="14px" fontWeight='bold'>Total Bill</Typography>
                                        <Typography variant="h5" fontWeight='bold' sx={{ color: "primary.main" }} fontSize="14px">₹{getTotalMenuGST(items).totalPrice}</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', mt: 1, }}>
                            <Stack direction="row" gap="20px">
                                <Button variant="contained" onClick={() => handleStoreData("save")}>
                                    Save
                                </Button>
                                <Button variant="contained" onClick={() => handleStoreData("save")}>
                                    Save & Print
                                </Button>
                                <Button variant="outlined" onClick={() => handleStoreData("draft")}>
                                    Draft
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}
