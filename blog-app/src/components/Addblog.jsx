import React, { useEffect, useState } from 'react'
import {Box, Button, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../axiosInterceptor'

const Addblog = () => {
  const [formData, setFormData] = useState({
    title: '',
    item:'',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.item && formData.description && formData.image) {
      console.log('New Blog:', formData);
      setFormData({ title: '', item: '', description: '', image: '' });
    } else {
      alert('Please fill all fields');
    }
  };

  const navigate = useNavigate();
  const location=useLocation();

  const capValue = () => {
    if(location.state!=null){
      axiosInstance.put('http://localhost:3000/edit/' +location.state.val._id,formData).then((res)=>{
        alert(res.data.message);
      navigate('/home');
      }).catch((error)=>{
        alert('error updating blog:'+error.message);
      });
      }else{
    axiosInstance.post('http://localhost:3000/addblog/add', formData).then((res) => {
        alert(res.data.message);
        navigate('/home');
      }).catch((error) => {
        alert('Error adding blog: ' + error.message);
      });
    }
  };

  useEffect(()=>{
    if(location.state!=null){
      setFormData({...formData,
        title:location.state.val.title,
        description:location.state.val.description,
        item:location.state.val.item,
        image:location.state.val.image
      })
    }else{
      setFormData({...formData,title:'',
        description:'',
        item:'',
        image:''
      })
    }

  },[])

  
  return (
    <Box sx={{ margin: '5%', padding: '2%', border: '1px solid #ccc', borderRadius: '8px' }}>
             <Typography variant="h5" gutterBottom>
         Add New Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Item"
          name="item"
          value={formData.item}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }} onClick={capValue}>
          Add Blog
        </Button>
        <div>
            <Link to={'/home'}></Link>
        </div>

      </form>
    </Box>
  )
}

export default Addblog









// import React, { useState } from 'react'
// import {Button, TextField, Typography } from '@mui/material'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Addblog = () => {
//   const [form, setForm] = useState({
//     title: '',
//     item:'',
//     description: '',
//     image: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = () => {
//     axios
//       .post('http://localhost:3000/blog/add', form)
//       .then((res) => {
//         alert(res.data.message);
//         navigate('/home');
//       })
//       .catch((error) => {
//         alert('Error adding blog: ' + error.message);
//       });
//   };
//   return (
//     <div>
//         <div style={{marginLeft:'40%',marginTop:'5%'}}>
//         <Typography variant='h4'> Add New Blog</Typography><br></br>
//         <div>
//         <TextField name="title" placeholder='Title' value={form.title} onChange={handleChange}></TextField>
//         </div><br></br>
//         <div>
//         <TextField name="item" placeholder='Item' value={form.item} onChange={handleChange}></TextField>
//         </div><br></br>
//         <div>
//         <TextField name="description" placeholder='Description' value={form.description} onChange={handleChange}></TextField>
//         </div><br></br>
//         <div>
//         <TextField name="image" placeholder='ImageURL' value={form.image} onChange={handleChange}></TextField></div><br></br>
        
//         <Button color='primary' variant='contained' onClick={handleSubmit}>Add Blog</Button>
//         <div>
//             <Link to={'/home'}></Link>
//         </div>


  

//     </div>
//     </div>
//   )
// }

// export default Addblog






