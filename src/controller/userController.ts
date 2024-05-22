
import { Request, Response } from "express";
import { User } from "../model/userModel";
import bcrypt from "bcrypt";
import { signUpvalidation } from "../validation/signUpValidation";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { logger } from "../logger";
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'artoonwork@gmail.com',
      pass: 'auth-key'
    }
  });
  
export const createUser = async (req: Request, res: Response) => {
    try {

        const checkdata = signUpvalidation(req.body);
        // logger.info('checkdata',checkdata);
        if (checkdata.error) {
            return res.status(400).json({
                success: false,
                message: checkdata.error.details[0].message
            })
        }

        var mailOptions = {
            from: 'artoonwork@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                logger.info('Email sent: ' + info.response);
            }
          }); 

        const { name, email, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const userData = await User.create({
            name,
            email,
            password: hashPassword
        });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: 'user not created'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'user created successfully',
            data: userData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: (error as Error).message
        })
    }
}
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email: email });
        // logger.info('existing user', existingUser);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            })
        }
        //    const matchPassword = password === existingUser.password;
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            })
        }
        const token = jwt.sign({ _id: existingUser._id }, 'cdmi', { expiresIn: "30s" })
        return res.status(200).json({
            success: true,
            message: 'user logged in successfully',
            data: existingUser,
            token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: (error as Error).message
        })
    }
}

export const getUser = async (req: Request, res: Response) => {

    try {
        const getData = await User.find();
        return res.status(200).json({
            success: true,
            message: 'user data fetched successfully',
            data: getData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: (error as Error).message
        })
    }
}


// export const removeData = async (req:Request,res:Response)=>{
//     try {

//         let data = await User.findByIdAndDelete();
        
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:(error as Error).message
//         })
//     }
// }


