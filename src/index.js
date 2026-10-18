import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

config();
connectDB();

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("Unhandled Exception:", err);

  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.error("SIGTERM received, shutting down");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
