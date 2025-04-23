import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { addComment } from "../controllers/comment.controller";

const router = express.Router();

router.get('/addComment', isAuthenticated as unknown as express.RequestHandler, addComment as unknown as express.RequestHandler);

export default router;