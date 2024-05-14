const express = require("express");
const router = express.Router();
const posts = require("../posts/posts");
const validator = require("email-validator");
const { body, validationResult } = require("express-validator");
const { authorize } = require("../middleware");
const { readJWT } = require("../utils/auth");
const { ObjectId } = require("mongodb");

router.get("/", (req, res) => {
	res.send({ data: "Blog route" });
});

router.post(
	"/createPost",
	body("title")
		.notEmpty()
		.withMessage("Title is required")
		.isString()
		.withMessage("Title must be a string")
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 chars long")
		.escape(),
	body("description")
		.notEmpty()
		.withMessage("Description is required")
		.isString()
		.withMessage("Description must be a string")
		.isLength({ min: 3 })
		.withMessage("Description must be at least 3 chars long")
		.escape(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(401).json({
				errors: errors.array().map((error) => {
					return error.msg;
				}),
			});
		}

		try {
			const userID =
				(await readJWT(req.cookies.id))?.sub ??
				new Error("Invalid user ID");
			if (userID instanceof Error) {
				return res.status(401).json({ errors: userID });
			}
			const result = await posts.createPost(userID, req.body);

			if (result) {
				res.status(200).json({
					postId: result,
					message: "Blog created",
				});
			} else {
				res.status(401).json({ errors: "Blog not created" });
			}
		} catch (error) {
			console.log(error);
		}
	}
);

router.post(
	"/deletePost",
	authorize(["posts:delete"]),
	body("postId")
		.notEmpty()
		.withMessage("Post ID is required")
		.isString()
		.escape(),
	async (req, res) => {
		try {
			const userID =
				(await readJWT(req.cookies.id))?.sub ??
				new Error("Invalid user ID");
			if (userID instanceof Error) {
				return res.status(401).json({ errors: userID });
			}
			const result = await posts.deletePost(userID, req.body.postId);

			if (result) {
				res.status(200).json({ data: "Blog deleted" });
			} else {
				res.status(401).json({ errors: "Blog not deleted" });
			}
		} catch (error) {
			console.log(error);
		}
	}
);

router.post("/getPosts", authorize([]), async (req, res) => {
	try {
		const userID = (await readJWT(req.cookies.id))?.sub ?? "";

		const result = await posts.getPosts(userID, req.body.args ?? {});

		if (result) {
			res.status(200).json({ data: result });
		} else {
			res.status(401).json({ errors: "No posts found" });
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
