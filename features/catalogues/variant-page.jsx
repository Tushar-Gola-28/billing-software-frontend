"use client"
import { CustomInput, LoadingScreen, notify, PageStructure } from '@/components'
import { addVariant, fetchAllActiveMenus, fetchVariantsByID, updateVariant } from '@/services'
import { Button, FormControl, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Stack, Switch, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export function VariantPage({ menu_tracking_id, id }) {
    const router = useRouter()
    const [values, setValues] = useState({
        menu_id: "",
        name: "",
        minQty: 0,
        status: "true",
        isMultiple: false,
        note: "",
        type: "veg"
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const menus = useQuery({
        queryKey: ["Active Menus"],
        queryFn: ({ signal }) => fetchAllActiveMenus(signal)

    })
    const variant = useQuery({
        queryKey: ["Variant By ID"],
        queryFn: ({ signal }) => fetchVariantsByID(signal, id),
        enabled: !!id

    })
    useEffect(() => {
        if (id && variant?.data?._payload) {
            const { isMultiple, menu_id, minQty, name, note, status, type, _id } = variant?.data?._payload
            setValues((prev) => {
                return {
                    ...prev,
                    menu_id: menu_id,
                    isMultiple: isMultiple,
                    minQty: minQty,
                    name: name,
                    note: note,
                    status: String(status),
                    type: type || "veg",
                    _id: _id
                }
            })
        }
    }, [variant.data])


    const mutation = useMutation({
        mutationFn: (data) => {
            return addVariant(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: (data) => {
            return updateVariant(data)
        },
    })
    useEffect(() => {
        if (menus?.data?._payload && menu_tracking_id && menu_tracking_id != "create" && menu_tracking_id != "update") {
            const data = menus?.data?._payload?.find((it) => it.menu_tracking_id == menu_tracking_id)
            if (data) {
                setValues((prev) => {
                    return {
                        ...prev,
                        menu_id: data._id
                    }
                })
            }
        }
    }, [menus?.data])
    const handleSubmit = () => {
        if (!id) {
            mutation.mutate({ ...values }, {
                onSuccess: () => {
                    notify("Variant Created successfully.", "success")
                    router.push("/variants")
                }
            })
        } else {
            updateMutation.mutate({ ...values }, {
                onSuccess: () => {
                    notify("Variant Update successfully.", "success")
                    router.push("/variants")
                }
            })
        }
    }

    if (menus.isLoading) {
        return <LoadingScreen />
    }
    return (
        <div>
            <PageStructure title={id ? "Update Variant" : "Add Variant"}>
                <Stack sx={{ maxWidth: "700px" }}>
                    <Grid container spacing={2}>

                        <CustomInput
                            label="Select Menu"
                            size={12}
                            input={
                                <TextField fullWidth select placeholder='Enter Name...' value={values.menu_id} name='menu_id' onChange={handleChange} >
                                    {
                                        menus?.data?._payload?.map((it) => {
                                            return (
                                                <MenuItem key={it._id} value={it._id}>{it.name}</MenuItem>
                                            )
                                        })
                                    }
                                </TextField>
                            }
                            required
                        />
                        <CustomInput
                            label="Select Type"
                            input={
                                <TextField fullWidth select placeholder='Enter Select Type...' value={values.type} name='type' onChange={handleChange} >
                                    <MenuItem value="veg">Veg</MenuItem>
                                    <MenuItem value="non-veg">Non Veg</MenuItem>
                                </TextField>
                            }
                            required
                        />
                        <CustomInput
                            label="Name"
                            input={
                                <TextField fullWidth placeholder='Enter Name...' value={values.name} name='name' onChange={handleChange} />
                            }
                            required
                        />
                        <CustomInput
                            label="Min Quantity"
                            input={
                                <TextField fullWidth placeholder='Enter Min Quantity...' value={values.minQty} name='minQty' onChange={handleChange} />
                            }
                            required
                        />
                        <CustomInput
                            size={12}
                            label="Multiple Options"
                            input={
                                <FormControlLabel control={<Switch checked={values.isMultiple} onChange={(e) => {

                                    setValues((prev) => {
                                        return {
                                            ...prev,
                                            isMultiple: e.target.checked
                                        }
                                    })
                                }} name='isMultiple' />} />
                            }
                            required
                        />
                        <CustomInput
                            label="Note"
                            size={12}
                            input={
                                <TextField multiline rows={4} fullWidth placeholder='Enter Note...' value={values.note} name='note' onChange={handleChange} />
                            }
                            required
                        />
                        <Grid size={12}>
                            <FormControl>
                                <Typography variant="body2">Status</Typography>
                                <RadioGroup
                                    row
                                    value={values.status}
                                    onChange={handleChange}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="status"
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Active" />
                                    <FormControlLabel value="false" control={<Radio />} label="Disable" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid size={12}>
                            <Stack direction="row" gap="10px" mt="40px">
                                <Button loading={updateMutation.isPending || mutation.isPending} disabled={updateMutation.isPending || mutation.isPending} variant="contained" onClick={handleSubmit}>
                                    {id ? "Update" : "Create"}
                                </Button>
                                <Button variant="outlined">
                                    Cancel
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </PageStructure>
        </div>
    )
}
