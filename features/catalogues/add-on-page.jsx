"use client"
import { CustomInput, notify, PageStructure } from '@/components'
import { addVariantAddOns, fetchMenuVariants } from '@/services'
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormControlLabel, Grid, IconButton, Paper, Radio, RadioGroup, Stack, Switch, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'
export function AddOnPage({ menu }) {
    const [primary, setPrimary] = useState({})
    const router = useRouter()
    const [variantsAndAddOns, setVariantsAndAddOns] = useState([])
    const data = useQuery({
        queryKey: ["menu variant"],
        queryFn: ({ signal }) => fetchMenuVariants(signal, menu),
        enabled: !!menu
    })
    const createAddOns = (variantId, isMultiple, menu) => {
        if (isMultiple) {
            return [{
                variant_id: variantId,
                name: "",
                price: "",
                addOnPrice: "",
                note: "",
                status: "true",
                isDefault: false,
                menu_id: menu,
                priceChangeable: false
            }, {
                variant_id: variantId,
                name: "",
                price: "",
                addOnPrice: "",
                note: "",
                status: "true",
                isDefault: false,
                menu_id: menu,
                priceChangeable: false
            }];
        } else {
            return [{
                variant_id: variantId,
                name: "",
                price: "",
                addOnPrice: "",
                note: "",
                status: "true",
                isDefault: false,
                menu_id: menu,
                priceChangeable: false
            }];
        }
    };
    useEffect(() => {
        if (data && data.data && data?.data?._payload) {
            setVariantsAndAddOns(data.data._payload.map((it) => {
                return {
                    ...it,
                    addOns: it.addOns?.length ? it.addOns : createAddOns(it._id, it.isMultiple, menu)
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
    const handleAddOnRemove = (index, idx) => {
        setVariantsAndAddOns((prev) => {
            return prev.map((it, indx) => {
                if (indx == index) {
                    return {
                        ...it,
                        addOns: it.addOns.filter((_, i) => i != idx)
                    }
                }
                return it
            })
        })
    }
    const handleMultipleChoice = (index, checked) => {
        setVariantsAndAddOns((prev) => {
            return prev.map((variant, idx) => {
                if (index == idx) {

                    return {
                        ...variant,
                        isMultiple: checked
                    }
                }
                return variant

            })
        })
    }
    // const handleAddOnChange = useCallback((id, key, value, index) => {
    //     setVariantsAndAddOns((prev) => {
    //         return prev.map((variant) => {
    //             if (variant._id != id) return variant
    //             const updatedAddOns = [...variant.addOns];
    //             updatedAddOns[index] = {
    //                 ...updatedAddOns[index], [key]: value
    //             };
    //             return {
    //                 ...variant,
    //                 addOns: updatedAddOns
    //             };

    //         })
    //     })
    // }, [])
    const handleAddOnChange = useCallback((id, key, value, index) => {
        setVariantsAndAddOns((prev) => {
            return prev.map((variant) => {
                if (variant._id !== id) return variant;

                let updatedAddOns = [...variant.addOns];

                if (key === "isDefault" && value === true) {
                    // Set isDefault: false for all add-ons, except the selected one
                    updatedAddOns = updatedAddOns.map((addOn, i) => ({
                        ...addOn,
                        isDefault: i === index
                    }));
                } else {
                    // Just update the specific key for the target add-on
                    updatedAddOns[index] = {
                        ...updatedAddOns[index],
                        [key]: value
                    };
                }

                return {
                    ...variant,
                    addOns: updatedAddOns
                };
            });
        });
    }, []);

    const mutation = useMutation({
        mutationFn: (data) => {
            return addVariantAddOns(data)
        },
    })

    const handleSubmit = () => {
        for (let index = 0; index < variantsAndAddOns.length; index++) {
            const element = variantsAndAddOns[index];
            if (element.isMultiple) {
                if (element.addOns.length < 2) {
                    return notify(`The "${element.name}" variant must have at least 2 add-ons.`)
                }
            }
            if (element.addOns.length < 1) {
                return notify(`The "${element.name}" variant must have at least 1 add-ons.`)
            }
            for (let addOn = 0; addOn < element.addOns.length; addOn++) {
                const addOnKey = element.addOns[addOn];
                if (!addOnKey.name || !addOnKey.name.trim()) {
                    return notify(`Add-on name is required in "${element.name}" variant.`);
                }

                if (element.isPrimary) {
                    if (addOnKey.addOnPrice === undefined || addOnKey.addOnPrice === null || addOnKey.addOnPrice === "") {
                        return notify(`Add-on price is required for primary variant "${element.name}".`);
                    }
                }

                if (addOnKey.price === undefined || addOnKey.price === null || addOnKey.price === "") {
                    return notify(`Base price is required for add-ons in "${element.name}".`);
                }

                if (!addOnKey.note || !addOnKey.note.trim()) {
                    return notify(`Note is required for each add-on in "${element.name}".`);
                }
            }
        }
        mutation.mutate({ data: variantsAndAddOns, menu_id: menu }, {
            onSuccess: (res) => {
                console.log(res);
                router.back()
            }
        })


    }

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
                                            <Stack direction="row" gap="5px">
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
                                                {/* <FormControlLabel control={<Switch checked={it.isMultiple} sx={{ mr: 1 }}
                                                    onChange={(e) => {
                                                        e.stopPropagation()
                                                        handleMultipleChoice(index, e.target.checked)

                                                    }}

                                                />} label="Multiple Choice"  onClick={(e) => e.stopPropagation()} /> */}
                                            </Stack>
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
                                                                        onChange={(e) => {
                                                                            handleAddOnChange(it._id, "name", e.target.value, ind)
                                                                        }}
                                                                        value={ite.name}
                                                                    />
                                                                }
                                                            />
                                                            <CustomInput
                                                                label="Price"
                                                                input={
                                                                    <TextField fullWidth placeholder='add price...'
                                                                        onChange={(e) => {
                                                                            handleAddOnChange(it._id, "price", e.target.value, ind)
                                                                        }}
                                                                        value={ite.price}
                                                                    />
                                                                }
                                                            />

                                                            {primary?._id == it._id && <CustomInput
                                                                label="Add On Price"
                                                                size={12}
                                                                input={
                                                                    <TextField fullWidth placeholder='add On Price...'
                                                                        onChange={(e) => {
                                                                            handleAddOnChange(it._id, "addOnPrice", e.target.value, ind)
                                                                        }}
                                                                        value={ite.addOnPrice}
                                                                    />
                                                                }
                                                            />}
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
                                                            {primary?._id && primary?._id != it._id && <CustomInput
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
                                                            />}
                                                            <CustomInput
                                                                label="Note"
                                                                size={12}
                                                                input={
                                                                    <TextField multiline rows={4} fullWidth placeholder='Enter note...'
                                                                        onChange={(e) => {
                                                                            handleAddOnChange(it._id, "note", e.target.value, ind)
                                                                        }}
                                                                        value={ite.note}
                                                                        name='note' />
                                                                }
                                                                required
                                                            />

                                                            <Grid size={6}>
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
                                                            <Grid size={6}>
                                                                <Stack direction="row" justifyContent="flex-end" alignItems="center" mt={2}>
                                                                    <IconButton sx={{ background: "red", color: "white", borderRadius: "6px", "&:hover": { background: "red" } }} onClick={() => handleAddOnRemove(index, ind)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Stack>

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
                <Stack direction="row" mt={2}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Create
                    </Button>
                </Stack>
            </PageStructure>
        </div>
    )
}
