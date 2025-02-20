import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import docs from "./documantation";
import router from "./routes";
import { routes_home_page } from "./utils/html.utils";

const app: Express = express();
const allowedOrigins = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(String(origin)) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Your domain not supported"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(docs));

app.get("/api/v1", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Art's corner documentation",
  });
});
app.get("/", (_req: Request, res: Response) => {
  res.send(routes_home_page);
});

export default app;
