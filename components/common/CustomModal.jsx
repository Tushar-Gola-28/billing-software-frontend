"use client"
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Stack, Typography } from "@mui/material";


export function CustomModal({ children, open, close, heading, action, size, icon, headingColor, cancelText, extraButton, iconClick, component, boxContent, onSubmit, id }) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={close}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth={size ? size : "sm"}
            >
                <DialogTitle id="scroll-dialog-title" sx={{ padding: "5px 10px" }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {icon && <IconButton onClick={iconClick}>
                                <Box component="img" src={icon} />
                            </IconButton>}
                            <Typography variant="h4" sx={{ color: headingColor || "primary.main" }}>
                                {heading}
                            </Typography>
                        </Box>
                        <IconButton onClick={close}>
                            <Box component="img" src={"/images/icons/cancel.svg"} />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent dividers={true} sx={{ width: "100%" }}>
                    <Box component={component}  {...boxContent} onSubmit={onSubmit} id={id}>
                        {children}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: "flex", flexDirection: "column", padding: "10px 20px", justifyContent: "flex-end" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <Button type='button' variant='outlined' onClick={close}>{cancelText || 'Cancel'}</Button>
                        {action}
                    </Box>
                    {extraButton}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
