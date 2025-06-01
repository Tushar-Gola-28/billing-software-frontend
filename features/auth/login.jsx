"use client"
import { loginVendor, registerVendor } from '@/services'
import { Box, Grid, IconButton, InputAdornment, OutlinedInput, Skeleton, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CustomInput, notify } from '@/components'
import LoginIcon from '@mui/icons-material/Login';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PasswordIcon from '@mui/icons-material/Password';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Link from 'next/link'

export function Login() {
    const router = useRouter()
    const [passwordType, setPasswordType] = useState(true)
    const mutation = useMutation({
        mutationFn: (data) => {
            return loginVendor(data)
        },
    })
    const [values, setValues] = useState({
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

    const handleSubmit = (e) => {
        const { email, password } = values
        if (!email) {
            return notify("Email is required.")
        }
        if (!password) {
            return notify("Email is required.")
        }
        mutation.mutate({
            ...values,
        }, {
            onSuccess: (data) => {
                console.log(data);

                localStorage.setItem("user-info", JSON.stringify(data.user))
                router.push("/dashboard")
            }
        })
    }

    useEffect(() => {
        const token = Cookies.get('access_token')
        if (!token) {
            router.replace('/login')
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

    return (
        <Box sx={{ backgroundColor: "background.main", }}>
            <Grid container >
                <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: "none", md: "flex" } }}>
                    <Box sx={{ width: "100%", height: { md: "100vh" }, padding: "10px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Box>
                            <Box sx={{ position: 'relative', width: '100%', maxWidth: '200px', aspectRatio: '5 / 2' }}>
                                <Image src="/images/logo/logo.svg" alt='Logo' fill
                                    style={{ objectFit: 'contain' }} />
                            </Box>
                            <Box mt={10}>

                                <DotLottieReact
                                    src="/images/animation/login.json"
                                    loop
                                    autoplay

                                />

                            </Box>
                        </Box>
                        {/* <Box mt={10}>
                            <Typography variant="h5" sx={{ color: "primary.main", textAlign: "center", fontStyle: "italic" }}>Welcome To PayStream</Typography>
                        </Box> */}

                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ padding: { xs: "10px", md: "30px 60px" }, background: "white", height: "calc(100vh - 60px)", mt: { md: "60px" }, borderTopLeftRadius: { md: "80px" }, boxShadow: (theme) => ({ md: `10px 10px 15px ${theme.palette.primary.main}` }) }}>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: '200px', aspectRatio: '5 / 2', display: { xs: "flex", md: "none" } }}>
                            <Image src="/images/logo/logo.svg" alt='Logo' fill
                                style={{ objectFit: 'contain' }} />
                        </Box>
                        <Stack direction="row" gap="10px" alignItems="center" sx={{ margin: { xs: "40px 0 10px 0", md: "10px 0 20px 0" } }}>
                            <LoginIcon color='primary' sx={{ fontSize: "30px" }} />
                            <Typography variant="h3" sx={{ color: "primary.main" }}>Sign in to continue</Typography>
                        </Stack>
                        <Box sx={{ width: '100%', padding: "0 10px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "calc(100% - 80px)" }}>
                            <Stack spacing={2} sx={{ pt: { xs: 1, md: 6 }, maxWidth: "450px", margin: "0 auto" }}>
                                <Grid container spacing={3}>
                                    <Grid size={12}>
                                        <Typography sx={{ color: "primary.main" }} variant="body2" fontSize="15px">
                                            Log in with your registered email to unlock the dashboard.
                                        </Typography>

                                    </Grid>
                                    <CustomInput size={12} label={"Enter Email"}
                                        required
                                        input={
                                            <OutlinedInput
                                                name={"email"}
                                                type={"email"}
                                                placeholder="Enter Email"
                                                required={true}
                                                size="small"
                                                onChange={handleChange}
                                                value={values.email}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <IconButton edge="center" color='primary'>
                                                            <MarkEmailReadIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        }
                                    />
                                    <CustomInput size={12} label={"Enter Password"}
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
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <IconButton edge="center" color='primary'>
                                                            <PasswordIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
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
                                    <Grid size={12}>
                                        <Button loading={mutation.isPending} type='button' disabled={mutation.isPending} variant="contained" fullWidth onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                        <Stack direction="row" alignItems="center" gap="5px" sx={{ mt: "20px" }}>
                                            <Typography variant="body2" sx={{ color: "primary.main" }}>   Already have an account?</Typography>
                                            <Typography variant="body2" sx={{ color: "primary.main" }}>
                                                <Link href="/registration">Sign Up</Link>
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Typography sx={{ color: "primary.main" }} variant="h5">
                                Welcome To PayStream
                            </Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
