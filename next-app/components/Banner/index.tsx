'use client';

import React from 'react';
import { BannerContent, TagLine } from './styles';
import { Typography } from '@mui/material';
import { Carousel } from '../Carousel';

const Banner = () => {
  return (
    <div>
      <BannerContent>
        <TagLine>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Monserrat'
            }}>
            Crypto Hunter
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgray',
              textTransform: 'capitalize',
              fontFamily: 'Monserrat'
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
