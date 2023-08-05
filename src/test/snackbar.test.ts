import store from "../store";
import {getSnackbarMessage, getSnackbarSeverity, isSnackbarOpen} from "./testUtils";
import {closeSnackbar, createSnackbar, MessageSeverity, SnackbarState} from "../feature/snackbar";

describe('Snackbar', () => {
    it('should allow to show the snackbar and close it again', () => {
        const initialState = store.getState();
        expect(isSnackbarOpen(initialState)).toBe(false);
        expect(getSnackbarMessage(initialState)).toBe('');
        expect(getSnackbarSeverity(initialState)).toBe('info');

        const severities: MessageSeverity[] = ['info', 'warning', 'error', 'success'];
        for (const severity of severities) {
            const snackbarState: Omit<SnackbarState, 'open'> = {
                severity,
                message: `This is a ${severity} message!`,
            }
            store.dispatch(createSnackbar(snackbarState))

            const updatedState = store.getState()
            expect(isSnackbarOpen(updatedState)).toBe(true);
            expect(getSnackbarMessage(updatedState)).toBe(snackbarState.message);
            expect(getSnackbarSeverity(updatedState)).toBe(snackbarState.severity);

            store.dispatch(closeSnackbar());

            const closedState = store.getState();
            expect(isSnackbarOpen(closedState)).toBe(false);
        }
    })
})
