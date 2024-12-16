import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export const Sidebar = styled('div')(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 25,
  borderRight: '2px solid grey',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const Heading = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: 20
});

export const Description = styled(Typography)({
  width: '100%',
  padding: 25,
  paddingBottom: 15,
  textAlign: 'center',
  top: 0 // Ensure this aligns with your intended usage.
});

export const MarketData = styled('div')(({ theme }) => ({
  alignSelf: 'start',
  padding: 25,
  paddingTop: 10,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.down('xs')]: {
    alignItems: 'start'
  }
}));
