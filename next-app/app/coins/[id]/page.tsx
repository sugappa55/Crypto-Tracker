'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const CoinDetail = () => {
  const { id } = useParams();
  return <div>CoinDetail - {id}</div>;
};

export default CoinDetail;
