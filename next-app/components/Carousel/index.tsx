import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import CarouselItem from '../CarouselItem';
import { CarouselContainer } from './styles';
import { TrendingCoins } from '@/constants/apis';
import 'react-alice-carousel/lib/alice-carousel.css';

export const Carousel = () => {
  const [data, setData] = useState([]);
  const getTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins('INR'));
    setData(data);
  };

  useEffect(() => {
    getTrendingCoins();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = data.map((item: any) => {
    return (
      <CarouselItem
        current_price={item.current_price}
        id={item.id}
        image={item.image}
        name={item.name}
        price_change_percentage_24h={item.price_change_percentage_24h}
        symbol={item.symbol}
        key={item.id}
      />
    );
  });
  const responsive = {
    0: { items: 2 },
    512: { items: 4 }
  };
  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        disableButtonsControls
        disableDotsControls
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        autoPlay
        items={items}
        
      />
    </CarouselContainer>
  );
};
