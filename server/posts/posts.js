const Database = require("../database/mongo.js");
const { ObjectId } = require("mongodb");
const mongo = new Database();
const isOwner = require("../utils/isOwner.js");
const db = require("../database/index.js");

async function createPost(userID, data) {
    const postId = new ObjectId();
    data = {
        _id: postId,
        title: data["title"],
        content: data["description"],
        created_at: new Date(),
        comments: data["comments"] ?? [],
        created_by: userID,
    };
    await mongo.run(mongo.create_file, "posts", data);
    return postId.toString();
}

async function getPosts(userID, args) {
	if (args?._id) {
		args["_id"] = new ObjectId(args["_id"]);
	}

	try {
		const result = await mongo.run(mongo.read_file, "posts", args);

		const modifiedResults = await Promise.all(
			result.map(async (post) => {
				post.owner = post.created_by === userID;
				const user = await db.query("getUser", [post.created_by]);
				post.created_by = user[0]?.username;

				if (post?.comments) {
					post.comments = await Promise.all(
						post.comments.map(async (comment) => {
							comment.owner = comment.created_by === userID;
							const user = await db.query("getUser", [
								comment.created_by,
							]);
							comment.created_by = user[0]?.username;
							return comment;
						})
					);
				}

				return post;
			})
		);

		return modifiedResults;
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
