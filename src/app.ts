import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
dotenv.config();

const app = express();
const allowedOrigins: Array<string> = [
  "http://localhost:3001",
  "http://example2.com",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(options));
app.use("/api/notes", notesRoutes);
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
