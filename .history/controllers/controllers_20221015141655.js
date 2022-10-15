const User = require("../models/User");
const  mongoose = require("mongoose") ;

const createUser = async(req,res)=>{
    try {
        const {username} = req.body;
    User.findOne({username}).then((user)=>{
    if(!user){
        const myUser = new User({username});
        User.create(myUser)
        .then((user)=>{
            return res.send({
                success:true,
                message:"user created successfully",
                username:user.username
            })
        })
        .catch((err)=>console.log(err+"from create user"))

    }

    return res.send({
        success:false,
        message:"user with username already exists"
    })
   }).catch(err=>console.log(err+"error from find user"))

    } catch (error) {
        console.log(error);
    }

}

module.exports = createUser;