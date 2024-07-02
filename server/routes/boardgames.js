import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const boardgames = await knex("bgg").select("*").limit(10);
		boardgames.forEach((game) => {
			const image = JSON.parse(unescape(game.image_urls));
			const video = JSON.parse(unescape(game.video_urls));
			const mechanics = JSON.parse(unescape(game.mechanics));
			const category = JSON.parse(unescape(game.category));
			game.image_urls = image;
			game.video_urls = video;
			game.mechanics = mechanics;
			game.category = category;
		});

		res.status(200).json(boardgames);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error_code: 500, error_msg: "Failed to GET boardgame list." });
	}
});

export default router;
