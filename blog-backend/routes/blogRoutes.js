const express = require('express');
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken')
const blogModel = require('../model/blogData');


function verifytoken(req,res,next){           
    let token=req.headers.token;
    console.log(token)
    try {
        if(!token) throw 'Unauthorized access';
        else{
            let payload=jwt.verify(token,'blogApp');
            if(!payload) throw 'Unauthorized access';
            next();
        }
    } catch (error) {
        console.log('Error');
        
    }
}
    
    router.get('/blogs', verifytoken,async (req, res) => {
        try {
            const data = await blogModel.find();
            res.status(200).send(data);
        } catch (error) {
            res.status(404).send('Data not found');
        }
    });

    

router.post('/add',verifytoken, async (req, res) => {
        try {
            const item = req.body;
            const data = new blogModel(item);
            await data.save();
            res.status(201).json({message:"Blog post successfully",blog:data});
            // res.redirect('/blogs');
        } catch (error) {
            console.error('Error adding blogs',error);
            res.status(500).json({message:"post unsuccessful"});
        }
    });

    


        router.put('/edit/:id',verifytoken, async (req, res) => {
            try {
                const { id } = req.params;
                const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
                res.json(updatedBlog);
            } catch (error) {
                res.status(400).json({ message: 'Error updating blog', error });
            }
        });
        

        router.delete('/delete/:id',verifytoken, async (req, res) => {
            try {
              const blog = await blogModel.findByIdAndDelete(req.params.id);
              if (blog) {
                res.status(200).json({ message: 'Blog deleted successfully' });
              } else {
                res.status(404).json({ message: 'Blog not found' });
              }
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Error deleting blog' });
            }
          });
        



        module.exports = router;
        
    




