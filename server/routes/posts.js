const express = require("express");
const router = express.Router();
const posts = require("../posts/posts");
const { body, validationResult } = require("express-validator");
const { authorize } = require("../middleware");

router.get("/", (req, res) => {
	res.send({ data: "Blog route" });
});

router.post(
	"/createPost",
	authorize(["posts:create"]),
	body("title")
		.notEmpty()
		.withMessage("Title is required")
		.isString()
		.withMessage("Title must be a string")
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 chars long")
		.escape(),
	body("content")
		.notEmpty()
		.withMessage("Content is required")
		.isString()
		.withMessage("Content must be a string")
		.isLength({ min: 3 })
		.withMessage("Content must be at least 3 chars long")
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
			const result = await posts.createPost(req.body);

			if (result) {
				res.status(200).json({ data: "Blog created" });
			} else {
				res.status(401).json({ errors: "Blog not created" });
			}
		} catch (error) {
			console.log(error);
		}
	}
);

router.post("/deletePost", authorize(["posts:delete"]), async (req, res) => {
	try {
		const result = await posts.deletePost(req.body);

		if (result) {
			res.status(200).json({ data: "Blog deleted" });
		} else {
			res.status(401).json({ errors: "Blog not deleted" });
		}
	} catch (error) {
		console.log(error);
	}
});

router.post("/getPosts", authorize([]), async (req, res) => {
	try {
		const result = await posts.getPosts(req.body.args ?? {});

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
