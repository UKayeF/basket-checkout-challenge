import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type MessageSeverity = 'info' | 'warning' | 'error' | 'success';
export interface SnackbarState {
    open: boolean,
    message: string,
    severity: MessageSeverity
}

const initialState: SnackbarState = {
    open: false,
    message: '',
    severity: 'info'
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        createSnackbar(state, action: PayloadAction<Omit<SnackbarState, 'open'>>){
            const { severity, message } = action.payload;
            state.open = true;
            state.message = message;
            state.severity = severity;
        },
        closeSnackbar(state){
            state.open = false;
            state.message = '';
            state.severity = 'info';
        }
    }
})

export const { createSnackbar, closeSnackbar } = snackbarSlice.actions