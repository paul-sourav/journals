const express = require('express');
const route  = express.Router();
const userController  = require("../controller/userController");




route.get("/",userController.user);

route.post('/signin',userController.signin);

route.post('/login',userController.login);

route.delete("/delete/:id",userController.deleteProfile);

route.post('/checkpassword/:id',userController.checkPassword);

route.put("/update/:id",userController.updateProfile);

route.get("/afterUpdateProfile/:id",userController.afterUpdateProfile)

module.exports = route; 