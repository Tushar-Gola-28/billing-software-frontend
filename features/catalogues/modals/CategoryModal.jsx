"use client"
import { CustomInput, CustomModal, notify } from '@/components'
import { addCategories, updateCategories } from '@/services'
import { Button, Grid, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

export function CategoryModal({ open, close, handleReload, editData }) {
    const [values, setValues] = useState({
        name: "",
        description: "",
        code: ""
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
            return addCategories(data)
        },
    })
    const updateMutation = useMutation({
        mutationFn: (data) => {
            return updateCategories(data)
        },
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editData) {
            updateMutation.mutate(values, {
                onSuccess: (data) => {
                    if (data) {
                        notify("Category Update Successfully.", "success")
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
                        close()
                        handleReload()
                    }

                }
            })

        }
    }
    useEffect(() => {
        if (editData) {
            setValues({
                name: editData.name,
                description: editData.description,
                code: editData.code,
                _id: editData._id,
            })
        }
    }, [editData])
    return (
        <div>
            <CustomModal component="form" onSubmit={handleSubmit} id="Category" open={open} close={close} heading={editData ? "Update Category" : "Create Category"} action={<Button loading={mutation.isPending || updateMutation.isPending} disabled={mutation.isPending || updateMutation.isPending} type='submit' form="Category" variant="contained">{editData ? "Update" : "Create"}</Button>}>
                <Grid container spacing={1}>
                    <CustomInput
                        label="Name"
                        input={
                            <TextField fullWidth placeholder='Enter Name...' value={values.name} name='name' onChange={handleChange} />
                        }
                        required
                    />
                    <CustomInput
                        label="Code"
                        input={
                            <TextField fullWidth placeholder='Enter Code...' value={values.code} name='code' onChange={handleChange} />
                        }
                        required
                    />
                    <CustomInput
                        label="Description"
                        size={12}
                        input={
                            <TextField multiline rows={4} fullWidth placeholder='Enter Description...' value={values.description} name='description' onChange={handleChange} />
                        }
                        required
                    />
                </Grid>
            </CustomModal>
        </div>
    )
}
