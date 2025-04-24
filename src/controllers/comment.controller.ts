import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const client = new PrismaClient();

export const addComment = async (req: Request, res: Response) => {
    try {
        const { description, postId } = req.body;
        const userId = req.user?.id;

        if (!description || !postId) {
            return res.status(400).json({
                message: "All fileds are required",
                success: false
            });
        }

        if (!userId) {
            return res.status(400).json({
                message: "User Id is required",
                success: false
            });
        }

        const post = await client.post.findFirst({
            where: {
                id: postId
            }
        });

        if (!post) {
            return res.status(400).json({
                message: "Post not found",
                success: false
            });
        }

        const comment = await client.comment.create({
            data: {
                postId: postId as string,
                description: description as string,
                userId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
                post: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            }
        });

        return res.status(201).json({
            message: "comment added successfully",
            success: true,
            data: comment
        });
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        return res.status(500).json({
            message: "Some error occured",
            success: false
        });
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;

        if (!postId) {
            return res.status(400).json({
                message: "Post id is required",
                success: false
            });
        }

        const comments = await client.comment.findMany({
            where: {
                postId: postId
            },
            include: {
                user: {
                    select: {
                        username: true,
                    }
                }
            }
        });

        if (comments.length === 0) {
            return res.status(200).json({
                message: "No comments available for this video",
                success: true,
                comments: []
            });
        }

        return res.status(200).json({
            message: "All comments fteched",
            success: true,
            comments: comments
        })
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        return res.status(500).json({
            message: "Some error occured",
            success: false
        });
    }
}