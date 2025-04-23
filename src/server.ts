import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import commentRouter from "./routes/comment.route";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});