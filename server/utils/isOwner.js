const mongo = require("../database/mongo");
const { ObjectId } = require("mongodb");
const db = new mongo();

async function isOwner(userID, type, id) {
	if (type === "post") {
		const post = await db.run(db.read_file, "posts", {
			_id: new ObjectId(id),
		});
		if (post[0].created_by === userID) {
			return true;
		}
		return false;
	}
	if (type === "comment") {
		const result = await db.run(db.read_file, "posts", {
			"comments.comment_id": new ObjectId(id),
		});
		if (result) {
			const res = result[0].comments.filter(
				(data) =>
					data.comment_id.toString() === id &&
					data.created_by === userID
			);
			if (res.length > 0) {
				return true;
			}
		}
		return false;
	}
}

module.exports = isOwner;
