import { AppBar, Container, createTheme, MenuItem, Select, Toolbar, Typography,ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Crypto } from '../Cryptocontext'
import AuthModal from './Auth/AuthModal'
import UserSidebar from './UserSidebar'
const useStyles=makeStyles(()=>({
    title:{
        flex:1,
        color:"gold",
        fontWeight:"bold",
        cursor:'pointer'
    }
}))
const Header = () => {
    const classes=useStyles()
        const navigate=useNavigate()
        const darkTheme=createTheme({
            palette:{
                primary:{
                    main:"#fff"
                },
                type:"dark"
            }
        })

       const {currency,setCurrency,user}=useContext(Crypto)
  return (
    <ThemeProvider theme={darkTheme}>
     <AppBar color="transparent" position='static'>
        <Container>
            <Toolbar>
                <Typography className={classes.title} 
                onClick={()=>{
                    navigate("/")
                }}
                variant='h6'
                >Crypto Tracker</Typography>
                <Select variant='outlined'
                 style={{
                    width:100,
                    height:40,
                    marginRight:15
                }}
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                </Select>
                {user?<UserSidebar/>:<AuthModal/>}
            </Toolbar>
        </Container>
     </AppBar>
    </ThemeProvider>
  )
}

export default Header
