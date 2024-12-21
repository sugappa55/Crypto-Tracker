import React from 'react';
import { Description, Heading, MarketData, Sidebar } from '../../styles';
import { Button, Typography } from '@mui/material';
import { numberWithCommas } from '@/utils/helpers';
import { useNavStore } from '@/store/useNavStore';
import { useUserContext } from '@/providers/UserContext';
import useWatchlist from '@/hooks/useWatchlist';
import { symbols } from '@/constants';
import { User } from 'firebase/auth';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import { FlexBox } from '@/styles';

const CoinDetails = ({ data }: { data: any }) => {
  const { currency } = useNavStore();
  const user = useUserContext() as User;
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const symbol = symbols[currency];

  const inWatchList = watchlist.map(itm => itm.id).includes(data?.id);

  const handleClickWatchList = () => {
    if (inWatchList) removeFromWatchlist({ id: data.id, name: data.name });
    else addToWatchlist({ id: data.id, name: data.name, current_price: data.market_data.current_price });
  };

  return (
    <Sidebar>
      <Image src={data?.image.large} alt={data?.name} height='200' width={200} style={{ marginBottom: 20 }} />
      <Heading variant='h3'>{data?.name} </Heading>
      <Description variant='subtitle1'>{ReactHtmlParser(data?.description?.en.slice(0, 300))}</Description>
      <MarketData>
        <FlexBox>
          <Typography variant='h5'>Rank:</Typography>&nbsp; &nbsp;
          <Typography variant='h5'>{data?.market_cap_rank}</Typography>
        </FlexBox>
        <FlexBox>
          <Typography variant='h5'>Current Price:</Typography>&nbsp; &nbsp;
          <Typography variant='h5'>
            {symbol} {numberWithCommas(data?.market_data.current_price[currency.toLowerCase()])}
          </Typography>
        </FlexBox>
        <FlexBox>
          <Typography variant='h5'>Market Cap:</Typography>&nbsp; &nbsp;
          <Typography variant='h5'>
            {symbol} {numberWithCommas(data?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
          </Typography>
        </FlexBox>
        {user && (
          <Button
            variant='contained'
            fullWidth
            color={inWatchList ? 'error' : 'primary'}
            onClick={handleClickWatchList}>
            {!inWatchList ? 'Add To Watchlist' : 'Remove From Watchlist'}
          </Button>
        )}
      </MarketData>
    </Sidebar>
  );
};

export default CoinDetails;
