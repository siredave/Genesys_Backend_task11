import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectToDb from "./database/db";
import noteRoutes from "./routes/noteRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

connectToDb();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Error Handler Middleware
app.use(errorHandler);

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Welcome to the note taking api");
});

app.get("/test", (req: express.Request, res: express.Response) => {
    res.send("This is a test page");
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});