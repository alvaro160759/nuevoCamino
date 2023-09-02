import React from "react";
import MuiAlert from '@mui/material/Alert';

export const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});