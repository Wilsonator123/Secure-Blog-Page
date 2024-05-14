const { getUser } = require("../accounts/account.js");
const { makeUser } = require("../accounts/accountCreation.js");
const { login } = require("../accounts/login.js");
var expect = require("expect.js");

describe("Testing User Creation", function () {
	it("Creating User with Invalid Email", async function () {
		const user = await makeUser(
			"testser.com",
			"Test",
			"User",
			"2022-12-20",
			"nuts123"
		);
		expect(user.success).to.be(false);
	});

	it("Creating User with Invalid Password", async function () {
		const user = await makeUser(
			"test@test.com",
			"Test",
			"User",
			"2022-12-20",
			"nuts"
		);
		expect(user.success).to.be(false);
	});
});
