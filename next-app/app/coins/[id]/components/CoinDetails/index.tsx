import React from 'react';
import { Description, Heading, MarketData, Sidebar } from '../../styles';
import { Button, Typography } from '@mui/material';
import { numberWithCommas } from '@/utils/helpers';
import { useNavStore } from '@/store/useNavStore';
import { useSnackBarStore } from '@/store/useSnackBarStore';
import { useUserContext } from '@/providers/UserContext';
import useWatchlist from '@/hooks/useWatchlist';
import { symbols } from '@/constants';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/constants/firebase';
import { User } from 'firebase/auth';
import Image from 'next/image';

const CoinDetails = ({ data }: { data: any }) => {
  const { currency } = useNavStore();
  const { setStatus: setAlert } = useSnackBarStore();
  const user = useUserContext() as User;
  const watchlist = useWatchlist();
  const symbol = symbols[currency];

  const inWatchList = watchlist.map(itm => itm.id).includes(data?.id);
  const addToWatchlist = async () => {
    console.log(data);
    const payload = {
      id: data.id,
      name: data.name,
      current_price: data.market_data.current_price
    };
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef, { coins: watchlist ? [...watchlist, payload] : [payload] }, { merge: true });
      setAlert({
        type: 'success',
        open: true,
        message: `${data.name} Added to the Watchlist`
      });
    } catch (e) {
      setAlert({
        type: 'error',
        open: true,
        message: e.message
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(coinRef, { coins: watchlist.filter(e => e.id !== data?.id) }, { merge: true });
      setAlert({
        type: 'success',
        open: true,
        message: `${data.name} Removed from The Watchlist`
      });
    } catch (e) {
      setAlert({
        type: 'error',
        open: true,
        message: e.message
      });
    }
  };

  return (
    <Sidebar>
      <Image src={data?.image.large} alt={data?.name} height='200' width={200} style={{ marginBottom: 20 }} />
      <Heading variant='h3'>{data?.name} </Heading>
      <Description variant='subtitle1'>{data?.description?.en.slice(0, 250)}</Description>
      <MarketData>
        <span style={{ display: 'flex' }}>
          <Typography variant='h5'>Rank:</Typography>&nbsp; &nbsp;
          <Typography variant='h5'>{data?.market_cap_rank}</Typography>
        </span>
        <span style={{ display: 'flex' }}>
          <Typography variant='h5'>Current Price:</Typography>&nbsp; &nbsp;
          <Typography variant='h5'>
            {symbol} {numberWithCommas(data?.market_data.current_price[currency.toLowerCase()])}
          </Typography>
        </span>
        <span style={{ display: 'flex' }}>
          <Typography variant='h5'>Market Cap:</Typography>&nbsp; &nbsp;
          <Typography variant='h5'>
            {symbol} {numberWithCommas(data?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
          </Typography>
        </span>
        {user && (
          <Button
            variant='outlined'
            style={{
              width: '100%',
              height: 40,
              backgroundColor: inWatchList ? 'red' : 'gold',
              color: 'white'
            }}
            onClick={inWatchList ? removeFromWatchlist : addToWatchlist}>
            {!inWatchList ? 'Add To Watchlist' : 'Remove From Watchlist'}
          </Button>
        )}
      </MarketData>
    </Sidebar>
  );
};

export default CoinDetails;
