var expect = require("expect.js");
const request = require("supertest");
const app = require("../index.js");

describe("Testing Login", function () {
	it("Login with invalid email", async function () {
		return request(app)
			.post("/login/login")
			.send({
				email: "notanemail",
				password: "apassword",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Invalid email");
			});
	});
	it("Login with invalid password", async function () {
		return request(app)
			.post("/login/login")
			.send({
				email: "test@test.com",
				password: "nottherightpassword",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("string");
				expect(res.body.errors).to.be("Email or Password incorrect");
			});
	});
	it("Login with valid credentials", async function () {
		return request(app)
			.post("/login/login")
			.send({
				email: "test@test.com",
				password: "1eada1626",
			})
			.expect(200)
			.then((res) => {
				expect(res.headers).to.have.property("set-cookie");
				expect(res.headers["set-cookie"][0]).to.match(/^id/);
				expect(res.body).to.be.an("object");
				expect(res.body).to.have.property("data");
				expect(res.body.data).to.be("Login successful");
			});
	});

	it("Attempt SQL Injection", async function () {
		return request(app)
			.post("/login/login")
			.send({
				email: " '; DROP TABLE users; --",
				password: "password",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("array");
				expect(res.body.errors).to.contain("Invalid email");
			});
	});

	it("Attempt SQL Injection", async function () {
		return request(app)
			.post("/login/login")
			.send({
				email: "test@test.com",
				password: "'; DROP TABLE users; --",
			})
			.expect(400)
			.then((res) => {
				expect(res.body.errors).to.be.an("string");
				expect(res.body.errors).to.be("Email or Password incorrect");
			});
	});
});
