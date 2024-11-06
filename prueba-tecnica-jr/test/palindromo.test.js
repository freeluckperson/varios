const espalindromo = require("../pruebas/palindromo");

describe("palindromo", () => {
  it("shoul return true for the word 'reconocer'", () => {
    expect(true).toBe(espalindromo("reconocer"));
  });

  it("shoul return false for the word 'pedro'", () => {
    expect(false).toBe(espalindromo("pedro"));
  });
});
