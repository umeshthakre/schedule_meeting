const User = require("../models/User");
const  mongoose = require("mongoose") ;

const createUser = (req,res)=>{
    
    const {username} = req.body;
    console.log(username);
    User.findOne({username})
    .then(user=>{
        if(!user){
            const myUser = new User({username});
            User.create({myUser})
            .then((createdUser)=>{
                return res.send({
                    message:"user created successfully",
                    success:true,
                    username:createdUser.username
                });
            })
            .catch(err=>console.log(err))
        }else{
            return res.send({
                success:false,
                message:"user with same username already exists"
            })
        }
    })
    .catch(err=>console.log(err))
}

module.exports = createUser;