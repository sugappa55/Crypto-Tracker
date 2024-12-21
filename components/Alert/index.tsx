'use client';

import { useSnackBarStore } from '@/store/useSnackBarStore';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = () => {
  const { message, open, setStatus, type } = useSnackBarStore();
  const handleClose = (event: unknown, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setStatus({ open: false });
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert elevation={10} variant='filled' severity={type}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
