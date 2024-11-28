describe("Authentication Flow", () => {
  const homePage = "/";
  const loginPage = "/auth/login";
  const signUpPage = "/auth/register";

  it("Redirects unauthenticated user to login page (check middleware)", () => {
    cy.visit(homePage);
    cy.url().should("include", loginPage);
  });

  it("Navigates to sign-up page and registers a new user", () => {
    cy.visit(loginPage);

    cy.contains("Sign Up").click();

    // Assert URL includes signup route
    cy.url().should("include", signUpPage);

    // Fill registration form
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("Password123!");

    // Submit form
    cy.get("form").submit();

    // Verify successful registration (e.g., redirection to login page or success message)
    cy.url().should("include", loginPage);
    cy.contains("Registration successful").should("exist");
  });

  it("Logs in with valid credentials", () => {
    // Visit the login page
    cy.visit(loginPage);

    // Fill login form
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("Password123!");

    // Submit form
    cy.get("form").submit();

    // Verify redirection to homepage after successful login
    cy.url().should("eq", Cypress.config().baseUrl + homePage);

    // Check if a token is stored (optional)
    cy.window()
      .its("localStorage")
      .invoke("getItem", "authToken")
      .should("exist");
  });
});
