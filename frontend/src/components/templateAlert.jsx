import { Alert, Snackbar } from "@mui/material"
import { useState } from "react";

export const TemplateAlert = ({ info, setInfo, severity }) => {

    const [openSnackBar, setOpenSnackBar] = useState(true)

    function handleCloseSnackBar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setInfo(null)
        setOpenSnackBar(false);
    }

    return (
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity={severity} sx={{ width: 500 }}>
                {info}
            </Alert>
        </Snackbar>
    )
}