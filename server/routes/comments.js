const express = require("express");
const router = express.Router();
const comments = require("../posts/comments");
const { body, validationResult } = require("express-validator");
const { authorize } = require("../middleware");
const { readJWT } = require("../utils/auth");

router.post(
	"/createComment",
	authorize(["comments:create", "posts:read"]),
	body("comment")
		.notEmpty()
		.withMessage("Comment is required")
		.isString()
		.withMessage("Comment must be a string")
		.isLength({ min: 3 })
		.withMessage("Comment must be at least 3 chars long")
		.escape(),
	body("postId")
		.notEmpty()
		.withMessage("Post ID is required")
		.isString()
		.withMessage("Post ID must be a string")
		.isLength({ min: 3 })
		.withMessage("Post ID must be at least 3 chars long")
		.escape(),
	async (req, res) => {
		try {
			const userID =
				(await readJWT(req.cookies.id))?.sub ??
				new Error("Invalid user ID");
			if (userID instanceof Error) {
				res.status(401).json({ errors: userID });
				return;
			}
			const result = await comments.createComment(
				userID,
				req.body.postId,
				req.body.comment
			);
			if (result) {
				res.status(200).json({ result });
			} else {
				res.status(401).json({ errors: "Blog not updated" });
			}
		} catch (error) {
			console.log(error);
		}
	}
);

router.post(
	"/deleteComment",
	authorize(["comments:delete"]),
	body("commentId")
		.notEmpty()
		.withMessage("Comment ID is required")
		.isString()
		.withMessage("Comment ID must be a string")
		.isLength({ min: 3 })
		.withMessage("Comment ID must be at least 3 chars long")
		.escape(),
	async (req, res) => {
		try {
			const userID =
				(await readJWT(req.cookies.id))?.sub ??
				new Error("Invalid user ID");
			if (userID instanceof Error) {
				return res.status(401).json({ errors: userID });
			}
			const result = await comments.deleteComment(
				userID,
				req.body.commentId
			);
			if (result) {
				res.status(200).json({ data: "Comment deleted" });
			} else {
				res.status(401).json({ errors: "Comment not deleted" });
			}
		} catch (error) {
			console.log(error);
		}
	}
);

router.post(
	"/updateComment",
	authorize(["comments:update"]),
	body("commentId")
		.notEmpty()
		.withMessage("Comment ID is required")
		.isString()
		.withMessage("Comment ID must be a string")
		.isLength({ min: 3 })
		.withMessage("Comment ID must be at least 3 chars long")
		.escape(),
	body("comment")
		.notEmpty()
		.withMessage("Comment is required")
		.isString()
		.withMessage("Comment must be a string")
		.isLength({ min: 3 })
		.withMessage("Comment must be at least 3 chars long")
		.escape(),
	async (req, res) => {
		try {
			const userID =
				(await readJWT(req.cookies.id))?.sub ??
				new Error("Invalid user ID");
			if (userID instanceof Error) {
				return res.status(401).json({ errors: userID });
			}

			const result = await comments.editComment(
				userID,
				req.body.commentId,
				req.body.comment
			);
			if (result) {
				res.status(200).json({ data: "Comment updated" });
			} else {
				res.status(400).json({ errors: "Comment not updated" });
			}
		} catch (error) {
			console.log(error);
		}
	}
);

router.post(
	"/getComments",
	authorize(["comments:read", "posts:read"]),
	async (req, res) => {
		try {
			const userID =
				(await readJWT(req.cookies.id))?.sub ??
				new Error("Invalid user ID");
			if (userID instanceof Error) {
				return res.status(401).json({ errors: userID });
			}
			const result = await comments.getComments(userID, req.body ?? {});
			if (result) {
				res.status(200).json({ data: result });
			} else {
				res.status(401).json({ errors: "No comments found" });
			}
		} catch (error) {
			console.log(error);
		}
	}
);

module.exports = router;
