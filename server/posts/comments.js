const Database = require("../database/mongo.js");
const db = require("../database/index.js");
const { ObjectId } = require("mongodb");
const mongo = new Database();
const { readJWT } = require("../utils/auth");
const isOwner = require("../utils/isOwner");

const createComment = async (userID, postId, comment) => {
	try {
		postId = new ObjectId(postId);
		const data = {
			message: comment,
			comment_id: new ObjectId(),
			created_at: new Date(),
			created_by: userID,
		};

		result = await mongo.run(
			mongo.write_to_file,
			"posts",
			{ _id: postId },
			{
				$push: { comments: data },
			}
		);

		if (result.modifiedCount > 0 || result.matchedCount > 0) {
			return "Comment added";
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const deleteComment = async (userID, commentId) => {
	try {
		if (!(await isOwner(userID, "comment", commentId))) {
			return false;
		}
		commentId = new ObjectId(commentId);
		const result = await mongo.run(
			mongo.write_to_file,
			"posts",
			{ "comments.comment_id": commentId },
			{
				$pull: { comments: { comment_id: commentId } },
			}
		);

		if (result.modifiedCount > 0 || result.matchedCount > 0) {
			return "Comment deleted";
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const editComment = async (userID, commentId, comment) => {
	try {
		if (!(await isOwner(userID, "comment", commentId))) {
			return false;
		}
		commentId = new ObjectId(commentId);
		const result = await mongo.run(
			mongo.write_to_file,
			"posts",
			{ "comments.comment_id": commentId },
			{
				$set: { "comments.$.message": comment },
			}
		);

		if (result.modifiedCount > 0 || result.matchedCount > 0) {
			return "Comment edited";
		}

		return false;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const getComments = async (userID, args) => {
	try {
		if (args.postId) {
			const postId = new ObjectId(args.postId);
			const result = await mongo.run(mongo.read_file, "posts", {
				_id: postId,
			});
			if (result) {
				return result[0].comments;
			}
			return "Comments not found";
		} else if (args.commentId) {
			const commentId = new ObjectId(args.commentId);
			const result = await mongo.run(mongo.read_file, "posts", {
				"comments.comment_id": commentId,
			});
			if (result) {
				const res = result[0].comments.filter(
					(data) =>
						data.comment_id.toString() === commentId.toString()
				);
				return res;
			}
		} else {
			const result = await mongo.run(mongo.read_file, "posts", {
				"comments.created_by": userID,
			});
			if (result) {
				return result.map((res) =>
					res.comments.filter((data) => data.created_by === userID)
				);
			}
		}
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	createComment,
	deleteComment,
	editComment,
	getComments,
};
