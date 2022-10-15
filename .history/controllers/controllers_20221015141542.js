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
            return res.status(200).send({
                success:true,
                message:"user created successfully",
                username:user.username
            })
        })
        .catch((err)=>console.log(err+"from create user"))

    }

    return res.status(400).send({
        success:false,
        message:"user with username already exists"
    })
   })
console.log(user);
   



    } catch (error) {
        console.log(error);
    }

}

module.exports = createUser;