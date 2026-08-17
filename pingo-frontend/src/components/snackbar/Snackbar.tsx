import * as React from "react";
import Stack from "@mui/material/Stack";
import MUISnackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import type { AlertProps } from "@mui/material/Alert";
import { useReactiveVar } from "@apollo/client/react";
import { snackVar } from "../../constants/snack";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = () => {

    const snack = useReactiveVar(snackVar)


    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        snackVar(undefined);
    };

    return (
        <>
            {
                snack && <Stack spacing={2} sx={{ width: "100%" }}>
                    <MUISnackbar
                        open={!!snack}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert
                            onClose={handleClose}
                            severity={snack?.type}
                            sx={{ width: "100%" }}
                        >
                            {snack.message}
                        </Alert>
                    </MUISnackbar>
                </Stack>
            }
        </>
    );
}

export default Snackbar