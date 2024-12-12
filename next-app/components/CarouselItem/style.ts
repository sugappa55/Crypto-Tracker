import { styled } from '@mui/material';
import Link from 'next/link';

export const CarouselItemLink = styled(Link)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'white',
  textTransform: 'uppercase'
}));
