import { Avatar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
export const Container = styled('div')({
  width: 300,
  padding: 25,
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const Profile = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  height: '92%',
  fontFamily: 'Monserrat'
});

export const Picture = styled(Avatar)({
  width: 180,
  height: 180,
  cursor: 'pointer',
  backgroundColor: 'gold',
  objectFit: 'contain'
});

export const Logout = styled(Button)({
  height: '6%',
  width: '100%',
  backgroundColor: 'gold',
  marginTop: 20
});

export const Watchlist = styled('div')({
  flex: 1,
  width: '100%',
  backgroundColor: 'grey',
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  overflowY: 'scroll'
});

export const Coin = styled('div')({
  padding: 10,
  borderRadius: 5,
  color: 'black',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#EEBC1D',
  boxShadow: '0 0 3px black'
});
