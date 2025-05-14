/* eslint-disable react/prop-types */
"use client"
import { styled, } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
    Stack,
    IconButton,
    Box,
    Typography,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useModalControl } from "@/hooks";
import useMenu from "@/hooks/useMenu";


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
    // const { user } = useAuthValidator((state) => state)
    const { open: isOpen, handleCloseModal, handleOpenModal } = useModalControl()
    const { open: isOpenMenu, anchorEl, handleClick, handleClose } = useMenu()
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
                        <Stack direction="row" spacing={0.5}>
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
                                src={"/public/images/logo/logo.svg"}
                                alt="Icon"
                                sx={{
                                    maxHeight: "100%",
                                    maxWidth: "3rem",
                                    display: { md: "none" },
                                }}
                            />
                        </Stack>
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
                                <Avatar alt={"ertyuiop"} />
                            </Stack>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={isOpenMenu}
                                onClose={handleClose}

                            >
                                <MenuItem onClick={handleOpenModal}>Logout</MenuItem>
                            </Menu>
                            {/* {user?.name && <Stack>
                                <Typography variant="body1">{user?.name}</Typography>
                            </Stack>} */}
                        </Stack>
                    </Stack>
                </Toolbar>
                {/* {isOpen && <LogoutModal open={isOpen} close={handleCloseModal} />} */}
            </AppBar>


        </>
    );
};

export default Navbar;
