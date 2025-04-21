import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const client = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await client.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        });

        if (posts.length === 0) {
            return res.status(404).json({
                message: "No posts found",
                success: false,
                posts: []
            });
        }

        res.status(200).json({
            message: "All posts fetched",
            success: true,
            posts
        })
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        res.status(500).json({
            message: "Some Error Occured",
            success: false,
            error: error
        })
    }
}