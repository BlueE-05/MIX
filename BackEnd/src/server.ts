import express from "express";
import cors from "cors";
import signupRoutes from "./routes/user.routes";
import auth0Routes from "./routes/auth0.routes";
import teamRoutes from "./routes/team.routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/api", signupRoutes);
app.use("/api", auth0Routes);
app.use("/api", teamRoutes);

app.listen(4000, () => {
  console.log("Server running at PORT 4000");
});