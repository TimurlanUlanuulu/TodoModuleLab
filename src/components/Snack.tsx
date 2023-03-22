import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface ISnackProps{
    isOpen: boolean,
    handleClose: () => void
}

const Snack: React.FC<ISnackProps> = ({isOpen, handleClose}) => {

    return (
        <Snackbar
            open={isOpen}
            onClose={handleClose}
            autoHideDuration={3000}
        >
            <Alert severity='success'>Task have been added to completed list</Alert>
        </Snackbar>
    );
};

export default Snack;