const express=required('express');
const router=express.Router();
const chat=require('../models/Chat');
//Save a caht message
router.post('/',async (req, res) =>{
    try{
        const{ sender,message } =req.body;
        const newChat =new chat({sender,message});
        await new chat.save();
        res.status(201).json({success:true,chat:newChat});
    }catch(err){
        res.status(500).json({success:false,error:err.message});
    }
});

//Get all chat messages
router.post('/',async (req, res) =>{
    try{
        const chats=await chat.find().sort({timestamp:1});
        //Sort by oldest to Newest
        res.status(200).json({success:true,chats });
    }catch(err){
        res.status(500).json({success:false,error:err.message});
    }
});
module.exports=router;