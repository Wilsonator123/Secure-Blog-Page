var expect = require("expect.js");
const request = require("supertest");
const app = require("../index.js");

describe("Testing User Creation", function () {
	it("Creating User without required fields", async function () {
		return request(app)
			.post("/login/createUser")
			.send({
				email: "test@test.com",
				lname: "User",
				dob: "2022-12-20",
				password: "password123",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("First name is required");
			});
	});
	it("Creating User with Invalid Email", async function () {
		return request(app)
			.post("/login/createUser")
			.send({
				email: "testtest.com",
				fname: "Test",
				lname: "User",
				dob: "2022-12-20",
				password: "password123",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Invalid email");
			});
	});

	it("Creating User with Invalid Password", async function () {
		return request(app)
			.post("/login/createUser")
			.send({
				email: "test@test.com",
				fname: "Test",
				lname: "User",
				dob: "2022-12-20",
				password: "password123",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("string");
				expect(res.body.errors).to.be("Password is not strong enough");
			});
	});

	it("Creating User with Valid Information", async function () {
		return request(app)
			.post("/login/createUser")
			.send({
				email: "test@test.com",
				fname: "Test",
				lname: "User",
				dob: "2022-12-20",
				password: "1eada1626",
			})
			.expect(200)
			.then((res) => {
				expect(res.headers).to.have.property("set-cookie");
				expect(res.headers["set-cookie"][0]).to.match(/^id/);
				expect(res.body.data).to.be.an("string");
				expect(res.body.data).to.be("User created");
			});
	});

	it("Creating User with Email already taken", async function () {
		return request(app)
			.post("/login/createUser")
			.send({
				email: "test@test.com",
				fname: "Test",
				lname: "User",
				dob: "2022-12-20",
				password: "1eada1626",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("string");
				expect(res.body.errors).to.be("Email taken");
			});
	});
});
