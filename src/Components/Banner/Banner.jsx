import React from 'react'
import {Container, makeStyles, Typography} from "@material-ui/core"
import {Carousel} from './Carousel'
const useStyles=makeStyles(()=>({
     banner:{
         backgroundImage:"url(./banner.jpg)"
     },
     bannerContent:{
         height:300,
         display:'flex',
         paddingTop:'25',
         flexDirection:"column",
         justifyContent:"space-around"
     },
     tagline:{
         display:"flex",
         height:"40%",
         flexDirection:"column",
        justifyContent:"center",
        textAlign:"center"

     }
}))
const Banner = () => {

    const classes=useStyles()
  return (
    <div className={classes.banner} >
    <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography variant='h2' style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:"Monserrat"
                }}>
                            Crypto Hunter
                </Typography>
                <Typography variant='subtitle2'
                style={{
                    color:"darkgray",
                    textTransform:"capitalize",
                    fontFamily:"Monserrat"
                }}
                >
                    Get all the Info regarding your favorite Crypto Currencies
                </Typography>
            </div>
            <Carousel/>
    </Container>
    </div>
  )
}

export default Banner
