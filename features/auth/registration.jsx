"use client"
import { fetchAllPlans, registerVendor } from '@/services'
import { Box, Grid, IconButton, InputAdornment, OutlinedInput, Skeleton, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { CustomInput, CustomPhoneInput } from '@/components'
import { useMobileCode } from '@/hooks'
import GradingIcon from '@mui/icons-material/Grading';
import validCountryDataList from '@/utils/countryCodeAndName'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const steps = ['Fill All Details', 'Verify & Process to pay'];
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
export function Registration() {
    const [activeStep, setActiveStep] = useState(0);
    const router = useRouter()
    const [skipped, setSkipped] = useState(new Set());
    const { code, setCode, phoneNumberLength, setPhoneNumberLength, anchorEl, searchText, setSearchText, handleSearchTextChange, filteredMenuItems, handleCountryCode, handleMenuClose, handleCode } = useMobileCode()
    const [planDetails, setPlanDetails] = useState({})
    const [passwordType, setPasswordType] = useState(true)
    const mutation = useMutation({
        mutationFn: (data) => {
            return registerVendor(data)
        },
    })
    const [values, setValues] = useState({
        name: "",
        mobile: "",
        countryCode: "",
        email: "",
        password: ""

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
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        const { name, mobile, email, password } = values
        mutation.mutate({
            ...values,
            countryCode: String(code),
            payment_status: "paid",
            plan_id: planDetails._id
        }, {
            onSuccess: (data) => {
                console.log(data);
                router.push("/dashboard")
            },
            onError: ({ response }) => {
                console.log(response);

            }
        })
    }

    useEffect(() => {
        const token = Cookies.get('access_token')
        if (!token) {
            router.replace('/registration')
        } else {
            try {
                const decoded = jwtDecode(token)
                const isExpired = Date.now() >= decoded.exp * 1000
                if (isExpired) {
                    router.replace('/api/auth/refresh-token')
                }
            } catch (err) {
                router.replace('/login')
            }
        }
    }, [])
    const data = useQuery({
        queryKey: ["plan-list"],
        queryFn: ({ signal }) => fetchAllPlans(signal)
    })

    return (
        <Box sx={{ backgroundColor: "background.main", }}>
            <Grid container >
                <Grid size={{ xs: 12, md: 3.5 }}>
                    <Box sx={{ width: "100%", height: { md: "100vh" }, padding: "10px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Box>
                            <Box sx={{ position: 'relative', width: '100%', maxWidth: '200px', aspectRatio: '5 / 2' }}>
                                <Image src="/images/logo/logo.svg" alt='Logo' fill
                                    style={{ objectFit: 'contain' }} />
                            </Box>
                            <Stack mt="20px" direction="row" gap="5px" alignItems="center">
                                <GradingIcon color='primary' />
                                <Typography variant="h5" fontSize="22px" sx={{ color: "primary.main" }} >Subscription Plans</Typography>
                            </Stack>
                            {data?.isLoading && <Stack spacing={1} mt="20px" sx={{ maxHeight: "calc(100vh - 220px)", overflowY: "scroll", scrollbarWidth: "none", scrollBehavior: "smooth" }}>
                                {
                                    [...Array(4)].map((it, index) => {
                                        return (
                                            <Skeleton variant="rounded" sx={{ width: "100%", height: "120px" }} key={index} />
                                        )
                                    })
                                }
                            </Stack>}
                            <Stack mt="20px" spacing={2} sx={{ maxHeight: "calc(100vh - 220px)", overflowY: "scroll", scrollbarWidth: "none", scrollBehavior: "smooth" }}>

                                {
                                    data.data && data.data?.map((it) => {
                                        return (
                                            <Stack key={it._id} direction="row" justifyContent="space-between" sx={{
                                                padding: "10px",
                                                transition: "ease-in-out 400ms",
                                                cursor: "pointer",
                                                border: (theme) => `1px solid ${theme.palette[planDetails._id == it._id ? "primary" : "lightGrey"].main}`,
                                                borderRadius: "10px",
                                                backgroundImage: (theme) =>
                                                    planDetails._id === it._id
                                                        ? `linear-gradient(150deg, ${theme.palette.secondary_primary.main}, ${theme.palette.background.main}, ${theme.palette.lightGrey.main})`
                                                        : "none",
                                            }} onClick={() => setPlanDetails(it)}>
                                                <Stack>
                                                    <Typography variant="subtitle2" sx={{ color: "primary.main" }}>{it.name}</Typography>
                                                    <Stack>
                                                        <Typography variant="caption" sx={{ color: "grey.main" }}>✔️ Valid for {it.joining_till} {it.joining_till_type}</Typography>
                                                        {
                                                            it?.description?.map((it) => {
                                                                return (

                                                                    <Typography key={it} variant="caption" sx={{ color: "grey.main" }}>✔️ {it}</Typography>
                                                                )
                                                            })
                                                        }
                                                    </Stack>
                                                </Stack>
                                                <Stack direction="row" flexDirection="column" justifyContent="space-between" alignItems="end" gap="5px">
                                                    <Typography variant="subtitle2" fontSize="14px" fontStyle="italic" fontWeight="500">₹{it.price}</Typography>
                                                    <Typography variant="caption" sx={{ backgroundColor: "primary.main", color: "white", padding: "4px 10px", borderRadius: "50px", fontSize: "12px", width: "100px", textAlign: "center" }}>Choose Plan</Typography>
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                                }

                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{ color: "primary.main", textAlign: "center", fontStyle: "italic" }}>Welcome To PayStream</Typography>
                        </Box>

                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 8.5 }}>
                    <Box sx={{ padding: { xs: "10px", md: "30px 60px" }, background: "white", height: "calc(100vh - 60px)", mt: "60px", borderTopLeftRadius: "80px", boxShadow: (theme) => `10px 10px 15px ${theme.palette.primary.main} ` }}>
                        <Stack direction="row" gap="10px" alignItems="center" sx={{ margin: "10px 0 20px 0" }}>
                            <HowToRegIcon color='primary' sx={{ fontSize: "30px" }} />
                            <Typography variant="h3" sx={{ color: "primary.main" }}>Registration</Typography>
                        </Stack>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>

                            <Stack spacing={2} sx={{ pt: 6 }}>
                                <Grid container spacing={2}>
                                    <CustomInput label={"Enter Phone"}
                                        required
                                        input={
                                            <CustomPhoneInput
                                                {...{ code, setCode, phoneNumberLength, validCountryDataList, filteredMenuItems, anchorEl, handleCode, handleCountryCode, handleSearchTextChange, handleMenuClose, searchText, handleChange, value: values.mobile }}
                                            />
                                        }
                                    />
                                    <CustomInput label={"Enter Email"}
                                        required
                                        input={
                                            <OutlinedInput
                                                // id={name}
                                                name={"email"}
                                                type={"email"}
                                                placeholder="Enter Email"
                                                required={true}
                                                size="small"
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                        }
                                    />
                                    <CustomInput label={"Enter Name"}
                                        required
                                        input={
                                            <OutlinedInput
                                                name={"name"}
                                                type={"name"}
                                                placeholder="Enter Name"
                                                required={true}
                                                size="small"
                                                onChange={handleChange}
                                                value={values.name}
                                            />
                                        }
                                    />
                                    <CustomInput label={"Enter Password"}
                                        required
                                        input={
                                            <OutlinedInput
                                                name={"password"}
                                                type={passwordType ? "password" : "text"}
                                                placeholder="Enter Password"
                                                required={true}
                                                size="small"
                                                onChange={handleChange}
                                                value={values.password}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton edge="center" onClick={() => setPasswordType(prev => !prev)} color='primary'>
                                                            {!passwordType ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        }
                                    />
                                </Grid>
                                <Stack direction="row" sx={{ pt: "30px" }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                        variant="outlined"
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />} >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                        <Stack direction="row" alignItems="center" gap="5px" sx={{ mt: "100px" }}>
                            <Typography variant="body2" sx={{ color: "primary.main" }}>Don’t have an account?</Typography>
                            <Typography variant="body2" sx={{ color: "primary.main" }}>
                                <Link href="/login">Sign In</Link>
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
