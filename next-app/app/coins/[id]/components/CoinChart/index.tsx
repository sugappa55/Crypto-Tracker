import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useNavStore } from '@/store/useNavStore';
import useFetch from '@/hooks/useFetch';
import { HistoricalChart } from '@/constants/apis';
import { Container, StyledButton } from './style';
import { chartDays } from '@/constants';
import { CircularProgress } from '@mui/material';

ChartJS.register(...registerables);

const CoinChart = ({ coin }) => {
  const { currency } = useNavStore();
  const [days, setDays] = useState(1);

  const { data, loading } = useFetch<{
    prices: any[];
  }>(HistoricalChart(coin.id, days, currency));

  const chartData = data?.prices || [];

  return (
    <Container>
      {loading ? (
        <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: chartData.map(coin => {
                const date = new Date(coin[0]);
                const time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: chartData.map(coin => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: '#EEBC1D'
                }
              ]
            }}
            options={{
              elements: {
                point: {
                  radius: 1
                }
              }
            }}
          />

          <div
            style={{
              display: 'flex',
              marginTop: 20,
              justifyContent: 'space-around',
              width: '100%'
            }}>
            {chartDays.map(option => (
              <StyledButton
                selected={option.value === days}
                variant={option.value === days ? 'contained' : 'outlined'}
                key={option.value}
                onClick={() => setDays(option.value)}>
                {option.label}
              </StyledButton>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default CoinChart;
