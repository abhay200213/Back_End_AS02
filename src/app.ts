import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import { HTTP_STATUS } from "./constants/httpStatus";

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req: Request, res: Response) => {
  return res.status(HTTP_STATUS.OK).json({
    status: "ok",
    message: "Support Ticket Management API is running",
  });
});

export default app;