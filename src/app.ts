import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";

import env from "./util/validateEnv";
import { requiresAuth } from "./middleware/auth";

const app = express();
const allowedOrigins: Array<string> = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://example2.com",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(options));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.DB_URL,
    }),
  })
);
app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);
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
