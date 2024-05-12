const Database = require("../database/mongo.js");
const { ObjectId } = require("mongodb");
const mongo = new Database();
const isOwner = require("../utils/isOwner.js");
const db = require("../database/index.js");

async function createPost(userID, data) {
	data = {
		title: data["title"],
		content: data["content"],
		created_at: new Date(),
		comments: data["comments"] ?? [],
		created_by: userID,
	};
	return await mongo.run(mongo.create_file, "posts", data);
}

async function getPosts(args) {
	if (args["_id"]) {
		args["_id"] = new ObjectId(args["_id"]);
	}

	try {
		const result = await mongo.run(mongo.read_file, "posts", args);

		return result.map(async (post) => {
			post.owner = post.created_by === userID;
			const user = await db.query("getUser", [post.created_by]);
			post.created_by = user[0]?.username;
			if (post?.comments) {
				post.comments = post.comments.map(async (comment) => {
					comment.owner = comment.created_by === userID;
					const user = await db.query("getUser", [
						comment.created_by,
					]);
					post.created_by = user[0]?.username;
					return comment;
				});
			}
			return post;
		});
	} catch (error) {
		console.log(error);
	}
}

async function modifyPost(args, postId) {
	if (await isOwner(userID, "post", postId)) {
		return await mongo.run(
			mongo.write_to_file,
			"posts",
			{ _id: new ObjectId(postId) },
			{ $set: data }
		);
	}
	return false;
}

async function deletePost(userID, postId) {
	if (await isOwner(userID, "post", postId)) {
		return await mongo.run(mongo.delete_file, "posts", {
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
