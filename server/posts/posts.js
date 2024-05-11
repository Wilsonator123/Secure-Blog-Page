const Database = require("../database/mongo.js");
const { ObjectId } = require("mongodb");
const db = new Database();

async function createPost(data) {
	data = {
		title: data["title"],
		content: data["content"],
		created_at: new Date(),
		comments: data["comments"] ?? [],
	};
	return await db.run(db.create_file, "posts", data);
}

async function getPosts(args) {
	const result = await db.run(db.read_file, "posts", args);
	return result;
}

async function modifyPost(args, data) {
	return await db.run(db.write_to_file, "posts", args, { $set: data });
}

async function deletePost(data) {
	return await db.run(db.delete_file, "posts", data);
}

module.exports = {
	createPost,
	getPosts,
	deletePost,
};
