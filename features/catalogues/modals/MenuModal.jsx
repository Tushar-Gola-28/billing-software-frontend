"use client"
import { CustomInput, CustomModal, LoadingScreen, notify } from '@/components'
import { addCategories, addMenu, fetchAllActiveCategories, updateMenu } from '@/services'
import { Button, Grid, MenuItem, TextField } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export function MenuModal({ open, close, handleReload, editData }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [values, setValues] = useState({
        category_id: "",
        qty: "",
        name: "",
        note: "",
        code: "",
        price: "",
        discount: "",
        type: "veg",
        status: "true",
        gst_percentage: "",
        total_price_with_gst: ""
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
    const mutation = useMutation({
        mutationFn: (data) => {
            return addMenu(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: (data) => {
            return updateMenu(data)
        },
    })
    const categories = useQuery({
        queryKey: ["Active Categories"],
        queryFn: ({ signal }) => fetchAllActiveCategories(signal)

    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editData) {
            updateMutation.mutate(values, {
                onSuccess: (data) => {
                    if (data) {
                        notify("Category Update Successfully.", "success")
                        const params = new URLSearchParams(searchParams);
                        params.set('tab', "menu");
                        router.push(`?${params.toString()}`);
                        close()
                        handleReload()
                    }

                }
            })
        } else {

            mutation.mutate(values, {
                onSuccess: (data) => {
                    if (data) {
                        notify("Category Created Successfully.", "success")
                        const params = new URLSearchParams(searchParams);
                        params.set('tab', "menu");
                        router.push(`?${params.toString()}`);
                        close()
                        handleReload()
                    }

                }
            })

        }
    }
    useEffect(() => {
        if (editData) {
            const { category, code, status, qty, note, name, price, discount, type, total_price_with_gst, gst_percentage, _id } = editData
            setValues({
                category_id: category?._id,
                qty: qty,
                name: name,
                note: note,
                code: code,
                status: status,
                price: price,
                discount: discount,
                type: type,
                gst_percentage: gst_percentage,
                total_price_with_gst: total_price_with_gst,
                _id: _id
            })
        }
    }, [editData])
    useEffect(() => {
        const price = +values?.price || 0;
        const discount = +values?.discount || 0;
        const gstPercentage = +values?.gst_percentage || 0;

        if (price && gstPercentage) {
            const taxableAmount = price - discount;
            const gstAmount = (taxableAmount * gstPercentage) / 100;
            const totalPriceWithGst = taxableAmount + gstAmount;
            setValues((prev) => ({
                ...prev,
                total_price_with_gst: totalPriceWithGst,
            }));
        }
    }, [values.price, values.discount, values.gst_percentage]);
    if (categories.isLoading) {
        return <LoadingScreen />
    }
    return (
        <div>
            <CustomModal size="md" component="form" onSubmit={handleSubmit} id="Menu" open={open} close={close} heading={editData ? "Update Menu" : "Create Menu"} action={<Button loading={mutation.isPending || updateMutation.isPending} disabled={mutation.isPending || updateMutation.isPending} type='submit' form="Menu" variant="contained">{editData ? "Update" : "Create"}</Button>}>
                <Grid container spacing={1}>
                    <CustomInput
                        label="Select Category"
                        input={
                            <TextField fullWidth select placeholder='Enter Name...' value={values.category_id} name='category_id' onChange={handleChange} >
                                {
                                    categories?.data?._payload?.map((it) => {
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
                        label="Menu Name"
                        input={
                            <TextField fullWidth placeholder='Enter name...' value={values.name} name='name' onChange={handleChange} />
                        }
                        required
                    />
                    <CustomInput
                        label="Shortcut Code"
                        input={
                            <TextField fullWidth placeholder='Enter Code...' value={values.code} name='code' onChange={handleChange} />
                        }
                        required
                    />

                    <CustomInput
                        label="Per Day Quantity"
                        input={
                            <TextField fullWidth placeholder='Enter Quantity...' value={values.qty} name='qty' onChange={handleChange} />
                        }
                        required
                    />
                    <CustomInput
                        label="Menu Price"
                        input={
                            <TextField fullWidth placeholder='Enter Price...' value={values.price} name='price' onChange={handleChange} />
                        }
                        required
                    />
                    <CustomInput
                        label="Discount Price"
                        input={
                            <TextField fullWidth placeholder='Enter Discount Price...' value={values.discount} name='discount' onChange={handleChange} />
                        }
                        required
                    />
                    <CustomInput
                        label="GSt With Percentage"
                        input={
                            <TextField fullWidth placeholder='Enter GSt...' value={values.gst_percentage || ""} name='gst_percentage' onChange={handleChange} />
                        }
                        required
                    />
                    <CustomInput
                        label="Total Price With GST"
                        size={12}
                        input={
                            <TextField fullWidth disabled placeholder='Enter GSt...' value={values.total_price_with_gst || ""} name='total_price_with_gst' />
                        }
                        required
                    />
                    <CustomInput
                        label="Note"
                        size={12}
                        input={
                            <TextField multiline rows={4} fullWidth placeholder='Enter note...' value={values.note} name='note' onChange={handleChange} />
                        }
                        required
                    />
                </Grid>
            </CustomModal>
        </div>
    )
}
