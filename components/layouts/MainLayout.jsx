"use client"
import React, { useState } from 'react'
import Navbar from './NavBar';
import { Container, Sidebar } from '..';
import { Box } from '@mui/material';
import Breadcrumbs from '../common/Breadcrumbs ';

export function MainLayout({ children }) {
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState([
    ]);
    const handleDrawerToggle = () => {

        setMobileOpen((prev) => !prev);
    };
    const handleDrawerOpen = () => {
        setOpen(false);
    };
    const handleDrawer = () => {
        setOpen(!open);
        if (open) {
            setOpenMenu([]);
        }
    };
    return (
        <div>
            <Navbar
                handleDrawerToggle={handleDrawerToggle}
                handleDrawerOpen={handleDrawerOpen}
                open={open}
            />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                handleDrawer={handleDrawer}
                open={open}
                setOpen={setOpen}
                setOpenMenu={setOpenMenu}
                openMenu={openMenu}
                setMobileOpen={setMobileOpen}
            />
            <Box
                component="main"
                sx={{
                    pl: { xs: "0px", md: open ? "260px" : "6rem" },
                    paddingTop: "5rem",
                    minHeight: "100vh",
                    bgcolor: "background.main",
                }}
            >
                <Container>
                    <Breadcrumbs/>
                    {children}
                </Container>
            </Box>
        </div>
    )
}
