import { auth } from '@/constants/firebase';
import { useSnackBarStore } from '@/store/useSnackBarStore';
import { Box, Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

const SignUp = ({ handleClose }: { handleClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { setStatus } = useSnackBarStore();
  const handleSubmit = async () => {
    if (password !== confirm) {
      setStatus({
        open: true,
        message: 'Password do not match',
        type: 'error'
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setStatus({
        open: true,
        type: 'success',
        message: `Sign Up Successfully. Welcome ${result.user.email}`
      });

      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setStatus({
        open: true,
        type: 'error',
        message: e.message as string
      });
      return;
    }
  };
  return (
    <div>
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
        <TextField
          variant='outlined'
          type='password'
          label='Confirm Your password'
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          fullWidth
        />
        <Button variant='outlined' size='large' style={{ backgroundColor: 'gold' }} onClick={handleSubmit}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
