import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Avatar, Button} from "@material-ui/core"
import {useContext} from "react"
import {Crypto} from "../Cryptocontext"
import { signOut } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { numberWithCommas } from './Banner/Carousel';
import {AiFillDelete} from "react-icons/ai"
import { doc, setDoc } from 'firebase/firestore';
const useStyles = makeStyles({
 container:{
   width:300,
   padding:25,
   height:"100%",
   display:"flex",
   flexDirection:"column"
 },
 profile:{
   flex:1,
   display:"flex",
   flexDirection:"column",
   alignItems:"center",
   gap:"20px",
   height:"92%",
   fontFamily:"Monserrat"
 },
 picture:{
   width:180,
   height:180,
   cursor:"pointer",
   backgroundColor:"gold",
   objectFit:"contain"
 },
 logout:{
   height:"6%",
   width:"100%",
   backgroundColor:"gold",
   marginTop:20
 },
 watchlist: {
  flex: 1,
  width: "100%",
  backgroundColor: "grey",
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll",
},
coin: {
  padding: 10,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
},
});

export default function UserSidebar() {
    const {user,setAlert,watchlist,coins,symbol}=useContext(Crypto)
  const classes = useStyles();
  const [state, setState] = React.useState({
   
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut=()=>{
    signOut(auth)
    setAlert({
      open:true,
      type:"success",
      message:"Logout Successful"
    })
    toggleDrawer()
  }
  
  const removeFromWatchlist=async(data)=>{
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
 

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
          style={{
              height:38,
              width:38,
              cursor:"pointer",
                backgroundColor:"gold"
          }}
          src={user.photoURL}
          alt={user.displayName||user.email}
          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>

          <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar className={classes.picture}
                src={user.photoURL}
                alt={user.displayName||user.email}
                />
                  <span style={{
                    width:"100%",
                    fontSize:25,
                    textAlign:"center",
                    fontWeight:"bolder",
                    wordWrap:"break-word"
                  }}>{user.displayName||user.email}</span>
                  <div className={classes.watchlist}>
                    <span style={{fontSize:15,textShadow:"0 0 5px black"}}>Watchlist</span>
                    {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                  </div>

              </div>
              <Button variant='contained' className={classes.logout} onClick={logOut}>Logout</Button>
          </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
