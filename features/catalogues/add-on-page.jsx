"use client"
import { CustomInput, PageStructure } from '@/components'
import { fetchMenuVariants } from '@/services'
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Stack, Switch, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
export function AddOnPage({ menu }) {
    const [primary, setPrimary] = useState({})
    const [variantsAndAddOns, setVariantsAndAddOns] = useState([])
    const data = useQuery({
        queryKey: ["menu variant"],
        queryFn: ({ signal }) => fetchMenuVariants(signal, menu),
        enabled: !!menu
    })
    useEffect(() => {
        if (data && data.data && data?.data?._payload) {
            setVariantsAndAddOns(data.data._payload.map((it) => {
                return {
                    ...it,
                    addOns: [{
                        variant_id: it._id,
                        name: "",
                        price: "",
                        addOnPrice: "",
                        note: "",
                        status: "true",
                        isDefault: false,
                        menu_id: menu,
                        priceChangeable: false
                    }]
                }
            }) || [])
        }
    }, [data.data])
    const handleAddOn = (id) => {
        setVariantsAndAddOns((prev) => {
            return prev.map((it) => {
                if (it._id == id) {
                    return {
                        ...it,
                        addOns: [
                            ...it.addOns,
                            {
                                variant_id: it._id,
                                name: "",
                                price: "",
                                addOnPrice: "",
                                note: "",
                                status: "true",
                                isDefault: false,
                                menu_id: menu,
                                priceChangeable: false
                            }

                        ]
                    }
                }
                return it
            })
        })
    }
    const handleAddOnChange = useCallback((id, key, value, index) => {
        setVariantsAndAddOns((prev) => {
            return prev.map((variant) => {
                if (variant._id != id) return variant
                const updatedAddOns = [...variant.addOns];
                updatedAddOns[index] = {
                    ...updatedAddOns[index], [key]: value
                };
                return {
                    ...variant,
                    addOns: updatedAddOns
                };

            })
        })
    }, [])
    console.log(variantsAndAddOns, "variantsAndAddOns");

    return (
        <div>
            <PageStructure title="Manage Add-ons for Variants">
                <Stack sx={{ maxWidth: "700px" }}>
                    {
                        variantsAndAddOns?.map((it, index) => {
                            return (
                                <Accordion key={it._id} expanded sx={{ borderWidth: 1, borderColor: "divider" }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{ borderBottom: "1px solid grey", }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                                            <Typography variant='h5' sx={{ color: "primary.main" }}>{index + 1}. {it.name}</Typography>
                                            <FormControlLabel control={<Switch checked={primary?._id == it._id} sx={{ mr: 1 }}
                                                onChange={(e) => {
                                                    e.stopPropagation()
                                                    if (e.target.checked) {
                                                        setPrimary(it)
                                                    } else {
                                                        setPrimary({})

                                                    }
                                                }}

                                            />} label="Set Primary" disabled={primary?._id != it._id && Object.keys(primary).length} onClick={(e) => e.stopPropagation()} />
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            it.addOns.map((ite, ind) => {
                                                return (
                                                    <Paper key={ind} sx={{ borderWidth: 1, borderColor: "divider", padding: "15px", mb: 1 }}>
                                                        <Grid container spacing={2}>
                                                            <CustomInput
                                                                label="Name"
                                                                input={
                                                                    <TextField fullWidth placeholder='add name...'
                                                                        onBlur={(e) => {
                                                                            handleAddOnChange(it._id, "name", e.target.value, ind)
                                                                        }}
                                                                        defaultValue={ite.name}
                                                                    />
                                                                }
                                                            />
                                                            <CustomInput
                                                                label="Price"
                                                                input={
                                                                    <TextField fullWidth placeholder='add price...'
                                                                        onBlur={(e) => {
                                                                            handleAddOnChange(it._id, "price", e.target.value, ind)
                                                                        }}
                                                                        defaultValue={ite.price}
                                                                    />
                                                                }
                                                            />
                                                            <CustomInput
                                                                label="Add On Price"
                                                                size={12}
                                                                input={
                                                                    <TextField fullWidth placeholder='add On Price...'
                                                                        onBlur={(e) => {
                                                                            handleAddOnChange(it._id, "addOnPrice", e.target.value, ind)
                                                                        }}
                                                                        defaultValue={ite.addOnPrice}
                                                                    />
                                                                }
                                                            />
                                                            <CustomInput
                                                                label="Is Default Selected"
                                                                size={{ md: 4 }}
                                                                input={
                                                                    <FormControlLabel control={<Switch

                                                                        onChange={(e) => {
                                                                            handleAddOnChange(it._id, "isDefault", e.target.checked, ind)
                                                                        }}
                                                                        checked={ite.isDefault}
                                                                    />} />
                                                                }
                                                            />
                                                            <CustomInput
                                                                label="Is Price change According to add-on price"
                                                                size={{ md: 8 }}
                                                                input={
                                                                    <FormControlLabel control={<Switch

                                                                        onChange={(e) => {
                                                                            handleAddOnChange(it._id, "priceChangeable", e.target.checked, ind)
                                                                        }}
                                                                        checked={ite.priceChangeable}
                                                                    />} />
                                                                }
                                                            />
                                                            <CustomInput
                                                                label="Note"
                                                                size={12}
                                                                input={
                                                                    <TextField multiline rows={4} fullWidth placeholder='Enter note...'
                                                                        onBlur={(e) => {
                                                                            handleAddOnChange(it._id, "note", e.target.value, ind)
                                                                        }}
                                                                        defaultValue={ite.note}
                                                                        name='note' />
                                                                }
                                                                required
                                                            />

                                                            <Grid size={12}>
                                                                <FormControl>
                                                                    <Typography variant="body2">Status</Typography>
                                                                    <RadioGroup
                                                                        row
                                                                        value={ite.status}
                                                                        // onChange={handleChange}
                                                                        onChange={(e) => {
                                                                            handleAddOnChange(it._id, "status", e.target.value, ind)
                                                                        }}
                                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                                        name="status"
                                                                    >
                                                                        <FormControlLabel value="true" control={<Radio />} label="Active" />
                                                                        <FormControlLabel value="false" control={<Radio />} label="Disable" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                )
                                            })
                                        }
                                        <Stack direction="row" mt={2}>
                                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleAddOn(it._id)}>Add</Button>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }

                </Stack>
            </PageStructure>
        </div>
    )
}
