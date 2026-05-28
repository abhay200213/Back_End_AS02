import express, {
  Application,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import { HTTP_STATUS } from "./constants/httpStatus";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

const app: Application = express();

app.use(express.json());

app.use(morgan("dev"));

app.get(
  "/api/v1/health",
  (_req: Request, res: Response) => {
    return res.status(HTTP_STATUS.OK).json({
      status: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    });
  }
);

app.use("/api/v1/tickets", ticketRoutes);

export default app;