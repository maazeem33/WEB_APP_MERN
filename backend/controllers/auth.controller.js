import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup= async(req,res)=> {
    try {
        const {fullName,userName,password,confirmPassword,gender}=req.body;
        
        if(password!==confirmPassword){
            return res.status(400).json({error: "Passwords doesn't match"});
        }

        const user=await User.findOne({userName});
        if(user){
            return res.status(400).json({error: "Username already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`;
        
        const newUser=new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic: gender==="male" ? boyProfilePic: girlProfilePic
        });

        if (newUser) {

            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            });    
        } else {
            return res.status(500).json({error: "invalid user data"});
        }

    } catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(500).json({error: "internal server error"});
    }
}

export const login= async(req,res)=> {
    try {
        const {userName , password}=req.body;
        const user =await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(500).json({error: "invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            username: user.userName,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("error in login controller", error.message);
        return res.status(500).json({error: "internal server error"});
    }
}

export const logout= (req,res)=> {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message : "logged out succesfully"});
    } catch (error) {
        console.log("error in logout controller", error.message);
        return res.status(500).json({error: "internal server error"});
    }
}