import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
export const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles=makeStyles((theme)=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem:{
            display:"flex",
            flexDirection:'column',
            alignItems:"center",
            cursor:"pointer",
            textTransform:"upperCase",
            color:"white"
    }
}))
import {Crypto} from "../../Cryptocontext"
export const Carousel = () => {

const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


    const classes=useStyles()
    const {currency,symbol}=useContext(Crypto)
    const [data,setData]=useState([])
    const getTrendingCoins= async()=>{
            const {data}=await axios.get(TrendingCoins(currency))
                setData(data)
    }
  
    useEffect(()=>{
        getTrendingCoins()
    },[currency])

const items=data.map(e=>{ 
    let profit=e.price_change_percentage_24h>=0
return<Link className={classes.carouselItem} to={`/coins/${e.id}`}>
        <img src={e.image} alt={e.name} height="80" style={{marginBottom:10}} />
        <span> {e.symbol} &nbsp; <span style={{color:profit>0?"rgb(14,203,129)":"red",fontWeight:500}}>
            
            {profit&&"+"} { e.price_change_percentage_24h?.toFixed(2)}%
            </span>
            </span>
            <span style={{fontSize:22,fontWeight:500}}>{symbol}{numberWithCommas(e.current_price.toFixed(2))}</span>
</Link>})
    const responsive={
        0:{items:2},
        512:{items:4}
    }
  return (
    <div className={classes.carousel}>
      <AliceCarousel  mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items} disableButtonsControls/>
    </div>
  )
}

