import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import Jwt from 'jsonwebtoken';
export const signup= async (req,res,next)=>{
    const {username,email,password}= req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const user = new User({username,email,password:hashedPassword});
    try{
        await user.save();
    res.status(201).json({message:"User created successfully!"});
    }catch(err){
        next(err);
    }
    
}

export const signin= async (req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }
        const isValid = bcryptjs.compareSync(password,validUser.password);
        if(!isValid){
            return next(errorHandler(401,"Invalid password"));
        }
        const token = Jwt.sign({id:validUser._id},process.env.JWT_SECRET);

        res.cookie('access_token',token).status(200).json(validUser);

    }catch(err){
        next(errorHandler(err))
    }
}