import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from '../config/api'
import { Crypto } from '../Cryptocontext'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { chartDays } from '../config/data'
import SelectButton from './SelectButton'
ChartJS.register(...registerables);
const theme=createTheme()
const useStyles=makeStyles(()=>({
  container:{
    width:"75%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    marginTop:25,
    padding:40,
    [theme.breakpoints.down("md")]:{
      width:"100%",
      marginTop:0,
      padding:20,
      paddingTop:0
    },

  }
}))
const SingleCoinPage = ({coin}) => {
  const classes=useStyles()
    const {currency}=useContext(Crypto)
    const [chartData,setChartData]=useState(null)
    const [days,setDays]=useState(1)
    const getChart=async()=>{
            const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
            setChartData(data.prices)
    }
    useEffect(()=>{
      getChart()
    },[currency,days])

    const darkTheme=createTheme({
      palette:{
          primary:{
              main:"#fff"
          },
          type:"dark"
      }
  })
  return (
<ThemeProvider theme={darkTheme}>
  <div className={classes.container}>
    {!chartData?(<CircularProgress style={{color:"gold"}} size={250} thickness={1}/>):(<>
    <Line data={{
       labels: chartData.map((coin) => {
        let date = new Date(coin[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
      }),

      datasets: [
        {
          data: chartData.map((coin) => coin[1]),
          label: `Price ( Past ${days} Days ) in ${currency}`,
          borderColor: "#EEBC1D",
        },
      ],
    }}
    options={{
      elements: {
        point: {
          radius: 1,
        },
      },
    }}
    />

    <div style={{
      display:"flex",
      marginTop:20,
      justifyContent:"space-around",
      width:"100%"
    }}>
      {chartDays.map(e=>
        <SelectButton key={e.value} onClick={()=>setDays(e.value)}
        selected={e.value===days}
        >{e.label}</SelectButton>
      )
      
      }
    </div>
    </>)}

  </div>
</ThemeProvider>
  )
}

export default SingleCoinPage
