const jwt  = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config()
const secretkey = process.env.SECRET_KEY
const genToken = (id)=>{
    return jwt.sign({id},secretkey,{expiresIn:'30d'})
}
module.exports = genToken;