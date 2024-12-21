import React, { useState } from 'react';
import { auth } from '@/constants/firebase';
import { useSnackBarStore } from '@/store/useSnackBarStore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Box, Button, TextField } from '@mui/material';

const Login = ({ handleClose }: { handleClose: () => void }) => {
  const { setStatus } = useSnackBarStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    if (!email || !password) {
      setStatus({
        open: true,
        type: 'error',
        message: 'Please fill all the fields '
      });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setStatus({
        open: true,
        type: 'success',
        message: `Login Successful.Welcom ${result.user.email}`
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setStatus({
        open: true,
        type: 'error',
        message: e.message as string
      });
    } finally {
      handleClose();
    }
  };
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: 15 }}>
      <TextField
        variant='outlined'
        type='email'
        label='Enter Your Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type='password'
        label='Enter Your password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant='outlined' size='large' style={{ backgroundColor: 'gold' }} onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
