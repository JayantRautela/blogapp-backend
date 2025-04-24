import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { addComment, getComments } from "../controllers/comment.controller";

const router = express.Router();

router.post('/addComment', isAuthenticated as unknown as express.RequestHandler, addComment as unknown as express.RequestHandler);
router.get('/getComments', getComments as unknown as express.RequestHandler);

export default router;