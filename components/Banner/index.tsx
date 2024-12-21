'use client';

import React from 'react';
import { BannerContent, TagLine } from './styles';
import { Typography } from '@mui/material';
import { Carousel } from './components/Carousel';

const Banner = () => {
  return (
    <div className='banner'>
      <BannerContent>
        <TagLine>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15
            }}>
            Crypto Hunter
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgray',
              // textTransform: 'capitalize'
            }}>
            Get all the Info regarding your favorite Crypto Currencies
          </Typography>
        </TagLine>
        <Carousel />
      </BannerContent>
    </div>
  );
};

export default Banner;
