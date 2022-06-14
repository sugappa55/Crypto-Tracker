import { createTheme, Typography,LinearProgress, Button } from '@material-ui/core'
import { makeStyles,useTheme } from '@material-ui/styles'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { Crypto } from '../Cryptocontext'
import { numberWithCommas } from '../Components/Banner/Carousel'
import SingleCoinPage from '../Components/SingleCoinPage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase'
const theme = createTheme({
  status: {
    danger:"red"
  },
});
const useStyles=makeStyles(()=>{
  console.log(theme);

  return {container:{
    display:"flex",
    [theme.breakpoints.down('md')]:{
      flexDirection:"column",
      alignItems:"center"
    }
  },
  sidebar:{
    width:"30%",
    display:"flex",
    [theme.breakpoints.down('md')]:{
      width:"100%"
    },
    flexDirection:"column",
    alignItems:"center",
    marginTop:25,
    borderRight:"2px solid grey"
  },
  heading:{
    fontWeight:"bold",
    marginBottom:20
  },
description:{
width:"100%",
padding:25,
paddingBottom:15,
textAlign:"center",
Top:0
},
marketdata:{
  alignSelf:"start",
  padding:25,
  paddingTop:10,
  width:"100%",
  [theme.breakpoints.down("md")]:{display:"flex",justifyContent:"space-around"},
  [theme.breakpoints.down("sm")]:{flexDirection:"column",alignItems:"space-center"},
  [theme.breakpoints.down("xs")]:{alignItems:"start"},
}
}
})
const Coinpage = () => {

  const {id}=useParams()
  const [data,setData]=useState(null)
  const {symbol,currency,user,coins,watchlist,setAlert}=useContext(Crypto)
useEffect(()=>{
  GetSingleItem()
},[])
const inWatchList=watchlist.includes(data?.id)
const addToWatchlist=async()=>{
  const coinRef=doc(db,"watchlist",user.uid);
  try {
    await setDoc(coinRef,
      {coins:watchlist?[...watchlist,data?.id]:[data?.id]},
      {merge:"true"}

      )
      setAlert({
        type:"success",
        open :true,
        message:`${data.name} Added to the Watchlist`
      })
  } catch (e) {
    setAlert({
      type:"error",
      open :true,
      message:e.message
    })
  }
}

const removeFromWatchlist=async()=>{
  const coinRef=doc(db,"watchlist",user.uid);
  try {
    await setDoc(coinRef,
      {coins:watchlist.filter(e=>e!==data?.id)},
      {merge:"true"}
      )
      setAlert({
        type:"success",
        open :true,
        message:`${data.name} Removed from The Watchlist`
      })
  } catch (e) {
    setAlert({
      type:"error",
      open :true,
      message:e.message
    })
  }
}



  const GetSingleItem=async()=>{
        const {data}=await axios.get(SingleCoin(id))
        setData(data)
  }
  const classes=useStyles()
  if(!data)return  <LinearProgress style={{backgroundColor:"gold"}}/>
  return (
    <div className={classes.container}>
     <div className={classes.sidebar}>
       <img src={data?.image.large} alt={data?.name} height="200" style={{marginBottom:20}}/>
       <Typography className={classes.heading} variant="h3">{data?.name} </Typography>
       <Typography variant='subtitle1' className={classes.description}>
       </Typography>
       <div className={classes.marketdata}>
         <span style={{display:"flex"}}>
           <Typography variant="h5">Rank:</Typography>&nbsp; &nbsp;<Typography variant='h5'>{data?.market_cap_rank}</Typography>
         </span>
         <span style={{display:"flex"}}>
           <Typography variant="h5">Current Price:</Typography>&nbsp; &nbsp;<Typography variant='h5'>{symbol}{" "}{numberWithCommas(data?.market_data.current_price[currency.toLowerCase()])}</Typography>
         </span>
         <span style={{display:"flex"}}>
           <Typography variant="h5">Market Cap:</Typography>&nbsp; &nbsp;<Typography variant='h5'>{symbol}{" "}{numberWithCommas(data?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
         </span>
         {user&&(
           <Button 
           variant='outlined'
           style={{
             width:"100%",
             height:40,
             backgroundColor:inWatchList?"red":"gold"
           }}
           onClick={inWatchList? removeFromWatchlist:addToWatchlist}
           >{!inWatchList?"Add To Watchlist":"Remove From Watchlist"}</Button>
         )}
       </div>
     </div>

    <SingleCoinPage coin={data}/>     
    </div>
  )
}

export default Coinpage
