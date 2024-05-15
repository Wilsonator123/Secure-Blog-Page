var expect = require("expect.js");
const request = require("supertest");
const app = require("../index.js");

describe("Get User", function () {
	let cookie;
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
				cookie = res.headers["set-cookie"][0];
				expect(res.body).to.be.an("object");
				expect(res.body).to.have.property("data");
				expect(res.body.data).to.be("Login successful");
			});
	});

	it("should return 200 and user data", async function () {
		return request(app)
			.post("/account/getUser")
			.set("Cookie", [cookie])
			.expect(200)
			.then((res) => {
				expect(res.body).to.have.property("data");
			});
	});

	it("should return 401 and error message", async function () {
		return request(app)
			.post("/account/getUser")
			.expect(400)
			.then((res) => {
				expect(res.body).to.have.property("errors");
				expect(res.body.errors).to.contain("Cookie 'id' not found");
			});
	});
});
