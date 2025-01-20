import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
        <Box sx={{ flexGrow:  1 }}>
    <AppBar position='static' >
      <Toolbar >

        <Typography variant="h6"  sx={{ flexGrow: 1 }} >
          Blog App
        </Typography>
    
        
        <Link to={'/home'} > <Button style={{color:'white'}}>Home</Button></Link> 
        <Link to={'/addblogs'} > <Button style={{color:'white'}}>Add Blog</Button></Link>
        <Link to={'/'} > <Button style={{color:'white'}} onClick={()=>{
          sessionStorage.removeItem('Logintoken');
        }}>Logout</Button></Link>
      
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar