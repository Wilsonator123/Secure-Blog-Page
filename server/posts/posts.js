const Database = require("../database/mongo.js");
const { ObjectId } = require("mongodb");
const db = new Database();
const isOwner = require("../utils/isOwner.js");

async function createPost(userID, data) {
	data = {
		title: data["title"],
		content: data["content"],
		created_at: new Date(),
		comments: data["comments"] ?? [],
		created_by: userID,
	};
	return await db.run(db.create_file, "posts", data);
}

async function getPosts(userID, args) {
	const result = await db.run(db.read_file, "posts", args);
	return result.map((post) => {
		post.owner = post.created_by === userID;
		if (post?.comments) {
			post.comments = post.comments.map((comment) => {
				comment.owner = comment.created_by === userID;
				return comment;
			});
		}
		return post;
	});
}

async function modifyPost(args, postId) {
	if (await isOwner(userID, "post", postId)) {
		return await db.run(
			db.write_to_file,
			"posts",
			{ _id: new ObjectId(postId) },
			{ $set: data }
		);
	}
	return false;
}

async function deletePost(userID, postId) {
	if (await isOwner(userID, "post", postId)) {
		return await db.run(db.delete_file, "posts", {
			_id: new ObjectId(postId),
		});
	} else {
		return false;
	}
}

module.exports = {
	createPost,
	getPosts,
	deletePost,
};
