const express = require('express');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

const userModel=require('../model/userData');

const jwt = require('jsonwebtoken')

router.post('/login',async(req,res)=>{
    const user =await userModel.findOne({email:req.body.email})//first "email" is the email in db
    if(!user){
        res.status(404).send({message:'User not Found'});
    }
    try {
        if(user.password==req.body.password){
            const payload = {email:user.email,password:user.password}; //Adding JWT
            const token = jwt.sign(payload,'blogApp');
            res.status(200).send({message:'Login successfull',token:token});
        }
        else{
            res.status(400).send({message:'Invalid Credentials'})
        }
    } catch (error) {
        
        console.log(error);
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { email, password, phone, address } = req.body;
  
        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }
  
        
  
        // Save the new user to the database
        const newUser = new userModel({ email, password, phone, address });
        await newUser.save();
  
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
    });





module.exports=router;
