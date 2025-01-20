import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';


const Home = () => {
   const[cardData,setData]=useState([]);
   const navigate= useNavigate();
   useEffect(()=>{
    axiosInstance.get('http://localhost:3000/addblog/blogs').then((res)=>{
       setData(res.data);
    }).catch((err)=>{
      console.log(err)
    
    })

   },[])
    
   function update_data(val){
    navigate('/addblogs',{state:{val}})

   }
   function deleteBlog(blogId) {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axiosInstance
        .delete('http://localhost:3000/addblog/delete/${blogId}')
        .then(() => {
          setData((prevData) => prevData.filter((blog) => blog._id !== blogId)); // Update state directly
          alert('Blog deleted successfully'); // Display success message
        })
        .catch(() => alert('Error deleting blog')); // Display error message
    }
  }
  
  return (
    <div style={{margin:'5%'}}>
        <Grid container spacing={2}>
            {cardData.map((row)=>(
  <Grid size={4}>
  <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={row.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {row.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {row.item}
         </Typography>
         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {row.description}
         </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={(()=>{update_data(row);
        })}>Update</Button>
         {/* <Button size="small" onClick={()=>{deleteBlog(row._id)}}>Delete </Button> */}

        <Button size="small" variant="contained" onClick={(()=>{deleteBlog(row._id);
        })}>Delete</Button>
      </CardActions>
    </Card>
  </Grid>
   ))}
  </Grid>
        
       
    </div>
  )
}

export default Home



// import React, { useEffect, useState } from 'react'
// import {  Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInterceptor';


// const Home = () => {

// const[cardData,setData]=useState([]);
// const navigate=useNavigate();
// useEffect(()=>{
//   axiosInstance.get('http://localhost:3000/addblog/blogs').then((res)=>{
//     setData(res.data);

//   }).catch((err)=>{
//     console.log(err);
//   })
// },[])

// function update_data(val){
//   navigate('/addblogs',{state:{val}})
// }
// function deleteBlog(blogId) {
//   if (window.confirm('Are you sure you want to delete this blog?')) {
//     axiosInstance
//       .delete('http://localhost:3000/addblog/delete/${blogId}')
//       .then(() => {
//         setData((prevData) => prevData.filter((blog) => blog._id !== blogId)); // Update state directly
//         alert('Blog deleted successfully'); // Display success message
//       })
//       .catch(() => alert('Error deleting blog')); // Display error message
//   }
// }
//   return (
//     <div style={{margin:'5%'}}>
//         <Grid container spacing={2}>
//         {cardData.map((row) => (
            
//   <Grid size={4}>
//   <Card sx={{ maxWidth: 405 }}>
//       <CardMedia
//         component="img"
//         sx={{height:140}}
//         image={row.image}
//       />
//       <CardContent>
        
//         <Typography gutterBottom variant="h5" component="div">
//           {row.title}
//         </Typography>
//         <Typography gutterBottom variant="h5" component="div">
//           {row.item}
//         </Typography>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           {row.description}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" variant='contained' onClick={()=>{update_data(row)}}>Update</Button>
//         <Button size="small" onClick={()=>{deleteBlog(row._id)}}>Delete </Button>
//       </CardActions>
//     </Card>
//   </Grid>
// ))}
//   </Grid>
//    </div>
//   )
// }

// export default Home




