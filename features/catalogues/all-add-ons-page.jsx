"use client"
import { CustomPagination, CustomTable, Heading } from '@/components'
import { Button, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import { usePagination } from '@/hooks';
import { useVariantColumn } from '..';
import { useQuery } from '@tanstack/react-query';
import { fetchAllAddons, fetchAllVariants } from '@/services';

export function AllAddOnsPage() {
    const router = useRouter()
    const { columns } = useVariantColumn()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const [search, setSearch] = useState("")

    const handleSearch = debounce((e) => {
        setPage(0)
        setSearch(e.target.value)
    }, 600)
    const addOns = useQuery({
        queryKey: ["add-ons", page, page_size, search],
        queryFn: ({ signal }) => fetchAllAddons(signal, page, page_size, search)
    })
    useEffect(() => {
        if (addOns?.data) {
            setTotalPages(addOns?.data?.totalPages)
            setTotal_records(addOns?.data?.total_records)
        }
    }, [addOns?.data])

    return (
        <div>
            <Stack direction='row' justifyContent="space-between" mt={1}>
                <Heading title="Add-Ons" icon="http://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/add_drinks.svg" />
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
                {/* <Stack direction="row" gap="10px">
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push("/catalogues/variants/create")}>Create Variant</Button>
                </Stack> */}
            </Stack>
            <Stack mt={2}>
                <CustomTable columns={columns["add-ons"]} rows={addOns?.data?._payload || []} loading={addOns.isLoading} empty='No Menu found!' />
                {addOns?.data?._payload?.length ? <CustomPagination page={page} page_size={page_size} total_records={total_records} setPage={setPage} totalPages={totalPages} handlePageSize={handlePageSize} /> : null}
            </Stack>
        </div>
    )
}
