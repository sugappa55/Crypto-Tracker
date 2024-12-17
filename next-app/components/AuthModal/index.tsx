import React, { useState } from 'react';
import { AppBar, Backdrop, Button, Fade, Tab, Tabs } from '@mui/material';
import Login from './components/Login';
import SignUp from './components/SignUp';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { StyledModal } from './styles';
import { Paper } from '@mui/material';
// import { auth } from '@/constants/firebase';

enum TabValues {
  SignIn = 0,
  SignUp = 1
}

export default function AuthModal() {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(TabValues.SignIn);
  const handleChange = (_: unknown, newValue: TabValues) => {
    setValue(newValue);
    console.log(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   const googleProvider = new GoogleAuthProvider();
  //   const signInWithGoogle = () => {
  //     signInWithPopup(auth, googleProvider)
  //       .then(res => {
  //         setAlert({
  //           open: true,
  //           message: `Sign Up Successful.Welcome ${res.user.email}`,
  //           type: 'success'
  //         });
  //         handleClose();
  //       })
  //       .catch(e => {
  //         setAlert({
  //           open: true,
  //           message: e.message,
  //           type: 'error'
  //         });
  //       });
  //   };

  return (
    <div>
      <Button
        variant='contained'
        style={{
          width: 85,
          height: 40,
          backgroundColor: 'gold'
        }}
        onClick={() => handleOpen()}>
        Login
      </Button>
      <StyledModal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <Paper>
            <AppBar position='static' style={{ backgroundColor: 'transparent', color: 'white' }}>
              <Tabs value={value} onChange={handleChange} variant='fullWidth' style={{ borderRadius: 10 }}>
                <Tab label='Login' />
                <Tab label='Sign Up' />
              </Tabs>
            </AppBar>
            {value === TabValues.SignIn ? <Login handleClose={handleClose} /> : <SignUp handleClose={handleClose} />}
          </Paper>
        </Fade>
      </StyledModal>
    </div>
  );
}
