import { Modal, styled } from '@mui/material';

export const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const Paper = styled('div')(({ theme }) => ({
  width: '400px',
  backgroundColor: theme.palette.background.paper,
  color: 'white',
  borderRadius: 10
}));
