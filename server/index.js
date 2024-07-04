import express from "express";
import expressSession from "express-session";
import cors from "cors";
import boardgameRoutes from "./routes/boardgames.js";
import "dotenv/config";
import helmet from "helmet";

// Add http headers, small layer of security
import helmet from "helmet";

// Passport library and Github Strategy
import passport from "passport";
import passportGitHub from "passport-github2";
const GitHubStrategy = passportGitHub.Strategy;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/boardgames", boardgameRoutes);

const PORT = process.env.PORT || 8080;

app.get("/healthcheck", (req, res) => {
	res.send("Server is healthy");
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
