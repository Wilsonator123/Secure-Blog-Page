var expect = require("expect.js");
const request = require("supertest");
const app = require("../index.js");

describe("Testing Posts", function () {
	it("Create a post with no title", async function () {
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

	it("Create a post with no description", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({
				title: "This is a title",
			})
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Description is required");
			});
	});

	it("Create a post with no title or description", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({})
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Title is required");
				expect(res.body.errors).to.contain("Description is required");
			});
	});

	it("Create a post with invalid title", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({
				title: 123,
				description: "This is a description",
			})
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Title must be a string");
			});
	});

	it("Create a post with invalid description", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({
				title: "This is a title",
				description: 123,
			})
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain(
					"Description must be a string"
				);
			});
	});

	it("Create a post with title less than 3 characters", async function () {
		return request(app)
			.post("/posts/createPost")
			.send({
				title: "12",
				description: "This is a description",
			})
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain(
					"Title must be at least 3 chars long"
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
			.expect(401)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Title must be a string");
			});
	});
});
