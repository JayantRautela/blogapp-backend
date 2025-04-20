import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001

app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});