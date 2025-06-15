"use client"
import { Heading } from '@/components'
import { Box, Button, Grid, InputAdornment, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { a11yProps } from '@/functions';
import { useQuery } from '@tanstack/react-query';
import { fetchAllActiveCategoriesAndMenus } from '@/services';

export function PosPage() {
    const [allData, setAllData] = useState([])
    const [categoryMenuData, setCategoryMenuData] = useState([])
    const [items, setItems] = useState([])
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [value1, setValue1] = useState(0);

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };
    const [value2, setValue2] = useState(0);

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };
    const handleSearch = () => {

    }
    const handleItems = (data) => {
        setItems((prev) => {
            return [{ ...data, qty: 1 }, ...prev]
        })
    }

    const data = useQuery({
        queryKey: ["fetchAllActiveCategoriesAndMenus"],
        queryFn: ({ signal }) => fetchAllActiveCategoriesAndMenus(signal)
    })
    useEffect(() => {
        if (data.data) {
            setAllData(data.data?._payload || [])
        }
    }, [data.data])

    return (
        <div>

            <Grid container spacing={1}>
                <Grid size={{ md: 6 }}>
                    <Stack direction='row' justifyContent="space-between" mt={1}>
                        <Heading title="Items Billing" icon="http://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/add_drinks.svg" />
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
                        <Stack sx={{ flex: 1 }}>
                            <Paper>
                                <Grid container spacing={1}>
                                    {
                                        categoryMenuData?.map((it) => {
                                            return (
                                                <Grid size={{ md: 3 }} key={it._id}>
                                                    <Box sx={{ padding: "10px", textAlign: "center", border: 1, borderColor: "divider", borderRadius: "6px", cursor: "pointer" }} onClick={()=>handleItems(it)}>
                                                        <Typography>{it.name}</Typography>
                                                        <Typography variant="caption" fontSize="12px">Rs.{it.price}</Typography>
                                                    </Box>
                                                </Grid>
                                            )
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
                                {["Dine In", "Delivery", "Pick Up"].map((item, index) => (
                                    <Tab
                                        key={index}
                                        label={item}
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
                                    12
                                </Typography>
                            </Stack>
                        </Stack>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', mt: 1 }}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1 }}>
                                    Items | Check Items
                                </Typography>
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1, textAlign: "center" }}>
                                    Qty
                                </Typography>
                                <Typography variant="h5" fontSize="15px" sx={{ flex: 1, textAlign: "right" }}>
                                    Price
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', mt: 1, height: "250px", overflowY: "scroll", scrollbarWidth: "none", scrollBehavior: "smooth" }}>
                            <Stack spacing={1}>
                                {/* <Typography variant="h5" textAlign="center" mt={10}>No Item Selected...</Typography> */}
                                <Stack direction="row" justifyContent="space-between" mt={1} >
                                    <Typography variant="h5" fontSize="14px" sx={{ flex: 1, color: "grey" }}>
                                        Pav Bhaji
                                    </Typography>
                                    <Typography variant="h5" fontSize="14px" sx={{ flex: 1, textAlign: "center", color: "grey" }}>
                                        1
                                    </Typography>
                                    <Typography variant="h5" fontSize="14px" sx={{ flex: 1, textAlign: "right", color: "grey" }}>
                                        100
                                    </Typography>
                                </Stack>

                            </Stack>
                        </Box>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', mt: 1, }}>
                            <Stack direction="row" alignItems="start">
                                <Stack sx={{ width: "65%" }}>
                                    <Tabs value={value1} onChange={handleChange1} variant="scrollable"
                                        scrollButtons="auto" aria-label="basic tabs example" >
                                        {["Cash", "Card", "UPI", "Others", "UPI"].map((item, index) => (
                                            <Tab
                                                sx={{ padding: "0" }}
                                                key={index}
                                                label={item}
                                            />
                                        ))}
                                    </Tabs>
                                </Stack>
                                <Stack ml={2} sx={{ width: "35%", borderLeft: 1, borderColor: 'divider', pl: 2 }} spacing={1}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="13px">CGST</Typography>
                                        <Typography variant="h5" fontSize="13px">Rs.1000</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="13px">SGST</Typography>
                                        <Typography variant="h5" fontSize="13px">Rs.1000</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="13px">Discount</Typography>
                                        <Typography variant="h5" fontSize="13px">Rs.20</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography variant="h5" fontSize="14px" fontWeight='bold'>Total Bill</Typography>
                                        <Typography variant="h5" fontWeight='bold' sx={{ color: "primary.main" }} fontSize="14px">Rs.1000</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box sx={{ padding: "10px", borderTop: 1, borderColor: 'divider', mt: 1, }}>
                            <Stack direction="row" gap="20px">
                                <Button variant="contained">
                                    Save
                                </Button>
                                <Button variant="contained">
                                    Save & Print
                                </Button>
                                <Button variant="outlined">
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
