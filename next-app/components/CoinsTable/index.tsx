'use client';

import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { StyledPagination, StyledTableRow } from './styles';
import { numberWithCommas } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { useNavStore } from '@/store/useNavStore';
import { symbols } from '@/constants';
import useFetch from '@/hooks/useFetch';
import { CoinList } from '@/constants/apis';
import { CoinType } from '@/type';

const CoinsTable = () => {
  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  const router = useRouter();
  const { currency } = useNavStore();
  const { data: coins = [], loading } = useFetch<CoinType[]>(CoinList(currency));

  const symbol = symbols[currency];

  const handleSearch = () => {
    return coins.filter(e => e.name.toLowerCase().includes(text) || e.symbol.toLowerCase().includes(text));
  };

  return (
    <Container style={{ textAlign: 'center' }}>
      <Typography variant='h4' style={{ margin: 18, fontFamily: 'Monserrat' }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        variant='outlined'
        label='Search For a Crypto Currency...'
        style={{ marginBottom: 20, width: '100%' }}
        onChange={e => setText(e.target.value)}
      />

      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: 'gold' }} />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: '#EEBC1D' }}>
              <TableRow>
                {['Coin', 'Price', '24h Change', 'Market Cap'].map(e => {
                  return (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700'
                      }}
                      key={e}
                      align={e === 'Coin' ? undefined : 'right'}>
                      {e}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map(e => {
                  const profit = e.price_change_percentage_24h > 0;

                  return (
                    <StyledTableRow key={e.name} onClick={() => router.push(`/coins/${e.id}`)}>
                      <TableCell
                        component={'th'}
                        scope={'row'}
                        style={{
                          display: 'flex',
                          gap: '15px'
                        }}>
                        <Image src={e.image} alt={e.name} height='50' width={50} style={{ marginBottom: 10 }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ textTransform: 'uppercase', fontSize: 22 }}>{e.symbol}</span>
                          <span>
                            <span style={{ color: 'darkgray' }}>{e.name}</span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align='right'>
                        {symbol} {numberWithCommas(e.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{
                          color: profit ? 'green' : 'red',
                          fontWeight: 500
                        }}>
                        {profit && '+'}
                        {e.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align='right'>
                        {symbol} {numberWithCommas(e.market_cap.toString().slice(0, -6))}M
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <StyledPagination
        style={{
          width: '100%',
          padding: 20,
          display: 'flex',
          justifyContent: 'center'
        }}
        count={handleSearch()?.length / 10}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default CoinsTable;
