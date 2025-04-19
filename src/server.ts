import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});