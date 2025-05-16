"use client"
import { CustomPagination, CustomTable, Heading } from '@/components'
import { Button, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useColumns } from './hooks';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories } from '@/services';
import { usePagination } from '@/hooks';
import { debounce } from 'lodash';

export function CataloguesPage() {
    const { columns } = useColumns()
    const { page, setPage, page_size, total_records, setTotal_records, totalPages, setTotalPages, handlePageSize } = usePagination()
    const [search, setSearch] = useState("")
    const data = useQuery({
        queryKey: ["categories", page, page_size, search],
        queryFn: ({ signal }) => fetchAllCategories(signal, page, page_size, search)
    })
    useEffect(() => {
        if (data?.data) {
            setTotalPages(data?.data?.totalPages)
            setTotal_records(data?.data?.total_records)
        }
    }, [data?.data])

    const handleSearch = debounce((e) => {
        setPage(0)
        setSearch(e.target.value)
    }, 600)

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
                    <Button variant="contained" startIcon={<AddIcon />}>Create Category</Button>
                    <Button variant="contained" startIcon={<AddIcon />}>Create Menu</Button>
                </Stack>
            </Stack>
            <Stack>
                <CustomTable columns={columns} rows={data?.data?._payload || []} loading={data.isLoading} empty='No catalogue found!' />
                {data?.data?._payload?.length ? <CustomPagination page={page} page_size={page_size} total_records={total_records} setPage={setPage} totalPages={totalPages} handlePageSize={handlePageSize} /> : null}
            </Stack>
        </div>
    )
}
