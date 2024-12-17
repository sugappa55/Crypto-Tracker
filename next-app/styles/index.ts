import { styled } from '@mui/material';
import { CSSProperties } from 'react';

export const FlexBox = styled('div')<Pick<CSSProperties, 'justifyContent' | 'alignItems' | 'flexDirection' | 'gap'>>(
  ({ justifyContent = 'flex-start', alignItems = 'center', flexDirection = 'row', gap }) => ({
    display: 'flex',
    justifyContent,
    alignItems,
    flexDirection,
    gap
  })
);
