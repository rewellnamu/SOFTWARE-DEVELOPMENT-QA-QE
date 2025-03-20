import asyncHandler from "@app/middlewares/asyncHandler";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from "express";
import pool from '@app/db/db.config'
import { generateToken } from "@app/utils/helpers/generateToken";




export const registerUser = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {name,email,password,role_id} = req.body;
        const user = await pool.query("select * from users where email=$1",[email]);
        if(user.rows.length > 0){
            return res.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query("insert into users (name,email,password_hash,role_id) values ($1,$2,$3,$4) returning*",[name,email,hashedPassword,role_id])
        generateToken(res,newUser.rows[0].id,newUser.rows[0].role_id);
        res.status(201).json({
            message:"User created successfully",
            user:newUser.rows[0]
        })

    }catch(error){
        console.log(error);
    }

});
export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    // Check if user exists
    // Check if user exists
    const userQuery = await pool.query(
        `SELECT users.user_id, users.name, users.email, users.password_hash, users.role_id, user_role.role_name
         FROM users
         JOIN user_role ON users.role_id = user_role.role_id
         WHERE email = $1`,
        [email]
    );

    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    //query the user  
    const user = userQuery.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    //generate JWT token 
    await generateToken(res, user.user_id, user.role_id);
    // await console.log("😐😐", req.cookies)


    res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name
        }
    });

    //next();
}) 
