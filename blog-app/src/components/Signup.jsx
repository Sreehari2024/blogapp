// import { Button, TextField, Typography } from '@mui/material'
// import Grid from '@mui/material/Grid2'
// import axios from 'axios'
// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const Signup = () => {

//   const navigate = useNavigate();
//   const capValue = () => {
//     axios.post('http://localhost:3000/signup/add', formData).then((res) => {
//         alert(res.data.message);
//         navigate('/home');
//       }).catch((error) => {
//         alert('Error adding blog: ' + error.message);
//       });
//   };

//   return (
//     <div>
        
// <Grid container spacing={2} marginTop={5} padding={3}>
// <Typography variant='h4' style={{marginLeft:'40%'}}> BlogApp Register</Typography><br></br>
//       <Grid size={{ xs: 6, md: 6 }}>
//         <TextField fullWidth label='Username' variant='outlined'></TextField>
//       </Grid>
//       <Grid size={{ xs: 6, md: 6 }}>
//         <TextField fullWidth label='Email' variant='outlined'></TextField>
//       </Grid>
//       <Grid size={{ xs: 6, md: 6 }}>
//         <TextField fullWidth label='Password' variant='outlined'></TextField>
//       </Grid>
//       <Grid size={{ xs: 6, md: 6 }}>
//         <TextField fullWidth label='Phone' variant='outlined'></TextField>
//       </Grid>
//       <Grid size={{ xs: 12, md: 12 }}>
//         <TextField fullWidth label='Address' variant='outlined' multiline rows={4}></TextField>
//       </Grid>
//       <Grid size={{xs:12, md: 12}}>
//       <Button color='primary' variant='contained' onClick={capValue}>Register</Button>
//       </Grid>
//       <Grid size={{xs:12, md: 12}}>
//         <Link to='/' style={{color:'blue'}}>Already Registerd? Login Here</Link>
//       </Grid>
//     </Grid>
//   </div>
//   )
// }

// export default Signup



import { Button, TextField,Typography } from '@mui/material'
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    const { email, password,  phone, address } = form;

    
    axios.post('http://localhost:3000/user/signup',{ email, password, phone, address }).then((res) => {
        alert(res.data.message);
      }).catch((error) => {
        const errorMsg = error.response?.data?.message || 'Registration failed.';
        alert(errorMsg);
      });
  };
  return (
    <div style={{margin:'10%'}}>
        <Typography variant='h4' style={{marginLeft:'40%'}}> BlogApp Register</Typography><br></br>
         <Grid container spacing={2}>
  <Grid size={{xs:6,md:6}}>
  <TextField fullWidth name="email" placeholder='email' variant='outlined' value={form.email}
            onChange={handleChange}></TextField>
  </Grid>
  <Grid size={{xs:6,md:6}}>
  <TextField fullWidth name="password" placeholder='password' variant='outlined' value={form.password}
            onChange={handleChange}></TextField>
  </Grid>
  <Grid size={{xs:6,md:6}}>
  <TextField fullWidth name="confirmPassword" placeholder='Confirmpassword' variant='outlined' value={form.confirmPassword}
            onChange={handleChange}></TextField>
  </Grid>
  <Grid size={{xs:6,md:6}}>
  <TextField fullWidth name="phone" placeholder='phone' variant='outlined'  value={form.phone}
            onChange={handleChange}></TextField>
  </Grid>
  <Grid size={{xs:12,md:12}}>
  <TextField fullWidth name="address" placeholder='address' variant='outlined' value={form.address}
            onChange={handleChange} multiline rows={4}></TextField>
  </Grid>
  <Button color='primary' variant='contained' onClick={handleSignup} style={{marginLeft:'45%'}}>SignUp</Button><br></br>
  <Grid size={{xs:12,md:12}}> 
    <Link to={'/'} style={{marginLeft:'40%'}}>Already Registered?Login Here</Link>
  </Grid>
  </Grid> 
  <div>
              <Link to={'/blogs'}>New user?Click here to SignUp</Link>
          </div>
    </div>
  )
}

export default Signup



