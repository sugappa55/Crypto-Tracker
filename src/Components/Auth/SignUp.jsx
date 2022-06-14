import { Box, Button, TextField } from '@material-ui/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Crypto } from '../../Cryptocontext'
import { auth } from '../../Firebase'

const SignUp = ({handleClose}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirm,setConfirm]=useState("")
    const {setAlert}=useContext(Crypto)
    const handleSubmit=async()=>{
        if(password!==confirm){
            setAlert({
                open:true,
                message:"Password do not match",
                type:"error"
            })
            return 
        }

        try {
            const result=await createUserWithEmailAndPassword(auth,email,password)
            setAlert({
                open:true,
                type:"success",
                message:`Sign Up Successfully. Welcome ${result.user.email}`
            })

            handleClose()
        } catch (e) {
            setAlert({
                open:true,
                type:"error",
                message:e.message
            })
            return 
        }

    }
  return (
    <div>
      <Box style={{display:"flex",flexDirection:"column",gap:"20px",padding:15}}>
          <TextField  variant='outlined' type="email" label="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth/>
          <TextField  variant='outlined' type="password" label="Enter Your password" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth/>
          <TextField  variant='outlined' type="password" label="Confirm Your password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} fullWidth/>
      <Button
      variant='outlined'
      size="large"
      style={{backgroundColor:"gold"}}
      onClick={handleSubmit}
      >
          Sign Up
      </Button>
      </Box>
    </div>
  )
}

export default SignUp
