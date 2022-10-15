import User from "../models/User";
import mongoose from "mongoose";

const createUser = async(req,res)=>{
const username = {username};
const user = await User.findOne({username});
    if(!user){
        const myUser = new User(username);

        User.create(myUser)
        .then((res)=>{
            return res.status(200).send({
                success:true,
                message:"user created successfully",
                username:res.username
            })
        })
        .catch((err)=>console.log(err))

    }
}