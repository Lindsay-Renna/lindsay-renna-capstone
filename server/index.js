import express from "express";
import cors from "cors";
import boardgameRoutes from "./routes/boardgames.js";
import "dotenv/config";

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
