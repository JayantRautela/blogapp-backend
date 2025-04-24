import express from "express";
import { getUser, login, register } from "../controllers/user.controller";

const router = express.Router();

router.post('/register', register as unknown as express.RequestHandler);
router.post('/login', login as unknown as express.RequestHandler);
router.get('/getUser/:id', getUser as unknown as express.RequestHandler);

export default router;