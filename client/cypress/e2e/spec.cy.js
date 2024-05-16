let authToken;
Cypress.Commands.add("loginAndGetCookie", () => {
	return cy
		.request({
			method: "POST",
			url: "http://localhost:8000/login/login",
			body: {
				email: "mng@olia.com",
				password: "password123",
			},
		})
		.then((response) => {
			// Assuming your cookie name is 'authCookie'
			const id = response.headers["set-cookie"][0];
			return id.split(";")[0].split("=")[1];
		});
});

before(() => {
	cy.loginAndGetCookie().then((token) => {
		console.log(token);
		authToken = token;
	});
});

beforeEach(() => {
	// Set the cookie before each test
	cy.setCookie("id", authToken.toString());
});

describe("Home Page", () => {
	it("Should go to home page", () => {
		cy.visit("http://localhost:3000");
		cy.title().should("eq", "DSS");
	});

	it("Posts should be visible", () => {
		cy.visit("http://localhost:3000");
		cy.get("#posts").should("exist");
		cy.get("#posts").children().should("exist");
	});

	it("Create Post Button should take you to form", () => {
		cy.visit("http://localhost:3000");
		cy.contains("Create").click();
		cy.url().should("include", "/create");
	});
});

describe("Login Page", () => {
	beforeEach(() => {
		cy.clearCookies();
	});
	it("Should go to login page", () => {
		cy.visit("http://localhost:3000/login");
		cy.title().should("eq", "DSS");
	});
	it("Should fill in the login form, submit it and read the alert response of No response from the server", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("#login-email").type("notauser@notauser.com");
		cy.get("#login-password").type("asda");
		cy.get("Button[type='submit']").click();

		cy.get("#error-result").should(
			"contain",
			"Incorrect username or password"
		);
	});
	it("Should go to signup page", () => {
		cy.visit("http://localhost:3000/login");
		cy.contains("Signup").click();
	});

	it("SQL Injection", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("#login-email").type("email@email.com");
		cy.get("#login-password").type("; DROP TABLE users; --");
		cy.get("Button[type='submit']").click();
		cy.get("#error-result").should(
			"contain",
			"Incorrect username or password"
		);
	});

	it("SQL Injection", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("#login-email").type("email@email.com");
		cy.get("#login-password").type("' OR '1'='1' --");
		cy.get("Button[type='submit']").click();
		cy.get("#error-result").should(
			"contain",
			"Incorrect username or password"
		);
	});

	it("XSS", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("#login-email").type("test@test.com");
		cy.get("#login-password").type("<script>alert('XSS')</script>");
		cy.get("Button[type='submit']").click();
		cy.get("#error-result").should(
			"contain",
			"Incorrect username or password"
		);
	});

	it("Should fill in the signup form, submit it and read the alert response of No response from the server", () => {
		cy.visit("http://localhost:3000/login");
		cy.contains("Signup").click();
		cy.get("#signup-fname").type("notauser");
		cy.get("#signup-lname").type("notauser");
		cy.get("#signup-dob").type("1999-01-01");
		cy.get("#signup-email").type("notanemail@email.com");
		cy.get("#signup-password").type("password123");
		cy.get("#signup-confirm-password").type("password123");
		cy.get("#password-result").should(
			"contain",
			"Your password was exposed by a data breach on the Internet."
		);
	});

	it("Complete Login with cookie", () => {
		cy.visit("http://localhost:3000/login");
		cy.get("#login-email").type("mng@olia.com");
		cy.get("#login-password").type("password123");
		cy.get("Button[type='submit']").click();
		cy.wait(2000);
		cy.url().should("eq", "http://localhost:3000/");
		cy.getAllCookies()
			.should("have.length", 1)
			.and((cookie) => {
				expect(cookie[0]).to.have.property("name", "id");
			});
	});
});

describe("Create Post Page", () => {
	it("Should go to create post page", () => {
		cy.visit("http://localhost:3000/create");
		cy.title().should("eq", "DSS");
	});
	it("Should fill in the post form, submit it and be redirected to post page", () => {
		cy.visit("http://localhost:3000/create");
		cy.get("#post-title").type("notauser");
		cy.get("#post-desc").type("notauser");
		cy.get("input[type='submit']").click();
		cy.contains("notauser").should("exist");
	});
	it("Should fail when no cookie is present", () => {
		cy.visit("http://localhost:3000/create");
		cy.clearCookies();
		cy.get("#post-title").type("notauser");
		cy.get("#post-desc").type("notauser");
		cy.get("input[type='submit']").click();
		cy.url().should("eq", "http://localhost:3000/login");
	});
});
