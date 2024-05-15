var expect = require("expect.js");
const request = require("supertest");
const app = require("../index.js");

describe("Testing Posts", function () {
	let postId;
	it("Create a post with missing values", async function () {
		return request(app)
			.post("/posts/createPost")
			.send()
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Title is required");
				expect(res.body.errors).to.contain("Description is required");
			});
	});

	it("Create a post with invalid inputs", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({
				title: 123,
				description: 123,
			})
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain(
					"Description must be a string"
				);
				expect(res.body.errors).to.contain("Title must be a string");
			});
	});

	it("Create a post with values less than 3 characters", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({
				title: "12",
				description: "12",
			})
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain(
					"Title must be at least 3 chars long"
				);
				expect(res.body.errors).to.contain(
					"Description must be at least 3 chars long"
				);
			});
	});

	it("SQL Injection", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({
				title: "'; DROP TABLE posts; --",
				description: "This is a description",
			})
			.expect(200)
			.then((res) => {
				expect(res.body.data).to.be.an("object");
				expect(res.body.data.message).to.be.an("string");
				expect(res.body.data.message).to.contain("Blog created");
				expect(res.body.data).to.have.property("postId");
				postId = res.body.data.postId;
			});
	});

	it("Get posts", async function () {
		return request(app)
			.post("/posts/getPosts")
			.expect(200)
			.then((res) => {
				expect(res.body.data).to.be.an("array");
				expect(res.body.data[0]).to.have.property("_id");
				expect(res.body.data[0]._id).to.be(postId);
				expect(res.body.data[0]).to.have.property("title");
				expect(res.body.data[0].title).to.contain("DROP TABLE posts;");
			});
	});
});
