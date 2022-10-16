import User from "../models/User";
import mongoose from "mongoose";

const createUser = async(req,res)=>{
const username = {username};
const user = await User.findOne({username});
    
}