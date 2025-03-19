import { Request,Response } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
console.log("jwt secret",process.env.JWT_SECRET)
console.log("refresh_token",process.env.REFRESH_TOKEN_SECRET)
export const generateToken=(res:Response,userId:string,roleId:number)=>{
    const jwtsecret=process.env.JWT_SECRET;
    const refreshSecret=process.env.REFRESH_TOKEN_SECRET;
    
    if (!jwtsecret || !refreshSecret) {
        throw new Error("JWT_SECRET or REFRESH_TOKEN_SECRET is not defined in environment variables");
    }
    try{
        const accessToken=jwt.sign({userId,roleId},jwtsecret,{expiresIn:"15m"});
        const refreshToken=jwt.sign({userId},jwtsecret,{expiresIn:"30d"})
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        return{accessToken,refreshToken};
       

    }catch(error){

    }

}