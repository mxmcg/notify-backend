import express from "express";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`🚀 notify-backend listening on http://localhost:${port}`)
);
