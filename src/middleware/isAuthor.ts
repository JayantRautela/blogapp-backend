import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, RequestHandler } from "express";

const client = new PrismaClient();

export const isAuthor= async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const post = await client.post.findFirst({
            where: {
                id: id
            }
        });

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found",
                success: false
            });
        }

        if (post.id !== req.user?.id) {
            return res.status(401).json({
                message: "Access Denied: Not the author",
                success: false
            });
        }
        next();
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        return res.status(500).json({
            message: "Some Error Occured",
            success: false
        });
    }
}