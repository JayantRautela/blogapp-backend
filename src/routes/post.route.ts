import express from "express";
import { getPosts } from "../controllers/post.controller";

const router = express.Router();

router.get('/getPosts', getPosts as unknown as express.RequestHandler);

export default router;