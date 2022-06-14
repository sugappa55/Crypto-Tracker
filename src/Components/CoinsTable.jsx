import React, { useContext, useEffect, useState } from 'react'
import {Crypto} from "../Cryptocontext"
import { Container, createTheme,LinearProgress,makeStyles,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,ThemeProvider, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

import {numberWithCommas} from "./Banner/Carousel"
import { Pagination } from '@material-ui/lab'
const useStyles=makeStyles(()=>({
row:{
    backgroundColor:"#16171a",
    cursor:"pointer",
    "&:hover":{
        backgroundColor:"#131111"
    }
},
pagination:{
    "& .MuiPaginationItem-root":{
        color:"gold"
    }
}
}))
const CoinsTable = () => {
    const [page,setPage]=useState(1)
    const classes=useStyles()
    const [text,setText]=useState("")
   
    const {currency,symbol,coins,loading,getData}=useContext(Crypto)
   
    const handleSearch=()=>{
        return coins.filter(e=> e.name.toLowerCase().includes(text)||
        e.symbol.toLowerCase().includes(text))
    }

    useEffect(()=>{
            getData()
    },[currency])

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    })
    const navigate=useNavigate()
  return (
     <ThemeProvider theme={darkTheme}>
         <Container style={{textAlign:"center"}}>
                <Typography variant='h4' style={{margin:18,fontFamily:"Monserrat"}}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField variant='outlined' label="Search For a Crypto Currency..." style={{marginBottom:20,width:"100%"}}
                onChange={(e)=>setText(e.target.value)}
                />

                <TableContainer>
                    {loading?(
                        <LinearProgress style={{backgroundColor:"gold"}}/>
                    ):(
                       <Table>
                           <TableHead style={{backgroundColor:"#EEBC1D"}}>
                               <TableRow>
                               {
                                   ["Coin","Price","24h Change","Market Cap"].map(e =>{
                                       return  <TableCell style={{
                                           color:"black",
                                           fontWeight:"700"
                                       }} key={e} align={e==="Coin"?"":"right"}>
                                            {e}
                                       </TableCell>
                                   })
                               }
                               </TableRow>
                           </TableHead>
                           <TableBody>
                               {handleSearch().slice((page-1)*10,(page-1)*10+10).map(e=>{
                                   const profit=e.price_change_percentage_24h>0;

                                   return (
                                        <TableRow className={classes.row} key={e.name} onClick={()=>navigate(`/coins/${e.id}`)} >
                                            <TableCell component={"th"} 
                                                scope={"row"}
                                                style={{
                                                    display:"flex",
                                                    gap:"15px"
                                                }}
                                            >
                                                <img src={e.image} alt={e.name} height="50" style={{marginBottom:10}} />
                                                <div style={{display:"flex",flexDirection:"column"}}>
                                                    <span style={{textTransform:"uppercase",fontSize:22}}>
                                                        {e.symbol}
                                                    </span>
                                                    <span>
                                                        <span style={{color:"darkgray"}}>
                                                            {e.name}
                                                        </span>
                                                    </span>

                                                </div>
                                            
                                            </TableCell>
                                            <TableCell align="right">
                                                {symbol}{" "}{numberWithCommas(e.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align="right" 
                                            style={{
                                                color:profit>0?"green":"red",
                                                fontWeight:500
                                            }}>
                                                {profit&&"+"}
                                                {e.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">{symbol}{" "}{numberWithCommas(e.market_cap.toString().slice(0,-6))}M</TableCell>
                                        </TableRow>
                                   )
                               })}
                           </TableBody>
                       </Table>
                    )}
                </TableContainer>
                                <Pagination 
                                style={{
                                    width:"100%",
                                    padding:20,
                                    display:"flex",
                                    justifyContent:"center"
                                }}
                                classes={{ul:classes.pagination}}
                                count={(handleSearch()?.length/10)}
                                onChange={(_,value)=>{
                                    setPage(value)
                                    window.scroll(0,450);
                                }}
                                />
         </Container>
     </ThemeProvider>
   
  )
}

export default CoinsTable
