import express from "express";
import { addPost, getPosts, getSinglePost } from "../controllers/post.controller";

const router = express.Router();

router.get('/getPosts', getPosts as unknown as express.RequestHandler);
router.get('/getPost/:id', getSinglePost as unknown as express.RequestHandler);
router.post('/post', addPost as unknown as express.RequestHandler);

export default router;