import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel  from "../models/user.js";
 
const secret ="test";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({message:"Email not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:"Invalid password"});
        }
        const token = jwt.sign({ _id: user._id, email:user.email }, secret,{ expiresIn: "1h" });
        // res.header("auth-token", token).send(token);
        res.status(200).json({result:user,token});
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
};

export const signup = async (req, res) => {
    const { name, email, password, avatar } = req.body;
    try{
        const oldUser = await UserModel.findOne({ email });
        if(oldUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }   

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            avatar
        });

        const token = jwt.sign({ _id: result._id,email:result.email }, secret,{expiresIn: "1h"});
        res.status(201).json({
            result,
            token
        });

    }catch(err){
        res.status(500).json({
            message: "Something went wrong"
        });
        console.log(err);

    }
    
}

export const googleSignin = async (req, res) => {
    const { name, email, googleId } = req.body;
    const token = jwt.sign({ _id: googleId, email:email }, secret,{ expiresIn: "1h" });
    try{
        const oldUser = await UserModel.findOne({ email });
        if(oldUser){
            const result = {_id:oldUser._id,name:oldUser.name,email:oldUser.email};
            return res.status(200).json({result,token});
        }   

        const result = await UserModel.create({ name, email, googleId});

        res.status(200).json({result,token});
    }catch(err){
        res.status(500).json({
            message: "Something went wrong"
        });
        console.log(err);
    }
}