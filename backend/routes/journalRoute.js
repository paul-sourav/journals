const express = require('express');
const journalRoute = express.Router();
const journalModel = require("../models/journalModel");
const multer  = require("multer");
const fs = require("fs");

const Storage  = multer.diskStorage({
    destination:(req,file,cb)=>{
        fs.existsSync("public")?null:fs.mkdirSync("public");
        fs.existsSync("public/journalImage")?null:fs.mkdirSync("public/journalImage");
        cb(null,'public/journalImage')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload  = multer({storage:Storage})

// writing journal Api 
journalRoute.post("/board",upload.single('journalImg'),async(req,resp)=>{
    const {id,date,title,text} =req.body;
    console.log(id,date,title,text)
    
    if(!id || !date ||!title ||!text){
        resp.status(401).json({result:'please fill all the fields'})
    }

    let data = new journalModel({
        id:req.body.id,
        date:req.body.date,
        title:req.body.title,
        text:req.body.text,
        image:req.file.originalname
    })

    const datasave  = await data.save();
    resp.send(datasave);
    console.log(datasave);
})

//show all journal api
journalRoute.get("/boardData/:id",async(req,resp)=>{
    const data  = await journalModel.find({id:req.params.id},null,{limit:50}).sort({date:-1});
    resp.send(data);
})

//single journal api
journalRoute.get("/singleJournal/:id",async(req,resp)=>{
    try {
        const data = await journalModel.findOne({_id:req.params.id});
        resp.send(data)
    } catch (error) {
        resp.status(401).send("error occurred")
        console.log(error)
    }
})

//deleteOne journal api
journalRoute.delete("/deleteSingle/:id",async(req,resp)=>{
    try {
        const data = await journalModel.deleteOne({_id:req.params.id});
        resp.json({result:'deleted'})
    } catch (error) {
        resp.status(401).json({result:'not deleted'})
    }
})

//update journal api 
journalRoute.put("/updateJournal/:id",upload.single('journalImg'),async(req,resp)=>{
    try {
        const date = await journalModel.updateOne(
          { _id: req.params.id },
          {$set:req.body}
        );
        resp.status(201).json({result:"update Sucessful"})
        console.log(date)
    } catch (error) {
        resp.status(401).json({result:error})
        console.log(error)
    }
})

//delete all data api
journalRoute.delete("/deleteAll/:id",async(req,resp)=>{
   try {
    const data =  await journalModel.deleteMany({id:req.params.id})
    if(data){
        resp.status(201).json({result:"deleted"})
        console.log(data)
    }
   } catch (error) {
    console.log(error)
   }
})

module.exports =journalRoute;

