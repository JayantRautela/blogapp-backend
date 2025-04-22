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

export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;

        if (!id) {
            return res.status(400).json({
                message: "Id is required",
                success: false,
            });
        }

        const post = await client.post.findFirst({
            where: {
                id: id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({
                message: "Cannot find post",
                success: false
            });
        }

        return res.status(200).json({
            message: "Post fetched",
            success: true,
            post
        });
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        res.status(500).json({
            message: "Some Error Occured",
            success: false,
            error: error
        })
    }
}

export const addPost = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const authorId = req.user?.id as string;
        
        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        if (!authorId) {
            return res.status(401).json({
                message: "No author id",
                success: false
            });
        }

        const post = await client.post.create({
            data: {
                title: title as string,
                content: content as string,
                authorId: authorId,
            }
        });

        return res.status(201).json({
            message: "Post created successfully",
            success: true,
            post: post
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

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const post = await client.post.update({
            where: {
                id: id
            },
            data: {
                title: title as string,
                content: content as string,
            }
        });

        return res.status(200).json({
            message: "Post updated successfully",
            success: true
        });
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        res.status(500).json({
            message: "Some Error Occured",
            success: false,
            error: error
        })
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            return res.status(400).json({
                message: "Id is not provided",
                success: false
            });
        }

        await client.post.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            message: "Post deleted successfully",
            success: true 
        });
    } catch (error: any) {
        console.log(`Error:- ${error}`);
        res.status(500).json({
            message: "Some Error Occured",
            success: false,
            error: error
        })
    }
}