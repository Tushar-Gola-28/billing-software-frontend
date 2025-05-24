"use client"
import { CustomPagination, CustomTable, Heading } from '@/components'
import { Box, Button, InputAdornment, Stack, Tab, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useColumns } from './hooks';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories, fetchAllMenus } from '@/services';
import { useEditData, useModalControl, usePagination, useReload } from '@/hooks';
import { debounce } from 'lodash';
import { CategoryModal, MenuModal } from '..';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRouter, useSearchParams } from 'next/navigation';

export function CataloguesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const [search, setSearch] = useState("")
    const { open, handleCloseModal, handleOpenModal } = useModalControl()
    const { open: isMenu, handleCloseModal: handleMenuCloseModal, handleOpenModal: handleMenuOpenModal } = useModalControl()
    const { editData, handleEditData } = useEditData()
    const { columns } = useColumns(handleEditData, handleOpenModal,handleMenuOpenModal)
    const [value, setValue] = useState();


    const data = useQuery({
        queryKey: ["categories", page, page_size, search],
        queryFn: ({ signal }) => fetchAllCategories(signal, page, page_size, search),
        staleTime: 5 * 60 * 1000,
        enabled: value == "categories"
    })
    const menuData = useQuery({
        queryKey: ["categories", page, page_size, search],
        queryFn: ({ signal }) => fetchAllMenus(signal, page, page_size, search),
        staleTime: 5 * 60 * 1000,
        enabled: value == "menu"
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
        const params = new URLSearchParams(searchParams);
        params.set('tab', newValue);
        router.push(`?${params.toString()}`);
        if (newValue == "categories") {
            data.refetch()
        } else {
            menuData.refetch()
        }
    };
    useEffect(() => {
        if (data?.data) {
            setTotalPages(data?.data?.totalPages)
            setTotal_records(data?.data?.total_records)
        }
    }, [data?.data])
    useEffect(() => {
        if (menuData?.data) {
            setTotalPages(menuData?.data?.totalPages)
            setTotal_records(menuData?.data?.total_records)
        }
    }, [menuData?.data])

    const handleSearch = debounce((e) => {
        setPage(0)
        setSearch(e.target.value)
    }, 600)
    useEffect(() => {
        const tab = searchParams.get('tab') || "categories";
        setValue(tab);
    }, [searchParams]);

    return (
        <div>
            <Stack direction='row' justifyContent="space-between" mt={1}>
                <Heading title="Catalogues" icon="http://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/add_drinks.svg" />
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
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal}>Create Category</Button>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleMenuOpenModal}>Create Menu</Button>
                </Stack>
            </Stack>
            <Stack >
                <TabContext value={value || "categories"} >
                    <Stack direction="row">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2, background: "white", borderRadius: "6px" }}>
                            <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="lab API tabs example">
                                <Tab label="Categories" value="categories" sx={{ textTransform: "inherit" }} />
                                <Tab label="Menus" value="menu" sx={{ textTransform: "inherit" }} />
                            </TabList>
                        </Box>
                    </Stack>
                    <TabPanel value="categories" sx={{ padding: "20px 0" }}>
                        <CustomTable columns={columns[value]} rows={data?.data?._payload || []} loading={data.isLoading} empty='No catalogue found!' />
                        {data?.data?._payload?.length ? <CustomPagination page={page} page_size={page_size} total_records={total_records} setPage={setPage} totalPages={totalPages} handlePageSize={handlePageSize} /> : null}

                    </TabPanel>
                    <TabPanel value="menu" sx={{ padding: "20px 0" }}>
                        <CustomTable columns={columns[value]} rows={menuData?.data?._payload || []} loading={menuData.isLoading} empty='No Menu found!' />
                        {menuData?.data?._payload?.length ? <CustomPagination page={page} page_size={page_size} total_records={total_records} setPage={setPage} totalPages={totalPages} handlePageSize={handlePageSize} /> : null}
                    </TabPanel>
                </TabContext>
            </Stack>
            {open && <CategoryModal open={open} close={() => { handleCloseModal(); handleEditData(null) }} handleReload={() => data.refetch()} editData={editData} />}
            {isMenu && <MenuModal open={isMenu} close={() => { handleMenuCloseModal(); handleEditData(null) }} handleReload={() => menuData.refetch()} editData={editData} />}
        </div>
    )
}
