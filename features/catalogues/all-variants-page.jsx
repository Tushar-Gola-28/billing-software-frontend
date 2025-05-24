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
import { fetchAllVariants } from '@/services';

export function AllVariantsPage() {
    const router = useRouter()
    const { columns } = useVariantColumn()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const [search, setSearch] = useState("")

    const handleSearch = debounce((e) => {
        setPage(0)
        setSearch(e.target.value)
    }, 600)
    const variants = useQuery({
        queryKey: ["variants", page, page_size, search],
        queryFn: ({ signal }) => fetchAllVariants(signal, page, page_size, search)
    })
    useEffect(() => {
        if (variants?.data) {
            setTotalPages(variants?.data?.totalPages)
            setTotal_records(variants?.data?.total_records)
        }
    }, [variants?.data])

    return (
        <div>
            <Stack direction='row' justifyContent="space-between" mt={1}>
                <Heading title="Variants" icon="http://ticketsque-public.s3.ap-south-1.amazonaws.com/icons/add_drinks.svg" />
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
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push("variants/create")}>Create Variant</Button>
                </Stack>
            </Stack>
            <Stack mt={2}>
                <CustomTable columns={columns["variant"]} rows={variants?.data?._payload || []} loading={variants.isLoading} empty='No Menu found!' />
                {variants?.data?._payload?.length ? <CustomPagination page={page} page_size={page_size} total_records={total_records} setPage={setPage} totalPages={totalPages} handlePageSize={handlePageSize} /> : null}
            </Stack>
        </div>
    )
}
