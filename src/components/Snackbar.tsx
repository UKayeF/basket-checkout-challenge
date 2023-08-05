import {Alert, Snackbar as MUISnackbar} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {closeSnackbar} from "../feature/snackbar";

export function Snackbar(){
    const dispatch = useAppDispatch();
    const { open, message, severity } = useAppSelector(
        state => state.snackbar
    )
    function handleClose(){
        dispatch(closeSnackbar())
    }
    return (
        <MUISnackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert severity={severity} sx={{ width: 300 }}>{message}</Alert>
        </MUISnackbar>
    )
}
