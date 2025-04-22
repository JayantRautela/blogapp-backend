import express from "express";
import { addPost, getPosts, getSinglePost, updatePost } from "../controllers/post.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { isAuthor } from "../middleware/isAuthor";

const router = express.Router();

router.get('/getPosts', getPosts as unknown as express.RequestHandler);
router.get('/getPost/:id', getSinglePost as unknown as express.RequestHandler);
router.post('/post', isAuthenticated as unknown as express.RequestHandler, addPost as unknown as express.RequestHandler);
router.post('/update/:id', isAuthenticated as unknown as express.RequestHandler, isAuthor as unknown as express.RequestHandler, updatePost as unknown as express.RequestHandler);

export default router;