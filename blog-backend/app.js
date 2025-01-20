const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app=new express();
app.use(morgan('dev'))
app.use(cors());

const blogRoutes=require('./routes/blogRoutes');
app.use('/addblog',blogRoutes);
const userRoutes=require('./routes/userRoutes')
app.use('/user',userRoutes);


require('dotenv').config();
require('./db/connection');

// app.set('view engine','ejs');
// app.set('views',__dirname+'/views');
app.use(express.static('public'));



app.listen(process.env.PORT,() => {
    console.log(`Server started on PORT ${process.env.PORT}`);
});
