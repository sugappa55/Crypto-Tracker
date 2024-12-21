import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BannerContent = styled(Container)(() => ({
  height: 300,
  display: 'flex',
  paddingTop: '25',
  flexDirection: 'column',
  justifyContent: 'space-around'
}));

export const TagLine = styled('div')(() => ({
  display: 'flex',
  height: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center'
}));
