const db = require("../database/index.js");

const mapResponse = async (result, userID) => {
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
};

module.exports = { mapResponse };
