import Image from 'next/image';

import React from 'react';
import { CarouselItemLink } from './style';
import { numberWithCommas } from '@/utils/helpers';
import { useNavStore } from '@/store/useNavStore';
import { symbols } from '@/constants';

const CarouselItem = ({
  id,
  name,
  image,
  symbol,
  current_price,
  price_change_percentage_24h
}: {
  id: string;
  name: string;
  image: string;
  symbol: string;
  price_change_percentage_24h: number;
  current_price: number;
}) => {
  const profit = price_change_percentage_24h >= 0;
  const { currency } = useNavStore();
  const currencySign = symbols[currency];
  return (
    <CarouselItemLink href={`/coins/${id}`}>
      <Image src={image} alt={name} height='80' style={{ marginBottom: 10 }} width={80} />
      <span>
        {' '}
        {symbol} &nbsp;{' '}
        <span
          style={{
            color: profit ? 'rgb(14,203,129)' : 'red',
            fontWeight: 500
          }}>
          {profit && '+'} {price_change_percentage_24h?.toFixed(2)}%
        </span>
      </span>
      <span style={{ fontSize: 22, fontWeight: 500 }}>
        {currencySign}
        {numberWithCommas(current_price.toFixed(2))}
      </span>
    </CarouselItemLink>
  );
};

export default CarouselItem;
