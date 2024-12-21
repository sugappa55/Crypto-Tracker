import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: 0,
    padding: 20,
    paddingTop: 0
  }
}));

export const StyledButton = styled(Button)<{ selected: boolean }>(({ selected, theme }) => ({
  border: '1px solid gold',
  borderRadius: 5,
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  cursor: 'pointer',
  color: selected ? 'black' : theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'gold',
    color: 'black'
  },
  width: '22%'
}));
