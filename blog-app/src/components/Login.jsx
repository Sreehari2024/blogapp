import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const[formData,setFormData]=useState({
    email:'',
    password:''
  })
const navigate=useNavigate();
  function capValue(){
  // console.log(form);
  axios.post('/api/user/login',formData).then((res)=>{
    alert(res.data.message);
    if(res.data.token){
      sessionStorage.setItem('Logintoken',res.data.token)
      navigate('/home')
    }else{
      navigate('/');
    }
    }).catch((error)=>{
    alert('Invalid Login');
  })
}
  return (
    <div style={{justifyItems:'center',margin:'12%'}}>
        <Typography  variant='h3' style={{color:'purple', fontFamily:'fantasy'}}>Blog App Login</Typography><br />
    <div>
    <TextField label='email' type='text' placeholder='email' variant='outlined' name='email' onChange={(e)=>{
      setFormData({...formData,email:e.target.value})}}></TextField>
    </div><br />
    <div>
    <TextField label='password' type='password'  placeholder='password' variant='outlined' name='password' onChange={(e)=>{
      setFormData({...formData,password:e.target.value})}}></TextField>
    </div><br />
    <Button color='secondary' variant='contained' onClick={capValue}>Login</Button>
    <div><br />
        <Link to='/signup'>New User? Please Register Here.</Link>
    </div>

    </div>
  )
}

export default Login