'use client';

import AliceCarousel from 'react-alice-carousel';
import CarouselItem from '../CarouselItem';
import { CarouselContainer } from './styles';
import { TrendingCoins } from '@/constants/apis';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavStore } from '@/store/useNavStore';
import useFetch from '@/hooks/useFetch';

const responsive = {
  0: { items: 2 },
  512: { items: 4 }
};

export const Carousel = () => {
  const { currency } = useNavStore();

  const { data = [] } = useFetch<any[]>(TrendingCoins(currency));

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
