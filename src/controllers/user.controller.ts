import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/password";
import { generateTokens } from "../utils/generateTokens";

const client = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const isUserExists = await client.user.findFirst({
            where: {
                email: email,
                username: username
            }
        });

        if (isUserExists) {
            return res.status(400).json({
                message: (isUserExists.username === username) ? "User with username already exists" : "User with email already exists",
                success: false
            });
        }

        const hashedPassword = hashPassword(password);

        const user = await client.user.create({
            data: {
                username: username,
                password: hashedPassword,
                email: email
            }
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user
        });
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        return res.status(500).json({
            message: "Some error occured",
            success : false,
            error: error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All fileds are required",
                success: false
            });
        }

        const isUserExists = await client.user.findFirst({
            where: {
                username: username
            }
        });

        if (!isUserExists) {
            return res.status(400).json({
                message: "user does not exists",
                success: false
            });
        }

        const isPasswordCorrect = comparePassword(isUserExists.password, password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            });
        }

        const { accessToken, refreshToken } = generateTokens({
            id: isUserExists.id,
            email: isUserExists.email,
            username: isUserExists.username
        });

        await client.user.update({
            where: {
                id: isUserExists.id
            },
            data: {
                refreshToken: refreshToken
            }
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, // for http
            sameSite: 'lax', // for http
            maxAge: 15 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // for http
            sameSite: 'lax', // for http
            maxAge: 7 * 24 * 60 * 1000
        });

        return res.status(200).json({
            message: "User Logged in successfully",
            success: true,
            user: {
                id: isUserExists.id,
                email: isUserExists.email,
                username: isUserExists.username
            },
        })
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        return res.status(500).json({
            message: "Some error occured",
            success : false,
            error: error
        })
    }
}