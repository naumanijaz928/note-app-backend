import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import NoteModel from "./models/note";
dotenv.config();

const app = express();
const allowedOrigins: Array<string> = [
  "http://localhost:3001",
  "http://example2.com",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(express.json());
app.use(cors(options));

app.get("/", async (req, res) => {
  const notes = await NoteModel.find().exec();
  res.status(200).json({
    message: "server is up :)",
  });
});

export default app;
