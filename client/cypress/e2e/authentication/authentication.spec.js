describe("Register page", () => {
  const signUpPage = "/auth/register";

  beforeEach(() => {
    cy.visit(signUpPage);
  });

  it("Failed registration", async () => {
    const username = Cypress.env("username");
    cy.register(username, "test@gmail.com", "Password123!");
    await cy.get("form").submit();

    cy.url().should("include", signUpPage);
    cy.contains("Please complete your profile").should("not.exist");
    cy.contains("Welcome, Please fill out all fields.").should("exist");
  });

  it("Successful registration", async () => {
    const email = `test-user+${Date.now()}@example.com`;
    const username = `user${Date.now()}`;

    cy.register(username, email, "Password123!");
    await cy.get("form").submit();
    cy.url().should("eq", signUpPage);
    cy.contains("Please complete your profile").should("exist");
  });
});

describe("Logout", () => {
  it("Should remove token and redirect to login page", () => {
    cy.visit("/");
    cy.get('button[aria-label="Logout"]').click();
    cy.url().should("include", "/auth/login");
    cy.wait("@logoutRequest");
    cy.getCookie("next-auth.session-token").should("not.exist");
  });
});

describe("Login page", () => {
  const homePage = "/";
  const loginPage = "/auth/login";
  beforeEach(() => {
    cy.visit(loginPage);
  });

  it("Redirects unauthenticated user to login page (check middleware)", () => {
    cy.visit(homePage);
    cy.url().should("include", loginPage);
  });

  it("Failed login authentication", () => {
    cy.login("testuser", "Password123!");
    cy.url().should("include", loginPage);
  });

  it("Success authentication", async () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    cy.login(username, password);

    await cy.get("form").submit();
    cy.url().should("eq", Cypress.config().baseUrl);
    cy.getCookie("next-auth.session-token").should("exist");
  });
});