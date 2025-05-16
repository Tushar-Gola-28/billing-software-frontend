/* eslint-disable react/prop-types */
"use client"
import { styled, } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
    Stack,
    IconButton,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    Skeleton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useModalControl } from "@/hooks";
import useMenu from "@/hooks/useMenu";
import LogoutModal from "./Logout";
import { getStorageData } from "@/utils/useCookies";
import { useEffect, useState } from "react";


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // paddingLeft: open ? sideBarOpen : sideBarClose,
    [theme.breakpoints.only("xs")]: {
        paddingLeft: 0, // Set left padding to 0 for xs viewport
    },
}));
const Navbar = ({ open, handleDrawerToggle }) => {
    const userName = getStorageData("user-info", "name")
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const { open: isOpenMenu, anchorEl, handleClick, handleClose } = useMenu()
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return (
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    boxShadow: "0px 4px 16px 0px #0276E526",
                    bgcolor: "#FFFFFF",
                    height: "5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}
            >
                <Toolbar sx={{ width: "100%" }}>
                    <Stack
                        width="100%"
                        direction="row"
                        justifyContent={{ xs: "space-between", md: "space-between" }}
                    >
                        <LogoCom handleDrawerToggle={handleDrawerToggle} />
                        <Stack direction="row" spacing={1} marginRight={3} justifyContent="space-between" alignItems="end">
                            <Skeleton width={"50px"} height={"50px "} variant="circular" />
                            <Skeleton width={"100px"} height={"20px "} variant="rounded" />
                        </Stack>
                    </Stack>
                </Toolbar>

            </AppBar>
        )
    }
    return (
        <>
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    boxShadow: "0px 4px 16px 0px #0276E526",
                    bgcolor: "#FFFFFF",
                    height: "5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}
            >
                <Toolbar sx={{ width: "100%" }}>
                    <Stack
                        width="100%"
                        direction="row"
                        justifyContent={{ xs: "space-between", md: "space-between" }}
                    >
                        <LogoCom handleDrawerToggle={handleDrawerToggle} />
                        <Stack direction="row" spacing={1} marginRight={3} justifyContent="space-between" alignItems="end">
                            <Stack>

                            </Stack>
                            <Stack
                                // disableTouchRipple
                                size="small"
                                variant="outlined"
                                id="basic-button"
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                sx={{
                                    "&:hover": {
                                        background: "none",
                                        border: "none",
                                    },
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onClick={handleClick}
                            >
                                <Avatar alt={userName} />
                            </Stack>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={isOpenMenu}
                                onClose={handleClose}

                            >
                                <MenuItem onClick={handleOpenModal}>Logout</MenuItem>
                            </Menu>
                            {userName && <Stack>
                                <Typography variant="body1">{userName}</Typography>
                            </Stack>}
                        </Stack>
                    </Stack>
                </Toolbar>
                {isOpen && <LogoutModal open={isOpen} close={handleCloseModal} />}
            </AppBar>


        </>
    );
};

export default Navbar;

const LogoCom = ({ handleDrawerToggle }) => {
    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
            >
                <MenuIcon />
            </IconButton>
            <Box
                component="img"
                src={"/images/logo/logo.svg"}
                alt="Icon"
                sx={{
                    maxHeight: "100%",
                    maxWidth: { xs: "7rem", md: "8rem" },
                    display: { md: "none" },
                }}
            />
        </Stack>
    )
}
