import { Box, Button, TextField } from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Crypto } from '../../Cryptocontext'
import { auth } from '../../Firebase'

const Login = ({handleClose}) => {
    const {setAlert}=useContext(Crypto)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleSubmit=async()=>{
        if(!email||!password){
                setAlert({
                    open:true,
                    type:"error",
                    message:"Please fill all the fields "
                })
        }
        try {
            const result=await signInWithEmailAndPassword(auth,email,password)
            setAlert({
                open:true,
                type:"success",
                message:`Login Successful.Welcom ${result.user.email}`
            })
        } catch (e) {
            setAlert({
                open:true,
                type:"error",
                message:e.message
            })
        }

    }
  return (
    <Box style={{display:"flex",flexDirection:"column",gap:"20px",padding:15}}>
    <TextField  variant='outlined' type="email" label="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth/>
    <TextField  variant='outlined' type="password" label="Enter Your password" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth/>
<Button
variant='outlined'
size="large"
style={{backgroundColor:"gold"}}
onClick={handleSubmit}
>
   Login
</Button>
</Box>
  )
}

export default Login
