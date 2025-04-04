import express from "express";
import cors from "cors";
import userRoutes from "./routes/user";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api", userRoutes);

app.listen(4000, () => {
  console.log("Server running at PORT 4000");
});