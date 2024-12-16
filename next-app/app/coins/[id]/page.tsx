'use client';

import { useParams } from 'next/navigation';

import { LinearProgress } from '@mui/material';
import { Container } from './styles';
import useFetch from '@/hooks/useFetch';
import { SingleCoin } from '@/constants/apis';
import CoinChart from './components/CoinChart';
import CoinDetails from './components/CoinDetails';

const Coinpage = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(SingleCoin(id as string));

  if (loading) return <LinearProgress />;
  return (
    <Container>
      <CoinDetails data={data} />
      <CoinChart coin={data} />
    </Container>
  );
};

export default Coinpage;
