import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { CoinList } from './config/api'
import { auth, db } from './Firebase'

export const Crypto=createContext()

export const Cryptocontext = ({children}) => {
   const [currency,setCurrency]=useState('INR')
   const [symbol,setSymbol]=useState('₹')
     const [watchlist,setWatchList]=useState([])
   const [coins,setCoins]=useState([])
   const [user,setUser]=useState(null)
   const [alert,setAlert]=useState({
        open:false,
        message:"",
        type:"success"
   })
   const [loading,setLoading]=useState(false)
   const getData=async()=>{
     setLoading(true)
         const {data}=await axios.get(CoinList(currency))
         setCoins(data)
         setLoading(false)
 }

   useEffect(()=>{
        if(currency==="INR")setSymbol("₹")
        else setSymbol("$")
   },[currency])
          useEffect(()=>{
               onAuthStateChanged(auth,(user)=>{
                         if(user)setUser(user)
                         else setUser(null)
               })
          },[])

     useEffect(()=>{
          if(user){
               const coinRef=doc(db,"watchlist",user.uid);
               var unSubscribe= onSnapshot(coinRef,(coin)=>{
                    if(coin.exists()){
                         setWatchList(coin.data().coins)
                    }
                    else {
                         console.log("No Items In The Watchlist");
                    }
               })
               
               return ()=>{
                    unSubscribe()
               }
          }
     },[user])
    return (
   <Crypto.Provider value={{currency,symbol,setCurrency,coins,loading,getData,user,alert,setAlert,watchlist}}>{children}</Crypto.Provider>
  )
}


