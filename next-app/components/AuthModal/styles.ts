import { Modal, styled } from '@mui/material';

export const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const Paper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 400,
  color: 'white',
  borderRadius: 10
}));
