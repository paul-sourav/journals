const userInfo = require("../models/signinModel");
const bcrypt = require("bcryptjs");
const genToken = require("../config/genToken");

const signin = async (req, resp) => {
 const {name,email,phone,password,date} = req.body;
 const salt = await bcrypt.genSalt(10)
 const genpassword= await bcrypt.hash(password,salt);
 console.log(genpassword)
 if(!name||!email||!phone||!password){
    resp.status(401).json("please fill all the fields")
 }
 try {
  const user = new userInfo({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    password:genpassword,
    date:req.body.date
   })
  const save = await user.save();
  resp.send({
    _id:save._id,
    name:save.name,
    email:save.email,
    phone:save.phone,
    data:save.date,
    token:genToken(save._id)
  })
  console.log(save)
 } catch (error) {
  resp.status(500).json(error.message)
 }
};

const login = async (req,resp) => {
  const {email,password} = req.body;
  if(!email||!password){
    resp.status(401).json("please fill all the fields")
  }
  try {
    const user = await userInfo.findOne({email:req.body.email});
    const compare = await bcrypt.compare(req.body.password,user.password);
    if(compare){
      resp.status(201).send(user)
    }
  } catch (error) {
    resp.status(500).json("something is error")
    console.log(error)
  }
};

const user = async (req, resp) => {
  const userInfo = await userInfo.find();
  resp.send(userInfo);
};

const deleteProfile = async(req,resp) =>{
try {
  const profile = await userInfo.deleteOne({_id:req.params.id});
  resp.status(201).json({result:"account deleted"});
  console.log(profile)
} catch (error) {
  console.log(error)
  resp.status(401)
}
}

const checkPassword = async(req,resp) =>{
 try {
  const user  =  await userInfo.findOne({_id:req.params.id});
  const confirm = await bcrypt.compare(req.body.password,user.password);
  if(confirm){
    resp.status(201).json({result:confirm})
    console.log(confirm)
  }
 } catch (error) {
  console.log(error)
  resp.status(401).json({result:error})
 }
}

const updateProfile = async(req,resp) =>{
try {
  const user = await userInfo.updateOne(
    {_id:req.params.id},
    {$set:{
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone
    }}
  )
  if (user){
    resp.status(201).json({result:"update sucessful"})
    console.log(user)
  }
} catch (error) {
   console.log(error)
   resp.send(error)
}
}

const afterUpdateProfile = async(req,resp) =>{
  const data =  await userInfo.findOne({_id:req.params.id})
  resp.send(data)
}

module.exports = { user, login, signin ,deleteProfile,updateProfile,checkPassword,afterUpdateProfile};
