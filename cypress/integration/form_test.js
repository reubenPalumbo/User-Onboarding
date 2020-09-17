//  Get the Name input and type a name in it.
//  Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
//  Get the Email input and type an email address in it
//  Get the password input and type a password in it
//  Set up a test that will check to see if a user can check the terms of service box
//  Check to see if a user can submit the form data
//  Check for form validation if an input is left empty

describe("Name Test", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const getName = () => cy.get("input[name=name]");
  const getEmail = () => cy.get("input[name=email]");
  const getPass = () => cy.get("input[name=password]");

  it("Base Test", () => {
    //Get the Name input and type a name in it.
    getName().should("exist").type("Egg Man");

    //Use an assertion to check if the text inputted contains the name you provided
    getName().should("have.value", "Egg Man");

    //Get the Email input and type an email address in it
    getEmail().should("exist").type("egg@man.com");

    //Get the password input and type a password in it
    getPass().should("exist").type("31rf2g42f13");

    //Set up a test that will check to see if a user can check the terms of service box
    cy.get("input[type=checkbox]").should("exist").check();
    //Check to see if a user can submit the form data
    cy.get("#subutton").should("exist").click();
  });

  it("Test 2", () => {
    //Check for form validation if an input is left empty
    getName().type("h").clear();
    cy.get("#errorName").should("not.have.value", " ");
    getEmail().type("e").clear();
    cy.get("#errorEmail").should("not.have.value", " ");
    getPass().type("f").clear();
    cy.get("#errorPass").should("not.have.value", " ");
  });
});
